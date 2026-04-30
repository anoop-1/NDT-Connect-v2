// lib/features/free_tools/calibration/providers/calibration_providers.dart

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/api/api_client.dart';
import '../../../../core/auth/auth_repository.dart';
import '../../../../core/auth/auth_state.dart';
import '../models/calibration_alert.dart';
import '../repositories/calibration_repository.dart';

final calibrationRepositoryProvider = Provider<CalibrationRepository>((ref) {
  return CalibrationRepository(ref.watch(apiClientProvider));
});

class CalibrationAlertsNotifier
    extends AsyncNotifier<List<CalibrationAlert>> {
  String? get _userId {
    final auth = ref.read(authControllerProvider).value;
    return auth is AuthAuthenticated ? auth.user.id : null;
  }

  @override
  Future<List<CalibrationAlert>> build() {
    final id = _userId;
    if (id == null) return Future.value(const []);
    return ref.read(calibrationRepositoryProvider).listAlerts(userId: id);
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() {
      final id = _userId;
      if (id == null) return Future.value(const <CalibrationAlert>[]);
      return ref.read(calibrationRepositoryProvider).listAlerts(userId: id);
    });
  }

  Future<CalibrationAlert> create(CalibrationAlert alert) async {
    final id = _userId;
    if (id == null) throw StateError('Not signed in');
    final created = await ref
        .read(calibrationRepositoryProvider)
        .createAlert(userId: id, input: alert);
    state = AsyncValue.data([...?state.value, created]);
    return created;
  }

  Future<void> delete(String id) async {
    await ref.read(calibrationRepositoryProvider).deleteAlert(id);
    state = AsyncValue.data([
      for (final a in (state.value ?? const <CalibrationAlert>[]))
        if (a.id != id) a
    ]);
  }
}

final calibrationAlertsProvider = AsyncNotifierProvider<
    CalibrationAlertsNotifier, List<CalibrationAlert>>(
  CalibrationAlertsNotifier.new,
);
