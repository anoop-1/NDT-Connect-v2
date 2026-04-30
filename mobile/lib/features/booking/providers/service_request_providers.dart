// lib/features/booking/providers/service_request_providers.dart

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/api/api_client.dart';
import '../../../core/auth/auth_repository.dart';
import '../../../core/auth/auth_state.dart';
import '../models/service_request.dart';
import '../repositories/service_request_repository.dart';

final serviceRequestRepositoryProvider =
    Provider<ServiceRequestRepository>((ref) {
  return ServiceRequestRepository(ref.watch(apiClientProvider));
});

class MyRequestsNotifier extends AsyncNotifier<List<ServiceRequest>> {
  String? get _clientId {
    final auth = ref.read(authControllerProvider).value;
    return auth is AuthAuthenticated ? auth.user.id : null;
  }

  @override
  Future<List<ServiceRequest>> build() {
    final id = _clientId;
    if (id == null) return Future.value(const []);
    return ref.read(serviceRequestRepositoryProvider).list(clientId: id);
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() {
      final id = _clientId;
      if (id == null) return Future.value(const <ServiceRequest>[]);
      return ref.read(serviceRequestRepositoryProvider).list(clientId: id);
    });
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

class ProviderRequestsNotifier extends AsyncNotifier<List<ServiceRequest>> {
  String? get _providerId {
    final auth = ref.read(authControllerProvider).value;
    return auth is AuthAuthenticated ? auth.user.id : null;
  }

  @override
  Future<List<ServiceRequest>> build() {
    final id = _providerId;
    if (id == null) return Future.value(const []);
    return ref
        .read(serviceRequestRepositoryProvider)
        .list(providerId: id, includeOpen: true);
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() {
      final id = _providerId;
      if (id == null) return Future.value(const <ServiceRequest>[]);
      return ref
          .read(serviceRequestRepositoryProvider)
          .list(providerId: id, includeOpen: true);
    });
  }

  Future<void> updateStatus(String id, ServiceRequestStatus status) async {
    await ref
        .read(serviceRequestRepositoryProvider)
        .updateStatus(id, status);
    await refresh();
  }

  Future<void> claim(String id, {String? providerName, num? estimatedCost}) async {
    final pid = _providerId;
    if (pid == null) return;
    await ref.read(serviceRequestRepositoryProvider).assignProvider(
          id,
          providerId: pid,
          providerName: providerName,
          estimatedCost: estimatedCost,
        );
    await refresh();
  }
}

final providerRequestsProvider =
    AsyncNotifierProvider<ProviderRequestsNotifier, List<ServiceRequest>>(
  ProviderRequestsNotifier.new,
);

final serviceRequestDetailProvider =
    FutureProvider.family<ServiceRequest, String>((ref, id) {
  return ref.watch(serviceRequestRepositoryProvider).get(id);
});
