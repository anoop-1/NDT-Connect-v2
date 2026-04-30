// lib/features/notifications/providers/notification_providers.dart

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/api/api_client.dart';
import '../../../core/api/api_exception.dart';
import '../../../core/auth/auth_repository.dart';
import '../../../core/auth/auth_state.dart';
import '../models/notification.dart';

class NotificationsBundle {
  const NotificationsBundle({required this.items, required this.unreadCount});
  final List<AppNotification> items;
  final int unreadCount;
}

class NotificationsNotifier extends AsyncNotifier<NotificationsBundle> {
  String? get _userId {
    final auth = ref.read(authControllerProvider).value;
    return auth is AuthAuthenticated ? auth.user.id : null;
  }

  Future<NotificationsBundle> _fetch() async {
    final id = _userId;
    if (id == null) {
      return const NotificationsBundle(items: [], unreadCount: 0);
    }
    final dio = ref.read(apiClientProvider);
    try {
      final res = await dio.get('/api/notifications',
          queryParameters: {'userId': id, 'limit': 50});
      final list = (res.data['data'] as List?) ?? const [];
      final unread = (res.data['unreadCount'] as int?) ?? 0;
      return NotificationsBundle(
        items: list
            .map((e) => AppNotification.fromJson(e as Map<String, dynamic>))
            .toList(),
        unreadCount: unread,
      );
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  @override
  Future<NotificationsBundle> build() => _fetch();

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(_fetch);
  }

  Future<void> markAllRead() async {
    final id = _userId;
    if (id == null) return;
    try {
      await ref
          .read(apiClientProvider)
          .patch('/api/notifications', data: {'userId': id});
      await refresh();
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<void> markRead(String notificationId) async {
    try {
      await ref.read(apiClientProvider).patch('/api/notifications', data: {
        'notificationIds': [notificationId],
      });
      await refresh();
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }
}

final notificationsProvider =
    AsyncNotifierProvider<NotificationsNotifier, NotificationsBundle>(
  NotificationsNotifier.new,
);
