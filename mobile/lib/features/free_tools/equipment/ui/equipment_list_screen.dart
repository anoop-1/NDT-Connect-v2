// lib/features/free_tools/equipment/ui/equipment_list_screen.dart
//
// Real implementation backed by /api/equipment via EquipmentRepository.
// Adaptive: phone shows single-pane list; tablet (>=720dp) shows
// list-detail with the form pinned on the right.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../../core/api/api_exception.dart';
import '../../../../core/ui/loading_indicator.dart';
import '../models/equipment.dart';
import '../providers/equipment_providers.dart';
import 'equipment_form_sheet.dart';

class EquipmentListScreen extends ConsumerStatefulWidget {
  const EquipmentListScreen({super.key});

  @override
  ConsumerState<EquipmentListScreen> createState() =>
      _EquipmentListScreenState();
}

class _EquipmentListScreenState extends ConsumerState<EquipmentListScreen> {
  String _statusFilter = 'all';

  @override
  Widget build(BuildContext context) {
    final asyncList = ref.watch(equipmentListProvider);
    final isWide = MediaQuery.sizeOf(context).width >= 720;

    return Scaffold(
      appBar: AppBar(title: const Text('Equipment')),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => showEquipmentFormSheet(context),
        icon: const Icon(Icons.add),
        label: const Text('Add equipment'),
      ),
      body: Column(
        children: [
          _StatusFilterRow(
            value: _statusFilter,
            onChanged: (v) => setState(() => _statusFilter = v),
          ),
          Expanded(
            child: asyncList.when(
              loading: () => const ListSkeleton(),
              error: (err, _) => ErrorRetry(
                message:
                    err is ApiException ? err.message : 'Could not load equipment',
                onRetry: () =>
                    ref.read(equipmentListProvider.notifier).refresh(),
              ),
              data: (items) {
                final filtered = _statusFilter == 'all'
                    ? items
                    : items.where((e) => e.status == _statusFilter).toList();

                if (filtered.isEmpty) {
                  return EmptyState(
                    icon: Icons.precision_manufacturing_outlined,
                    title: items.isEmpty
                        ? 'No equipment yet'
                        : 'Nothing matches that filter',
                    body: items.isEmpty
                        ? 'Add your first instrument to start tracking '
                            'calibrations and certifications.'
                        : 'Try a different status filter.',
                    cta: items.isEmpty ? 'Add equipment' : null,
                    onCta: items.isEmpty
                        ? () => showEquipmentFormSheet(context)
                        : null,
                  );
                }

                final sorted = [...filtered]..sort((a, b) {
                    final ad = a.calibrationDueDate;
                    final bd = b.calibrationDueDate;
                    if (ad == null && bd == null) return a.name.compareTo(b.name);
                    if (ad == null) return 1;
                    if (bd == null) return -1;
                    return ad.compareTo(bd);
                  });

                final list = RefreshIndicator(
                  onRefresh: () =>
                      ref.read(equipmentListProvider.notifier).refresh(),
                  child: ListView.separated(
                    padding: const EdgeInsets.fromLTRB(16, 8, 16, 96),
                    itemCount: sorted.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 8),
                    itemBuilder: (_, i) => EquipmentRowCard(
                      item: sorted[i],
                      onTap: () =>
                          showEquipmentFormSheet(context, existing: sorted[i]),
                    ),
                  ),
                );

                if (!isWide) return list;

                return Row(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Expanded(flex: 4, child: list),
                    Container(
                      width: 1,
                      color: Theme.of(context).dividerColor,
                    ),
                    Expanded(
                      flex: 5,
                      child: _DetailPlaceholder(itemCount: sorted.length),
                    ),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _StatusFilterRow extends StatelessWidget {
  const _StatusFilterRow({required this.value, required this.onChanged});
  final String value;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    final filters = const ['all', ...equipmentStatuses];
    return SizedBox(
      height: 56,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        itemCount: filters.length,
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (_, i) {
          final f = filters[i];
          final selected = value == f;
          return ChoiceChip(
            label: Text(f),
            selected: selected,
            onSelected: (_) => onChanged(f),
          );
        },
      ),
    );
  }
}

class _DetailPlaceholder extends StatelessWidget {
  const _DetailPlaceholder({required this.itemCount});
  final int itemCount;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.touch_app_outlined,
              size: 48,
              color: Theme.of(context).colorScheme.outline,
            ),
            const SizedBox(height: 12),
            Text(
              itemCount == 0
                  ? 'Add equipment to begin'
                  : 'Tap a row to edit details',
              style: Theme.of(context).textTheme.titleMedium,
            ),
          ],
        ),
      ),
    );
  }
}

class EquipmentRowCard extends StatelessWidget {
  const EquipmentRowCard({super.key, required this.item, required this.onTap});
  final Equipment item;
  final VoidCallback onTap;

  Color _badgeColor(BuildContext context) {
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

  String _badgeText() {
    final d = item.daysUntilCalibration;
    if (d == null) return 'No date';
    if (d < 0) return '${-d}d overdue';
    if (d == 0) return 'Due today';
    return 'Due in ${d}d';
  }

  @override
  Widget build(BuildContext context) {
    final dateText = item.calibrationDueDate == null
        ? 'No calibration date'
        : DateFormat.yMMMd().format(item.calibrationDueDate!);
    return Card(
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(
            children: [
              Container(
                width: 12,
                height: 12,
                decoration: BoxDecoration(
                  color: _badgeColor(context),
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      item.name,
                      style: const TextStyle(fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      [
                        if (item.type.isNotEmpty) item.type,
                        if (item.manufacturer.isNotEmpty) item.manufacturer,
                        if (item.model.isNotEmpty) item.model,
                      ].join(' / '),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'SN: ${item.serialNumber}    $dateText',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(
                    horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: _badgeColor(context).withOpacity(0.12),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  _badgeText(),
                  style: TextStyle(
                    color: _badgeColor(context),
                    fontWeight: FontWeight.w600,
                    fontSize: 12,
                  ),
                ),
              ),
              const SizedBox(width: 4),
              const Icon(Icons.chevron_right),
            ],
          ),
        ),
      ),
    );
  }
}
