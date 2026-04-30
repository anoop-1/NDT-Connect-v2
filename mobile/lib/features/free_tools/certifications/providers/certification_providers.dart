// lib/features/free_tools/certifications/providers/certification_providers.dart

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/api/api_client.dart';
import '../../../../core/auth/auth_repository.dart';
import '../../../../core/auth/auth_state.dart';
import '../models/certification.dart';
import '../repositories/certification_repository.dart';

final certRepositoryProvider = Provider<CertificationRepository>((ref) {
  return CertificationRepository(ref.watch(apiClientProvider));
});

class CertBundleNotifier extends AsyncNotifier<CertificationBundle> {
  String? get _userId {
    final auth = ref.read(authControllerProvider).value;
    return auth is AuthAuthenticated ? auth.user.id : null;
  }

  @override
  Future<CertificationBundle> build() async {
    final id = _userId;
    if (id == null) {
      return const CertificationBundle(personnel: [], company: []);
    }
    return ref.read(certRepositoryProvider).fetch(userId: id);
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      final id = _userId;
      if (id == null) {
        return const CertificationBundle(personnel: [], company: []);
      }
      return ref.read(certRepositoryProvider).fetch(userId: id);
    });
  }

  List<Certification> _list(CertificationKind kind) {
    final v = state.value;
    if (v == null) return const [];
    return kind == CertificationKind.personnel ? v.personnel : v.company;
  }

  Future<void> upsert(Certification cert) async {
    final id = _userId;
    if (id == null) throw StateError('Not signed in');
    final personnel = [..._list(CertificationKind.personnel)];
    final company = [..._list(CertificationKind.company)];
    final list = cert.kind == CertificationKind.personnel ? personnel : company;
    final idx = int.tryParse(cert.id);
    if (idx != null && idx >= 0 && idx < list.length) {
      list[idx] = cert;
    } else {
      list.add(cert);
    }
    final updated = await ref
        .read(certRepositoryProvider)
        .save(userId: id, personnel: personnel, company: company);
    state = AsyncValue.data(updated);
  }

  Future<void> delete(Certification cert) async {
    final id = _userId;
    if (id == null) throw StateError('Not signed in');
    final personnel = [..._list(CertificationKind.personnel)];
    final company = [..._list(CertificationKind.company)];
    final list = cert.kind == CertificationKind.personnel ? personnel : company;
    final idx = int.tryParse(cert.id);
    if (idx != null && idx >= 0 && idx < list.length) {
      list.removeAt(idx);
    }
    final updated = await ref
        .read(certRepositoryProvider)
        .save(userId: id, personnel: personnel, company: company);
    state = AsyncValue.data(updated);
  }
}

final certBundleProvider =
    AsyncNotifierProvider<CertBundleNotifier, CertificationBundle>(
  CertBundleNotifier.new,
);

final certListProvider =
    Provider.family<AsyncValue<List<Certification>>, CertificationKind>(
        (ref, kind) {
  return ref.watch(certBundleProvider).whenData((b) =>
      kind == CertificationKind.personnel ? b.personnel : b.company);
});
