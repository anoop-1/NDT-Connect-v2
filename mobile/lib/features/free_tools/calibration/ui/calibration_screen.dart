// lib/features/free_tools/calibration/ui/calibration_screen.dart
//
// Two tabs:
//   1. Due dates — pulls from the equipment list and bucket-sorts items by
//      30/60/90-day calibration windows (and overdue).
//   2. Alert rules — CRUD over /api/calibration-alerts.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../../core/api/api_exception.dart';
import '../../../../core/ui/loading_indicator.dart';
import '../../equipment/models/equipment.dart';
import '../../equipment/providers/equipment_providers.dart';
import '../../equipment/ui/equipment_form_sheet.dart';
import '../models/calibration_alert.dart';
import '../providers/calibration_providers.dart';

class CalibrationScreen extends ConsumerWidget {
  const CalibrationScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Calibration'),
          bottom: const TabBar(tabs: [
            Tab(text: 'Due dates'),
            Tab(text: 'Alert rules'),
          ]),
        ),
        body: const TabBarView(children: [
          _DueDatesTab(),
          _AlertRulesTab(),
        ]),
      ),
    );
  }
}

class _DueDatesTab extends ConsumerWidget {
  const _DueDatesTab();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncEquip = ref.watch(equipmentListProvider);

    return asyncEquip.when(
      loading: () => const ListSkeleton(),
      error: (e, _) => ErrorRetry(
        message: e is ApiException ? e.message : 'Could not load equipment',
        onRetry: () => ref.read(equipmentListProvider.notifier).refresh(),
      ),
      data: (items) {
        final relevant = items
            .where((e) =>
                e.calibrationDueDate != null &&
                e.urgency != CalibrationUrgency.ok)
            .toList()
          ..sort((a, b) =>
              a.calibrationDueDate!.compareTo(b.calibrationDueDate!));

        if (relevant.isEmpty) {
          return EmptyState(
            icon: Icons.check_circle_outline,
            title: 'No upcoming calibrations',
            body: items.isEmpty
                ? 'Add equipment to track calibration deadlines.'
                : 'Everything is calibrated for the next 90 days.',
          );
        }

        return RefreshIndicator(
          onRefresh: () =>
              ref.read(equipmentListProvider.notifier).refresh(),
          child: ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: relevant.length,
            separatorBuilder: (_, __) => const SizedBox(height: 10),
            itemBuilder: (_, i) =>
                _DueCard(item: relevant[i]),
          ),
        );
      },
    );
  }
}

class _DueCard extends StatelessWidget {
  const _DueCard({required this.item});
  final Equipment item;

  Color _color(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    switch (item.urgency) {
      case CalibrationUrgency.overdue:
        return cs.error;
      case CalibrationUrgency.soon:
        return Colors.orange.shade700;
      case CalibrationUrgency.upcoming:
        return Colors.amber.shade700;
      case CalibrationUrgency.ok:
        return Colors.green.shade700;
      case CalibrationUrgency.unknown:
        return cs.outline;
    }
  }

  String _bucketText() {
    final d = item.daysUntilCalibration!;
    if (d < 0) return 'Overdue';
    if (d <= 30) return 'Within 30 days';
    if (d <= 60) return 'Within 60 days';
    return 'Within 90 days';
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    item.name,
                    style: const TextStyle(
                        fontWeight: FontWeight.w700, fontSize: 16),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: _color(context).withOpacity(0.12),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    _bucketText(),
                    style: TextStyle(
                      color: _color(context),
                      fontWeight: FontWeight.w700,
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Text('${item.type} · ${item.manufacturer} ${item.model}'),
            const SizedBox(height: 4),
            Text(
              'SN ${item.serialNumber} · due ${DateFormat.yMMMd().format(item.calibrationDueDate!)}',
              style: Theme.of(context).textTheme.bodySmall,
            ),
            const SizedBox(height: 8),
            Align(
              alignment: Alignment.centerRight,
              child: TextButton.icon(
                onPressed: () =>
                    showEquipmentFormSheet(context, existing: item),
                icon: const Icon(Icons.edit_outlined, size: 18),
                label: const Text('Update record'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _AlertRulesTab extends ConsumerWidget {
  const _AlertRulesTab();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncAlerts = ref.watch(calibrationAlertsProvider);
    final asyncEquip = ref.watch(equipmentListProvider);

    return Scaffold(
      backgroundColor: Colors.transparent,
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _AddAlertSheet.show(context, ref),
        icon: const Icon(Icons.add),
        label: const Text('Add rule'),
      ),
      body: asyncAlerts.when(
        loading: () => const ListSkeleton(),
        error: (e, _) => ErrorRetry(
          message: e is ApiException ? e.message : 'Could not load alerts',
          onRetry: () =>
              ref.read(calibrationAlertsProvider.notifier).refresh(),
        ),
        data: (alerts) {
          if (alerts.isEmpty) {
            return EmptyState(
              icon: Icons.notifications_active_outlined,
              title: 'No alert rules yet',
              body: 'Create a rule to get an email N days before any '
                  'instrument is due for calibration.',
              cta: 'Add rule',
              onCta: () => _AddAlertSheet.show(context, ref),
            );
          }
          final equipMap = {
            for (final e in (asyncEquip.value ?? const [])) e.id: e
          };
          return RefreshIndicator(
            onRefresh: () =>
                ref.read(calibrationAlertsProvider.notifier).refresh(),
            child: ListView.separated(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 96),
              itemCount: alerts.length,
              separatorBuilder: (_, __) => const SizedBox(height: 8),
              itemBuilder: (_, i) {
                final a = alerts[i];
                final eq = equipMap[a.equipmentId];
                return Card(
                  child: ListTile(
                    leading: Icon(
                      a.enabled
                          ? Icons.notifications_active
                          : Icons.notifications_off_outlined,
                      color: a.enabled
                          ? Theme.of(context).colorScheme.primary
                          : Theme.of(context).colorScheme.outline,
                    ),
                    title: Text(eq?.name ?? a.equipmentId),
                    subtitle: Text(
                      '${a.daysBefore} days before · ${a.emailTo}',
                    ),
                    trailing: IconButton(
                      tooltip: 'Delete',
                      icon: const Icon(Icons.delete_outline),
                      onPressed: () async {
                        try {
                          await ref
                              .read(calibrationAlertsProvider.notifier)
                              .delete(a.id);
                        } on ApiException catch (e) {
                          if (context.mounted) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(content: Text(e.message)),
                            );
                          }
                        }
                      },
                    ),
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}

class _AddAlertSheet extends ConsumerStatefulWidget {
  const _AddAlertSheet();

  static Future<void> show(BuildContext context, WidgetRef ref) {
    return showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      builder: (_) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
        ),
        child: const _AddAlertSheet(),
      ),
    );
  }

  @override
  ConsumerState<_AddAlertSheet> createState() => _AddAlertSheetState();
}

class _AddAlertSheetState extends ConsumerState<_AddAlertSheet> {
  String? _equipId;
  final _email = TextEditingController();
  int _daysBefore = 30;
  bool _saving = false;

  @override
  void dispose() {
    _email.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    if (_equipId == null || _equipId!.isEmpty) return;
    if (_email.text.trim().isEmpty) return;
    setState(() => _saving = true);
    try {
      await ref.read(calibrationAlertsProvider.notifier).create(
            CalibrationAlert(
              id: '',
              equipmentId: _equipId!,
              emailTo: _email.text.trim(),
              daysBefore: _daysBefore,
              enabled: true,
            ),
          );
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
    final equipAsync = ref.watch(equipmentListProvider);
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('New alert rule',
                style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 16),
            equipAsync.when(
              loading: () => const LoadingIndicator(size: 18),
              error: (e, _) => Text(
                e is ApiException ? e.message : 'Could not load equipment',
                style: TextStyle(
                    color: Theme.of(context).colorScheme.error),
              ),
              data: (items) => DropdownButtonFormField<String>(
                value: _equipId,
                decoration: const InputDecoration(labelText: 'Equipment'),
                isExpanded: true,
                items: items
                    .map((e) =>
                        DropdownMenuItem(value: e.id, child: Text(e.name)))
                    .toList(),
                onChanged: (v) => setState(() => _equipId = v),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _email,
              decoration: const InputDecoration(labelText: 'Email to notify'),
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<int>(
              value: _daysBefore,
              decoration: const InputDecoration(labelText: 'Days before'),
              items: const [7, 14, 30, 60, 90]
                  .map((d) => DropdownMenuItem(
                      value: d, child: Text('$d days before')))
                  .toList(),
              onChanged: (v) => setState(() => _daysBefore = v ?? 30),
            ),
            const SizedBox(height: 20),
            FilledButton(
              onPressed: _saving ? null : _save,
              child: _saving
                  ? const SizedBox(
                      height: 20,
                      width: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Text('Create rule'),
            ),
          ],
        ),
      ),
    );
  }
}
