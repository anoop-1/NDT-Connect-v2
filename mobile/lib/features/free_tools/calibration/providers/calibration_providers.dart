// lib/features/free_tools/calibration/providers/calibration_providers.dart

import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/api/api_client.dart';
import '../models/calibration_alert.dart';
import '../repositories/calibration_repository.dart';

final calibrationRepositoryProvider = Provider<CalibrationRepository>((ref) {
  return CalibrationRepository(ref.watch(apiClientProvider));
});

class CalibrationAlertsNotifier
    extends AsyncNotifier<List<CalibrationAlert>> {
  @override
  Future<List<CalibrationAlert>> build() {
    return ref.read(calibrationRepositoryProvider).listAlerts();
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(
      () => ref.read(calibrationRepositoryProvider).listAlerts(),
    );
  }

  Future<CalibrationAlert> create(CalibrationAlert alert) async {
    final created =
        await ref.read(calibrationRepositoryProvider).createAlert(alert);
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
