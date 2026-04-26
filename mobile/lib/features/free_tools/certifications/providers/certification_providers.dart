// lib/features/free_tools/certifications/providers/certification_providers.dart

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/api/api_client.dart';
import '../models/certification.dart';
import '../repositories/certification_repository.dart';

final certRepositoryProvider = Provider<CertificationRepository>((ref) {
  return CertificationRepository(ref.watch(apiClientProvider));
});

class CertListNotifier
    extends FamilyAsyncNotifier<List<Certification>, CertificationKind> {
  @override
  Future<List<Certification>> build(CertificationKind arg) {
    return ref.read(certRepositoryProvider).list(arg);
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(
      () => ref.read(certRepositoryProvider).list(arg),
    );
  }

  Future<Certification> create(Certification input) async {
    final created = await ref.read(certRepositoryProvider).create(input);
    state = AsyncValue.data([...?state.value, created]);
    return created;
  }

  Future<Certification> update(String id, Map<String, dynamic> partial) async {
    final updated =
        await ref.read(certRepositoryProvider).update(id, partial);
    state = AsyncValue.data([
      for (final c in (state.value ?? const <Certification>[]))
        if (c.id == id) updated else c
    ]);
    return updated;
  }

  Future<void> delete(String id) async {
    await ref.read(certRepositoryProvider).delete(id);
    state = AsyncValue.data([
      for (final c in (state.value ?? const <Certification>[]))
        if (c.id != id) c
    ]);
  }
}

final certListProvider = AsyncNotifierProvider.family<
    CertListNotifier, List<Certification>, CertificationKind>(
  CertListNotifier.new,
);
