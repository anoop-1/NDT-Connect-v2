// lib/features/free_tools/certifications/ui/certifications_screen.dart
//
// Tabs: Manpower / Company. Each tab is a list with an FAB to add a cert.
// Body / Method / Level dropdowns source from per-user predefined-list keys
// so the user can curate their own taxonomy.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../../core/api/api_exception.dart';
import '../../../../core/predefined_lists/predefined_lists_repository.dart';
import '../../../../core/ui/loading_indicator.dart';
import '../models/certification.dart';
import '../providers/certification_providers.dart';

const _kPersonnelBodies = 'personnelCertBodies';
const _kCompanyBodies = 'companyCertBodies';
const _kMethods = 'ndtMethods';
const _kLevels = 'ndtLevels';

class CertificationsScreen extends StatelessWidget {
  const CertificationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Certifications'),
          bottom: const TabBar(tabs: [
            Tab(text: 'Manpower'),
            Tab(text: 'Company'),
          ]),
        ),
        body: const TabBarView(children: [
          _CertTab(kind: CertificationKind.personnel),
          _CertTab(kind: CertificationKind.company),
        ]),
      ),
    );
  }
}

class _CertTab extends ConsumerWidget {
  const _CertTab({required this.kind});
  final CertificationKind kind;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncList = ref.watch(certListProvider(kind));
    return Scaffold(
      backgroundColor: Colors.transparent,
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => showCertFormSheet(context, kind: kind),
        icon: const Icon(Icons.add),
        label: const Text('Add cert'),
      ),
      body: asyncList.when(
        loading: () => const ListSkeleton(),
        error: (e, _) => ErrorRetry(
          message:
              e is ApiException ? e.message : 'Could not load certifications',
          onRetry: () => ref.read(certListProvider(kind).notifier).refresh(),
        ),
        data: (items) {
          if (items.isEmpty) {
            return EmptyState(
              icon: Icons.workspace_premium_outlined,
              title: kind == CertificationKind.personnel
                  ? 'No personnel certs yet'
                  : 'No company certs yet',
              body: kind == CertificationKind.personnel
                  ? 'Add ASNT, ISO 9712 or OEM certs for your technicians.'
                  : 'Add company-level ISO 17025, OEM or accreditation certs.',
              cta: 'Add cert',
              onCta: () => showCertFormSheet(context, kind: kind),
            );
          }
          final sorted = [...items]..sort((a, b) {
              if (a.expiryDate == null && b.expiryDate == null) return 0;
              if (a.expiryDate == null) return 1;
              if (b.expiryDate == null) return -1;
              return a.expiryDate!.compareTo(b.expiryDate!);
            });
          return RefreshIndicator(
            onRefresh: () =>
                ref.read(certListProvider(kind).notifier).refresh(),
            child: ListView.separated(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 96),
              itemCount: sorted.length,
              separatorBuilder: (_, __) => const SizedBox(height: 8),
              itemBuilder: (_, i) => _CertCard(
                cert: sorted[i],
                onTap: () => showCertFormSheet(
                  context,
                  kind: kind,
                  existing: sorted[i],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

class _CertCard extends StatelessWidget {
  const _CertCard({required this.cert, required this.onTap});
  final Certification cert;
  final VoidCallback onTap;

  Color _color(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final d = cert.daysUntilExpiry;
    if (d == null) return cs.outline;
    if (d < 0) return cs.error;
    if (d <= 30) return Colors.orange.shade700;
    if (d <= 90) return Colors.amber.shade700;
    return Colors.green.shade700;
  }

  String _badge() {
    final d = cert.daysUntilExpiry;
    if (d == null) return 'No expiry';
    if (d < 0) return '${-d}d overdue';
    return 'Expires in ${d}d';
  }

  @override
  Widget build(BuildContext context) {
    final title = cert.kind == CertificationKind.personnel
        ? (cert.personName?.isNotEmpty == true
            ? cert.personName!
            : (cert.certName ?? 'Personnel cert'))
        : (cert.certName?.isNotEmpty == true
            ? cert.certName!
            : (cert.body ?? 'Company cert'));

    final subtitle = [
      if (cert.method?.isNotEmpty == true) cert.method!,
      if (cert.level?.isNotEmpty == true) cert.level!,
      if (cert.body?.isNotEmpty == true) cert.body!,
    ].join(' / ');

    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title,
                        style: const TextStyle(fontWeight: FontWeight.w700)),
                    if (subtitle.isNotEmpty) ...[
                      const SizedBox(height: 2),
                      Text(subtitle,
                          style: Theme.of(context).textTheme.bodySmall),
                    ],
                    if (cert.expiryDate != null) ...[
                      const SizedBox(height: 4),
                      Text(
                        'Expiry ${DateFormat.yMMMd().format(cert.expiryDate!)}',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                    horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: _color(context).withOpacity(0.12),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  _badge(),
                  style: TextStyle(
                    color: _color(context),
                    fontWeight: FontWeight.w600,
                    fontSize: 12,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

Future<void> showCertFormSheet(
  BuildContext context, {
  required CertificationKind kind,
  Certification? existing,
}) async {
  final isWide = MediaQuery.sizeOf(context).width >= 720;
  if (isWide) {
    await showDialog<void>(
      context: context,
      builder: (_) => Dialog(
        insetPadding: const EdgeInsets.symmetric(horizontal: 80, vertical: 40),
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 600, maxHeight: 760),
          child: _CertFormSheet(kind: kind, existing: existing),
        ),
      ),
    );
  } else {
    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      builder: (_) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
        ),
        child: FractionallySizedBox(
          heightFactor: 0.92,
          child: _CertFormSheet(kind: kind, existing: existing),
        ),
      ),
    );
  }
}

class _CertFormSheet extends ConsumerStatefulWidget {
  const _CertFormSheet({required this.kind, this.existing});
  final CertificationKind kind;
  final Certification? existing;

  @override
  ConsumerState<_CertFormSheet> createState() => _CertFormSheetState();
}

class _CertFormSheetState extends ConsumerState<_CertFormSheet> {
  final _form = GlobalKey<FormState>();
  late final TextEditingController _person;
  late final TextEditingController _certName;
  late final TextEditingController _notes;
  String? _method;
  String? _level;
  String? _body;
  DateTime? _expiry;
  DateTime? _issued;
  bool _saving = false;

  @override
  void initState() {
    super.initState();
    final e = widget.existing;
    _person = TextEditingController(text: e?.personName ?? '');
    _certName = TextEditingController(text: e?.certName ?? '');
    _notes = TextEditingController(text: e?.notes ?? '');
    _method = e?.method;
    _level = e?.level;
    _body = e?.body;
    _expiry = e?.expiryDate;
    _issued = e?.issuedDate;
  }

  @override
  void dispose() {
    _person.dispose();
    _certName.dispose();
    _notes.dispose();
    super.dispose();
  }

  Future<DateTime?> _pickDate(DateTime? current) async {
    final now = DateTime.now();
    return showDatePicker(
      context: context,
      initialDate: current ?? now,
      firstDate: DateTime(now.year - 10),
      lastDate: DateTime(now.year + 15),
    );
  }

  Future<void> _save() async {
    if (!_form.currentState!.validate()) return;
    setState(() => _saving = true);
    try {
      final notifier = ref.read(certListProvider(widget.kind).notifier);
      final draft = Certification(
        id: widget.existing?.id ?? '',
        kind: widget.kind,
        expiryDate: _expiry,
        issuedDate: _issued,
        personName: widget.kind == CertificationKind.personnel
            ? _person.text.trim()
            : null,
        certName: _certName.text.trim().isEmpty ? null : _certName.text.trim(),
        method: _method,
        level: _level,
        body: _body,
        notes: _notes.text.trim().isEmpty ? null : _notes.text.trim(),
      );
      if (widget.existing == null) {
        await notifier.create(draft);
      } else {
        await notifier.updateItem(widget.existing!.id, draft.toJson());
      }
      if (mounted) Navigator.pop(context);
    } on ApiException catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.message)),
        );
      }
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Future<void> _delete() async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Delete certificate?'),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(context, false),
              child: const Text('Cancel')),
          FilledButton(
            style: FilledButton.styleFrom(
              backgroundColor: Theme.of(context).colorScheme.error,
            ),
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Delete'),
          ),
        ],
      ),
    );
    if (ok != true) return;
    setState(() => _saving = true);
    try {
      await ref
          .read(certListProvider(widget.kind).notifier)
          .delete(widget.existing!.id);
      if (mounted) Navigator.pop(context);
    } on ApiException catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.message)),
        );
      }
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final bodyKey = widget.kind == CertificationKind.personnel
        ? _kPersonnelBodies
        : _kCompanyBodies;
    final isEdit = widget.existing != null;

    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.surface,
      appBar: AppBar(
        title: Text(isEdit
            ? 'Edit certificate'
            : (widget.kind == CertificationKind.personnel
                ? 'Add personnel cert'
                : 'Add company cert')),
        actions: [
          if (isEdit)
            IconButton(
              icon: const Icon(Icons.delete_outline),
              onPressed: _saving ? null : _delete,
            ),
        ],
      ),
      body: Form(
        key: _form,
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            if (widget.kind == CertificationKind.personnel)
              TextFormField(
                controller: _person,
                decoration: const InputDecoration(labelText: 'Person name'),
                validator: (v) => (v == null || v.trim().isEmpty)
                    ? 'Required'
                    : null,
              ),
            if (widget.kind == CertificationKind.personnel)
              const SizedBox(height: 12),
            TextFormField(
              controller: _certName,
              decoration: const InputDecoration(labelText: 'Certificate name'),
            ),
            const SizedBox(height: 12),
            _ListBackedDropdown(
              label: 'Method',
              listKey: _kMethods,
              value: _method,
              onChanged: (v) => setState(() => _method = v),
            ),
            const SizedBox(height: 12),
            _ListBackedDropdown(
              label: 'Level',
              listKey: _kLevels,
              value: _level,
              onChanged: (v) => setState(() => _level = v),
            ),
            const SizedBox(height: 12),
            _ListBackedDropdown(
              label: 'Body / Authority',
              listKey: bodyKey,
              value: _body,
              onChanged: (v) => setState(() => _body = v),
            ),
            const SizedBox(height: 12),
            InkWell(
              onTap: () async {
                final picked = await _pickDate(_issued);
                if (picked != null) setState(() => _issued = picked);
              },
              borderRadius: BorderRadius.circular(10),
              child: InputDecorator(
                decoration: const InputDecoration(
                  labelText: 'Issued date',
                  suffixIcon: Icon(Icons.calendar_today_outlined),
                ),
                child: Text(_issued == null
                    ? 'Optional'
                    : DateFormat.yMMMd().format(_issued!)),
              ),
            ),
            const SizedBox(height: 12),
            InkWell(
              onTap: () async {
                final picked = await _pickDate(_expiry);
                if (picked != null) setState(() => _expiry = picked);
              },
              borderRadius: BorderRadius.circular(10),
              child: InputDecorator(
                decoration: const InputDecoration(
                  labelText: 'Expiry date',
                  suffixIcon: Icon(Icons.calendar_today_outlined),
                ),
                child: Text(_expiry == null
                    ? 'Select a date'
                    : DateFormat.yMMMd().format(_expiry!)),
              ),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _notes,
              decoration: const InputDecoration(labelText: 'Notes'),
              maxLines: 3,
            ),
            const SizedBox(height: 24),
            FilledButton(
              onPressed: _saving ? null : _save,
              child: _saving
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : Text(isEdit ? 'Save changes' : 'Add certificate'),
            ),
          ],
        ),
      ),
    );
  }
}

class _ListBackedDropdown extends ConsumerWidget {
  const _ListBackedDropdown({
    required this.label,
    required this.listKey,
    required this.value,
    required this.onChanged,
  });

  final String label;
  final String listKey;
  final String? value;
  final ValueChanged<String?> onChanged;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncList = ref.watch(predefinedListProvider(listKey));
    return asyncList.when(
      loading: () => const SizedBox(
        height: 56,
        child: LoadingIndicator(size: 18),
      ),
      error: (e, _) => InputDecorator(
        decoration: InputDecoration(
          labelText: label,
          errorText: e is ApiException ? e.message : 'Failed to load',
        ),
        child: TextButton.icon(
          onPressed: () => ref.invalidate(predefinedListProvider(listKey)),
          icon: const Icon(Icons.refresh),
          label: const Text('Retry'),
        ),
      ),
      data: (items) => DropdownButtonFormField<String>(
        value: items.contains(value) ? value : null,
        decoration: InputDecoration(labelText: label),
        isExpanded: true,
        items: [
          ...items.map(
            (t) => DropdownMenuItem(value: t, child: Text(t)),
          ),
          const DropdownMenuItem(
            value: '__add__',
            child: Row(
              children: [
                Icon(Icons.add, size: 18),
                SizedBox(width: 6),
                Text('Add custom...'),
              ],
            ),
          ),
        ],
        onChanged: (v) async {
          if (v == '__add__') {
            final ctrl = TextEditingController();
            final added = await showDialog<String>(
              context: context,
              builder: (_) => AlertDialog(
                title: Text('Add $label'),
                content: TextField(
                  controller: ctrl,
                  autofocus: true,
                  decoration: InputDecoration(labelText: label),
                ),
                actions: [
                  TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text('Cancel'),
                  ),
                  FilledButton(
                    onPressed: () => Navigator.pop(context, ctrl.text.trim()),
                    child: const Text('Add'),
                  ),
                ],
              ),
            );
            if (added != null && added.isNotEmpty) {
              try {
                await ref
                    .read(predefinedListProvider(listKey).notifier)
                    .addItem(added);
                onChanged(added);
              } on ApiException catch (e) {
                if (context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text(e.message)),
                  );
                }
              }
            }
          } else {
            onChanged(v);
          }
        },
      ),
    );
  }
}
