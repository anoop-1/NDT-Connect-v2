// lib/features/free_tools/equipment/providers/equipment_providers.dart

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/api/api_client.dart';
import '../../../../core/auth/auth_repository.dart';
import '../../../../core/auth/auth_state.dart';
import '../models/equipment.dart';
import '../repositories/equipment_repository.dart';

final equipmentRepositoryProvider = Provider<EquipmentRepository>((ref) {
  return EquipmentRepository(ref.watch(apiClientProvider));
});

class EquipmentListNotifier extends AsyncNotifier<List<Equipment>> {
  String? get _userId {
    final auth = ref.read(authControllerProvider).value;
    return auth is AuthAuthenticated ? auth.user.id : null;
  }

  @override
  Future<List<Equipment>> build() async {
    final id = _userId;
    if (id == null) return const [];
    return ref.read(equipmentRepositoryProvider).list(userId: id);
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      final id = _userId;
      if (id == null) return const <Equipment>[];
      return ref.read(equipmentRepositoryProvider).list(userId: id);
    });
  }

  Future<Equipment> create(Equipment input) async {
    final id = _userId;
    if (id == null) throw StateError('Not signed in');
    final repo = ref.read(equipmentRepositoryProvider);
    final created = await repo.create(userId: id, input: input);
    state = AsyncValue.data([...?state.value, created]);
    return created;
  }

  Future<Equipment> updateItem(String id, Map<String, dynamic> partial) async {
    final repo = ref.read(equipmentRepositoryProvider);
    final updated = await repo.update(id, partial);
    state = AsyncValue.data([
      for (final e in (state.value ?? const <Equipment>[]))
        if (e.id == id) updated else e
    ]);
    return updated;
  }

  Future<void> delete(String id) async {
    await ref.read(equipmentRepositoryProvider).delete(id);
    state = AsyncValue.data([
      for (final e in (state.value ?? const <Equipment>[]))
        if (e.id != id) e
    ]);
  }
}

final equipmentListProvider =
    AsyncNotifierProvider<EquipmentListNotifier, List<Equipment>>(
  EquipmentListNotifier.new,
);
