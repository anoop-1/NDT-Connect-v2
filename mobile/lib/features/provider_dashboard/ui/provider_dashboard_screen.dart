// lib/features/provider_dashboard/ui/provider_dashboard_screen.dart

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/api/api_exception.dart';
import '../../../core/auth/auth_repository.dart';
import '../../../core/auth/auth_state.dart';
import '../../../core/ui/loading_indicator.dart';
import '../../booking/models/service_request.dart';
import '../../booking/providers/service_request_providers.dart';

class ProviderDashboardScreen extends ConsumerWidget {
  const ProviderDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncList = ref.watch(providerRequestsProvider);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Provider dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings_outlined),
            onPressed: () => context.push('/settings'),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () =>
            ref.read(providerRequestsProvider.notifier).refresh(),
        child: asyncList.when(
          loading: () => const ListSkeleton(),
          error: (e, _) => ErrorRetry(
            message: e is ApiException ? e.message : 'Could not load data',
            onRetry: () =>
                ref.read(providerRequestsProvider.notifier).refresh(),
          ),
          data: (items) {
            final assigned = items
                .where((r) =>
                    r.providerId != null && r.status != ServiceRequestStatus.completed)
                .toList();
            final open = items.where((r) => r.providerId == null).toList();
            final completed = items
                .where((r) => r.status == ServiceRequestStatus.completed)
                .toList();
            return ListView(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
              children: [
                _SummaryRow(
                  open: open.length,
                  assigned: assigned.length,
                  completed: completed.length,
                ),
                const SizedBox(height: 16),
                _ToolsRow(),
                const SizedBox(height: 24),
                Text('Open jobs in marketplace',
                    style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 8),
                if (open.isEmpty)
                  const _Empty(text: 'No open jobs right now.')
                else
                  ...open.map((r) => _RequestCard(item: r, mode: _Mode.open)),
                const SizedBox(height: 24),
                Text('Assigned to me',
                    style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 8),
                if (assigned.isEmpty)
                  const _Empty(text: 'Claim an open job to get started.')
                else
                  ...assigned
                      .map((r) => _RequestCard(item: r, mode: _Mode.assigned)),
                const SizedBox(height: 24),
                Text('Completed',
                    style: Theme.of(context).textTheme.titleMedium),
                const SizedBox(height: 8),
                if (completed.isEmpty)
                  const _Empty(text: 'No completed jobs yet.')
                else
                  ...completed.take(5).map(
                      (r) => _RequestCard(item: r, mode: _Mode.assigned)),
              ],
            );
          },
        ),
      ),
    );
  }
}

class _SummaryRow extends StatelessWidget {
  const _SummaryRow({
    required this.open,
    required this.assigned,
    required this.completed,
  });
  final int open;
  final int assigned;
  final int completed;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(child: _Metric(label: 'Open', value: '$open', color: Colors.blue.shade700)),
        const SizedBox(width: 8),
        Expanded(child: _Metric(label: 'Assigned', value: '$assigned', color: Colors.orange.shade700)),
        const SizedBox(width: 8),
        Expanded(child: _Metric(label: 'Completed', value: '$completed', color: Colors.green.shade700)),
      ],
    );
  }
}

class _Metric extends StatelessWidget {
  const _Metric({required this.label, required this.value, required this.color});
  final String label;
  final String value;
  final Color color;
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 16),
        child: Column(
          children: [
            Text(value,
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w800,
                  color: color,
                )),
            const SizedBox(height: 4),
            Text(label, style: Theme.of(context).textTheme.bodySmall),
          ],
        ),
      ),
    );
  }
}

class _ToolsRow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final tiles = const [
      _Tile('Equipment', Icons.precision_manufacturing_outlined,
          '/free-tools/equipment'),
      _Tile('Calibration', Icons.notifications_active_outlined,
          '/free-tools/calibration'),
      _Tile('Certifications', Icons.workspace_premium_outlined,
          '/free-tools/certifications'),
    ];
    return Row(
      children: tiles
          .map((t) => Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: Card(
                    child: InkWell(
                      borderRadius: BorderRadius.circular(12),
                      onTap: () => context.go(t.path),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        child: Column(children: [
                          Icon(t.icon,
                              color: Theme.of(context).colorScheme.primary),
                          const SizedBox(height: 4),
                          Text(t.title,
                              textAlign: TextAlign.center,
                              style: const TextStyle(fontSize: 12)),
                        ]),
                      ),
                    ),
                  ),
                ),
              ))
          .toList(),
    );
  }
}

class _Tile {
  const _Tile(this.title, this.icon, this.path);
  final String title;
  final IconData icon;
  final String path;
}

class _Empty extends StatelessWidget {
  const _Empty({required this.text});
  final String text;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 16),
      child: Text(text,
          style: Theme.of(context).textTheme.bodySmall, textAlign: TextAlign.center),
    );
  }
}

enum _Mode { open, assigned }

class _RequestCard extends ConsumerWidget {
  const _RequestCard({required this.item, required this.mode});
  final ServiceRequest item;
  final _Mode mode;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(14, 12, 14, 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    item.serviceType.isEmpty ? 'Service request' : item.serviceType,
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                ),
                _StatusChip(status: item.status),
              ],
            ),
            const SizedBox(height: 4),
            Text(item.location, style: Theme.of(context).textTheme.bodySmall),
            const SizedBox(height: 4),
            Text(
              item.description,
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(context).textTheme.bodySmall,
            ),
            const SizedBox(height: 6),
            Text(
              'Posted ${DateFormat.yMMMd().format(item.createdAt)}'
              '${item.requestedDate != null ? ' · Needed ${DateFormat.yMMMd().format(item.requestedDate!)}' : ''}',
              style: Theme.of(context).textTheme.bodySmall,
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                if (mode == _Mode.open)
                  FilledButton.tonal(
                    onPressed: () => _claim(context, ref),
                    child: const Text('Claim job'),
                  ),
                if (mode == _Mode.assigned) ...[
                  if (item.status == ServiceRequestStatus.confirmed)
                    FilledButton.tonal(
                      onPressed: () => _setStatus(
                          context, ref, ServiceRequestStatus.inProgress),
                      child: const Text('Start work'),
                    ),
                  if (item.status == ServiceRequestStatus.inProgress)
                    FilledButton.tonal(
                      onPressed: () => _setStatus(
                          context, ref, ServiceRequestStatus.completed),
                      child: const Text('Mark complete'),
                    ),
                  if (item.status != ServiceRequestStatus.completed &&
                      item.status != ServiceRequestStatus.cancelled)
                    TextButton(
                      onPressed: () => _setStatus(
                          context, ref, ServiceRequestStatus.cancelled),
                      child: const Text('Cancel'),
                    ),
                ],
                const Spacer(),
                IconButton(
                  icon: const Icon(Icons.open_in_new, size: 18),
                  tooltip: 'Open',
                  onPressed: () => context.push('/track-request/${item.id}'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _claim(BuildContext context, WidgetRef ref) async {
    final auth = ref.read(authControllerProvider).value;
    final providerName = auth is AuthAuthenticated ? auth.user.companyName ?? auth.user.name : null;
    final priceCtrl = TextEditingController();
    final ok = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Claim this job'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('You\'ll be assigned and the client will be notified.'),
            const SizedBox(height: 12),
            TextField(
              controller: priceCtrl,
              keyboardType: const TextInputType.numberWithOptions(decimal: true),
              decoration: const InputDecoration(
                  labelText: 'Estimated cost (optional)', prefixText: '\$ '),
            ),
          ],
        ),
        actions: [
          TextButton(
              onPressed: () => Navigator.pop(context, false),
              child: const Text('Cancel')),
          FilledButton(
              onPressed: () => Navigator.pop(context, true),
              child: const Text('Claim')),
        ],
      ),
    );
    if (ok != true) return;
    try {
      final cost = num.tryParse(priceCtrl.text.trim());
      await ref.read(providerRequestsProvider.notifier).claim(
            item.id,
            providerName: providerName,
            estimatedCost: cost,
          );
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Job claimed')),
        );
      }
    } on ApiException catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.message)),
        );
      }
    }
  }

  Future<void> _setStatus(
      BuildContext context, WidgetRef ref, ServiceRequestStatus status) async {
    try {
      await ref
          .read(providerRequestsProvider.notifier)
          .updateStatus(item.id, status);
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Status set to ${status.label}')),
        );
      }
    } on ApiException catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.message)),
        );
      }
    }
  }
}

class _StatusChip extends StatelessWidget {
  const _StatusChip({required this.status});
  final ServiceRequestStatus status;
  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    Color c;
    switch (status) {
      case ServiceRequestStatus.pending:
        c = Colors.amber.shade700;
        break;
      case ServiceRequestStatus.confirmed:
        c = Colors.blue.shade700;
        break;
      case ServiceRequestStatus.inProgress:
        c = Colors.orange.shade700;
        break;
      case ServiceRequestStatus.completed:
        c = Colors.green.shade700;
        break;
      case ServiceRequestStatus.cancelled:
        c = cs.error;
        break;
      default:
        c = cs.outline;
    }
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: c.withOpacity(0.12),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(status.label,
          style: TextStyle(color: c, fontSize: 11, fontWeight: FontWeight.w600)),
    );
  }
}
