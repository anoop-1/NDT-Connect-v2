// lib/core/predefined_lists/predefined_lists_repository.dart
//
// Centralised CRUD over user-scoped predefined option lists. Backs every
// "type" / "method" / "level" dropdown in the app with an API-driven source
// so the user can curate their own options and add custom values.

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../api/api_client.dart';
import '../api/api_exception.dart';

class PredefinedListsRepository {
  PredefinedListsRepository(this._dio);
  final Dio _dio;

  Future<List<String>> get(String listKey) async {
    try {
      final res = await _dio.get('/api/user/predefined-lists/$listKey');
      final items = (res.data['items'] as List?) ?? const [];
      return items.map((e) => e.toString()).toList();
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<List<String>> add(String listKey, String item) async {
    try {
      final res = await _dio.post(
        '/api/user/predefined-lists/$listKey',
        data: {'item': item},
      );
      final items = (res.data['items'] as List?) ?? const [];
      return items.map((e) => e.toString()).toList();
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<List<String>> replace(String listKey, List<String> items) async {
    try {
      final res = await _dio.put(
        '/api/user/predefined-lists/$listKey',
        data: {'items': items},
      );
      final out = (res.data['items'] as List?) ?? const [];
      return out.map((e) => e.toString()).toList();
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }
}

final predefinedListsRepositoryProvider =
    Provider<PredefinedListsRepository>((ref) {
  return PredefinedListsRepository(ref.watch(apiClientProvider));
});

/// AsyncNotifier family keyed by list key. Caches results per-key and exposes
/// addItem() so screens can append a custom value without a full refresh.
class PredefinedListNotifier
    extends FamilyAsyncNotifier<List<String>, String> {
  @override
  Future<List<String>> build(String listKey) async {
    return ref.read(predefinedListsRepositoryProvider).get(listKey);
  }

  Future<void> addItem(String item) async {
    final repo = ref.read(predefinedListsRepositoryProvider);
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() => repo.add(arg, item));
  }
}

final predefinedListProvider = AsyncNotifierProvider.family<
    PredefinedListNotifier, List<String>, String>(
  PredefinedListNotifier.new,
);
