// lib/features/booking/providers/service_request_providers.dart

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/api/api_client.dart';
import '../models/service_request.dart';
import '../repositories/service_request_repository.dart';

final serviceRequestRepositoryProvider =
    Provider<ServiceRequestRepository>((ref) {
  return ServiceRequestRepository(ref.watch(apiClientProvider));
});

class MyRequestsNotifier extends AsyncNotifier<List<ServiceRequest>> {
  @override
  Future<List<ServiceRequest>> build() {
    return ref.read(serviceRequestRepositoryProvider).list();
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(
      () => ref.read(serviceRequestRepositoryProvider).list(),
    );
  }

  Future<ServiceRequest> create(Map<String, dynamic> body) async {
    final created =
        await ref.read(serviceRequestRepositoryProvider).create(body);
    state = AsyncValue.data([created, ...?state.value]);
    return created;
  }
}

final myRequestsProvider =
    AsyncNotifierProvider<MyRequestsNotifier, List<ServiceRequest>>(
  MyRequestsNotifier.new,
);

final serviceRequestDetailProvider =
    FutureProvider.family<ServiceRequest, String>((ref, id) {
  return ref.watch(serviceRequestRepositoryProvider).get(id);
});
