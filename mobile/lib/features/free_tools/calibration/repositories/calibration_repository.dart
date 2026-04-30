// lib/features/free_tools/calibration/repositories/calibration_repository.dart

import 'package:dio/dio.dart';

import '../../../../core/api/api_exception.dart';
import '../models/calibration_alert.dart';

class CalibrationRepository {
  CalibrationRepository(this._dio);
  final Dio _dio;

  Future<List<CalibrationAlert>> listAlerts({required String userId}) async {
    try {
      final res = await _dio.get('/api/calibration-alerts',
          queryParameters: {'userId': userId});
      final list = (res.data['data'] as List?) ?? const [];
      return list
          .map((e) => CalibrationAlert.fromJson(e as Map<String, dynamic>))
          .toList();
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<CalibrationAlert> createAlert(
      {required String userId, required CalibrationAlert input}) async {
    try {
      final body = {...input.toJson(), 'userId': userId}..remove('id');
      final res = await _dio.post('/api/calibration-alerts', data: body);
      return CalibrationAlert.fromJson(res.data['data'] as Map<String, dynamic>);
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
