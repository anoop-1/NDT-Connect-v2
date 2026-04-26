// lib/features/free_tools/calibration/repositories/calibration_repository.dart

import 'package:dio/dio.dart';

import '../../../../core/api/api_exception.dart';
import '../models/calibration_alert.dart';

class CalibrationRepository {
  CalibrationRepository(this._dio);
  final Dio _dio;

  Future<List<CalibrationAlert>> listAlerts() async {
    try {
      final res = await _dio.get('/api/calibration-alerts');
      final list = (res.data['alerts'] as List?) ?? const [];
      return list
          .map((e) => CalibrationAlert.fromJson(e as Map<String, dynamic>))
          .toList();
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<CalibrationAlert> createAlert(CalibrationAlert input) async {
    try {
      final body = input.toJson()..remove('id');
      final res = await _dio.post('/api/calibration-alerts', data: body);
      return CalibrationAlert.fromJson(
          res.data['alert'] as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<void> deleteAlert(String id) async {
    try {
      await _dio.delete('/api/calibration-alerts/$id');
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }
}
