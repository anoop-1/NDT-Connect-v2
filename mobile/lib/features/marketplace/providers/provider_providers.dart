// lib/features/marketplace/providers/provider_providers.dart

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/api/api_client.dart';
import '../models/provider.dart';
import '../repositories/provider_repository.dart';

final providerRepositoryProvider = Provider<ProviderRepository>((ref) {
  return ProviderRepository(ref.watch(apiClientProvider));
});

class ProviderListState {
  const ProviderListState({
    required this.items,
    required this.page,
    required this.hasMore,
    required this.loadingMore,
  });

  final List<ServiceProvider> items;
  final int page;
  final bool hasMore;
  final bool loadingMore;

  ProviderListState copyWith({
    List<ServiceProvider>? items,
    int? page,
    bool? hasMore,
    bool? loadingMore,
  }) =>
      ProviderListState(
        items: items ?? this.items,
        page: page ?? this.page,
        hasMore: hasMore ?? this.hasMore,
        loadingMore: loadingMore ?? this.loadingMore,
      );

  static const empty = ProviderListState(
    items: [],
    page: 1,
    hasMore: false,
    loadingMore: false,
  );
}

class ProviderListNotifier
    extends FamilyAsyncNotifier<ProviderListState, ProviderListFilter> {
  @override
  Future<ProviderListState> build(ProviderListFilter arg) async {
    final page = await ref.read(providerRepositoryProvider).list(
          method: arg.method,
          city: arg.city,
          page: 1,
        );
    return ProviderListState(
      items: page.providers,
      page: 1,
      hasMore: page.hasMore,
      loadingMore: false,
    );
  }

  Future<void> loadMore() async {
    final current = state.value;
    if (current == null || !current.hasMore || current.loadingMore) return;
    state = AsyncValue.data(current.copyWith(loadingMore: true));
    try {
      final next = await ref.read(providerRepositoryProvider).list(
            method: arg.method,
            city: arg.city,
            page: current.page + 1,
          );
      state = AsyncValue.data(current.copyWith(
        items: [...current.items, ...next.providers],
        page: current.page + 1,
        hasMore: next.hasMore,
        loadingMore: false,
      ));
    } catch (e, st) {
      state = AsyncValue.error(e, st);
    }
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() => build(arg));
  }
}

final providerListProvider = AsyncNotifierProvider.family<
    ProviderListNotifier, ProviderListState, ProviderListFilter>(
  ProviderListNotifier.new,
);

final providerDetailProvider =
    FutureProvider.family<ServiceProvider, String>((ref, id) {
  return ref.watch(providerRepositoryProvider).get(id);
});
