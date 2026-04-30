// lib/features/notifications/ui/notifications_screen.dart

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/api/api_exception.dart';
import '../../../core/ui/loading_indicator.dart';
import '../models/notification.dart';
import '../providers/notification_providers.dart';

class NotificationsScreen extends ConsumerWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncBundle = ref.watch(notificationsProvider);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notifications'),
        actions: [
          asyncBundle.maybeWhen(
            data: (b) => b.unreadCount == 0
                ? const SizedBox.shrink()
                : TextButton(
                    onPressed: () =>
                        ref.read(notificationsProvider.notifier).markAllRead(),
                    child: const Text('Mark all read'),
                  ),
            orElse: () => const SizedBox.shrink(),
          ),
        ],
      ),
      body: asyncBundle.when(
        loading: () => const ListSkeleton(),
        error: (e, _) => ErrorRetry(
          message: e is ApiException ? e.message : 'Could not load notifications',
          onRetry: () => ref.read(notificationsProvider.notifier).refresh(),
        ),
        data: (bundle) {
          if (bundle.items.isEmpty) {
            return const EmptyState(
              icon: Icons.notifications_none,
              title: 'No notifications',
              body: 'You\'re all caught up.',
            );
          }
          return RefreshIndicator(
            onRefresh: () => ref.read(notificationsProvider.notifier).refresh(),
            child: ListView.separated(
              padding: const EdgeInsets.fromLTRB(8, 8, 8, 24),
              itemCount: bundle.items.length,
              separatorBuilder: (_, __) => const SizedBox(height: 4),
              itemBuilder: (_, i) => _Row(
                item: bundle.items[i],
                onTap: () async {
                  await ref
                      .read(notificationsProvider.notifier)
                      .markRead(bundle.items[i].id);
                  final link = bundle.items[i].link;
                  if (link != null && link.isNotEmpty && context.mounted) {
                    context.push(link);
                  }
                },
              ),
            ),
          );
        },
      ),
    );
  }
}

class _Row extends StatelessWidget {
  const _Row({required this.item, required this.onTap});
  final AppNotification item;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Card(
      color: item.read ? null : cs.primaryContainer.withOpacity(0.4),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: item.read ? cs.surfaceContainerHighest : cs.primary,
          child: Icon(
            _iconFor(item.type),
            color: item.read ? cs.onSurface : cs.onPrimary,
            size: 20,
          ),
        ),
        title: Text(
          item.title,
          style: TextStyle(
            fontWeight: item.read ? FontWeight.w500 : FontWeight.w700,
          ),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 2),
            Text(item.message),
            const SizedBox(height: 4),
            Text(
              DateFormat.yMMMd().add_jm().format(item.createdAt),
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ],
        ),
        onTap: onTap,
      ),
    );
  }

  IconData _iconFor(String? t) {
    switch (t) {
      case 'service_request':
      case 'request':
        return Icons.assignment_outlined;
      case 'calibration':
        return Icons.precision_manufacturing_outlined;
      case 'certification':
        return Icons.workspace_premium_outlined;
      case 'message':
        return Icons.chat_bubble_outline;
      default:
        return Icons.notifications_outlined;
    }
  }
}
