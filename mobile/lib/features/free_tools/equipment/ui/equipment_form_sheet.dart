// lib/features/free_tools/equipment/ui/equipment_form_sheet.dart
//
// Modal bottom sheet (phone) / right-side panel (tablet) for creating or
// editing an Equipment record. Type dropdown sources from the user's
// predefined-list service so each user can curate their own taxonomy.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../../core/api/api_exception.dart';
import '../../../../core/predefined_lists/predefined_lists_repository.dart';
import '../../../../core/ui/loading_indicator.dart';
import '../models/equipment.dart';
import '../providers/equipment_providers.dart';

const _kEquipmentTypesListKey = 'equipmentTypes';

Future<void> showEquipmentFormSheet(
  BuildContext context, {
  Equipment? existing,
}) async {
  final isWide = MediaQuery.sizeOf(context).width >= 720;
  if (isWide) {
    await showDialog<void>(
      context: context,
      barrierDismissible: true,
      builder: (_) => Dialog(
        insetPadding: const EdgeInsets.symmetric(horizontal: 80, vertical: 40),
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 600, maxHeight: 720),
          child: EquipmentFormSheet(existing: existing),
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
          child: EquipmentFormSheet(existing: existing),
        ),
      ),
    );
  }
}

class EquipmentFormSheet extends ConsumerStatefulWidget {
  const EquipmentFormSheet({super.key, this.existing});
  final Equipment? existing;

  @override
  ConsumerState<EquipmentFormSheet> createState() => _EquipmentFormSheetState();
}

class _EquipmentFormSheetState extends ConsumerState<EquipmentFormSheet> {
  final _form = GlobalKey<FormState>();
  late final TextEditingController _name;
  late final TextEditingController _manufacturer;
  late final TextEditingController _model;
  late final TextEditingController _serial;
  late final TextEditingController _notes;

  String? _type;
  String _status = 'active';
  DateTime? _dueDate;
  bool _saving = false;

  @override
  void initState() {
    super.initState();
    final e = widget.existing;
    _name = TextEditingController(text: e?.name ?? '');
    _manufacturer = TextEditingController(text: e?.manufacturer ?? '');
    _model = TextEditingController(text: e?.model ?? '');
    _serial = TextEditingController(text: e?.serialNumber ?? '');
    _notes = TextEditingController(text: e?.notes ?? '');
    _type = e?.type.isNotEmpty == true ? e!.type : null;
    _status = e?.status ?? 'active';
    _dueDate = e?.calibrationDueDate;
  }

  @override
  void dispose() {
    _name.dispose();
    _manufacturer.dispose();
    _model.dispose();
    _serial.dispose();
    _notes.dispose();
    super.dispose();
  }

  Future<void> _pickDate() async {
    final now = DateTime.now();
    final picked = await showDatePicker(
      context: context,
      initialDate: _dueDate ?? now.add(const Duration(days: 180)),
      firstDate: DateTime(now.year - 5),
      lastDate: DateTime(now.year + 10),
    );
    if (picked != null) setState(() => _dueDate = picked);
  }

  Future<void> _addCustomType() async {
    final ctrl = TextEditingController();
    final value = await showDialog<String>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Add custom type'),
        content: TextField(
          controller: ctrl,
          autofocus: true,
          decoration: const InputDecoration(labelText: 'Equipment type'),
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
    if (value != null && value.isNotEmpty) {
      try {
        await ref
            .read(predefinedListProvider(_kEquipmentTypesListKey).notifier)
            .addItem(value);
        if (mounted) setState(() => _type = value);
      } on ApiException catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(e.message)),
          );
        }
      }
    }
  }

  Future<void> _save() async {
    if (!_form.currentState!.validate()) return;
    if (_type == null || _type!.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Pick an equipment type')),
      );
      return;
    }
    setState(() => _saving = true);
    try {
      final notifier = ref.read(equipmentListProvider.notifier);
      final draft = Equipment(
        id: widget.existing?.id ?? '',
        name: _name.text.trim(),
        type: _type!,
        manufacturer: _manufacturer.text.trim(),
        model: _model.text.trim(),
        serialNumber: _serial.text.trim(),
        calibrationDueDate: _dueDate,
        status: _status,
        notes: _notes.text.trim().isEmpty ? null : _notes.text.trim(),
      );
      if (widget.existing == null) {
        await notifier.create(draft);
      } else {
        await notifier.update(widget.existing!.id, draft.toJson());
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
    final confirm = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Delete equipment?'),
        content: const Text('This cannot be undone.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
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
    if (confirm != true) return;
    setState(() => _saving = true);
    try {
      await ref
          .read(equipmentListProvider.notifier)
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
    final typesAsync =
        ref.watch(predefinedListProvider(_kEquipmentTypesListKey));
    final isEdit = widget.existing != null;

    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.surface,
      appBar: AppBar(
        title: Text(isEdit ? 'Edit equipment' : 'Add equipment'),
        actions: [
          if (isEdit)
            IconButton(
              tooltip: 'Delete',
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
            TextFormField(
              controller: _name,
              decoration: const InputDecoration(labelText: 'Name / nickname'),
              validator: (v) => (v == null || v.trim().isEmpty)
                  ? 'Enter a name'
                  : null,
            ),
            const SizedBox(height: 12),
            typesAsync.when(
              loading: () => const SizedBox(
                height: 56,
                child: LoadingIndicator(size: 18),
              ),
              error: (e, _) => InputDecorator(
                decoration: InputDecoration(
                  labelText: 'Type',
                  errorText: e is ApiException ? e.message : 'Failed to load',
                ),
                child: TextButton.icon(
                  onPressed: () => ref.invalidate(
                      predefinedListProvider(_kEquipmentTypesListKey)),
                  icon: const Icon(Icons.refresh),
                  label: const Text('Retry'),
                ),
              ),
              data: (types) => DropdownButtonFormField<String>(
                value: types.contains(_type) ? _type : null,
                decoration: const InputDecoration(labelText: 'Type'),
                isExpanded: true,
                items: [
                  ...types.map(
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
                onChanged: (v) {
                  if (v == '__add__') {
                    _addCustomType();
                  } else {
                    setState(() => _type = v);
                  }
                },
              ),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _manufacturer,
              decoration: const InputDecoration(labelText: 'Manufacturer'),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _model,
              decoration: const InputDecoration(labelText: 'Model'),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _serial,
              decoration: const InputDecoration(labelText: 'Serial number'),
              validator: (v) => (v == null || v.trim().isEmpty)
                  ? 'Required'
                  : null,
            ),
            const SizedBox(height: 12),
            InkWell(
              onTap: _pickDate,
              borderRadius: BorderRadius.circular(10),
              child: InputDecorator(
                decoration: const InputDecoration(
                  labelText: 'Calibration due date',
                  suffixIcon: Icon(Icons.calendar_today_outlined),
                ),
                child: Text(
                  _dueDate == null
                      ? 'Select a date'
                      : DateFormat.yMMMd().format(_dueDate!),
                ),
              ),
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              value: _status,
              decoration: const InputDecoration(labelText: 'Status'),
              items: equipmentStatuses
                  .map((s) => DropdownMenuItem(value: s, child: Text(s)))
                  .toList(),
              onChanged: (v) =>
                  setState(() => _status = v ?? 'active'),
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
                  : Text(isEdit ? 'Save changes' : 'Add equipment'),
            ),
          ],
        ),
      ),
    );
  }
}
