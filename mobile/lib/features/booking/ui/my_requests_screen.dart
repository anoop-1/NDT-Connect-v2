// lib/features/booking/ui/my_requests_screen.dart

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/api/api_exception.dart';
import '../../../core/ui/loading_indicator.dart';
import '../models/service_request.dart';
import '../providers/service_request_providers.dart';

class MyRequestsScreen extends ConsumerWidget {
  const MyRequestsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncList = ref.watch(myRequestsProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('My requests')),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => context.go('/request-service'),
        icon: const Icon(Icons.add),
        label: const Text('New request'),
      ),
      body: asyncList.when(
        loading: () => const ListSkeleton(),
        error: (e, _) => ErrorRetry(
          message: e is ApiException ? e.message : 'Could not load requests',
          onRetry: () => ref.read(myRequestsProvider.notifier).refresh(),
        ),
        data: (items) {
          if (items.isEmpty) {
            return EmptyState(
              icon: Icons.list_alt_outlined,
              title: 'No service requests yet',
              body: 'Create your first request — providers in the marketplace '
                  'will respond with quotes.',
              cta: 'New request',
              onCta: () => context.go('/request-service'),
            );
          }
          return RefreshIndicator(
            onRefresh: () => ref.read(myRequestsProvider.notifier).refresh(),
            child: ListView.separated(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 96),
              itemCount: items.length,
              separatorBuilder: (_, __) => const SizedBox(height: 8),
              itemBuilder: (_, i) => _RequestRow(item: items[i]),
            ),
          );
        },
      ),
    );
  }
}

class _RequestRow extends StatelessWidget {
  const _RequestRow({required this.item});
  final ServiceRequest item;

  Color _statusColor(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    switch (item.status) {
      case ServiceRequestStatus.pending:
        return Colors.amber.shade700;
      case ServiceRequestStatus.confirmed:
        return Colors.blue.shade700;
      case ServiceRequestStatus.inProgress:
        return Colors.orange.shade700;
      case ServiceRequestStatus.completed:
        return Colors.green.shade700;
      case ServiceRequestStatus.cancelled:
        return cs.error;
      case ServiceRequestStatus.unknown:
        return cs.outline;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () => context.go('/track-request/${item.id}'),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      item.serviceType.isEmpty ? 'Service request' : item.serviceType,
                      style: const TextStyle(fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      item.location,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'Created ${DateFormat.yMMMd().format(item.createdAt)}',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                ),
              ),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: _statusColor(context).withOpacity(0.12),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  item.status.label,
                  style: TextStyle(
                    color: _statusColor(context),
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
