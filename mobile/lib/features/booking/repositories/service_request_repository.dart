// lib/features/booking/repositories/service_request_repository.dart

import 'package:dio/dio.dart';

import '../../../core/api/api_exception.dart';
import '../models/service_request.dart';

class ServiceRequestRepository {
  ServiceRequestRepository(this._dio);
  final Dio _dio;

  Future<ServiceRequest> create(Map<String, dynamic> body) async {
    try {
      final res = await _dio.post('/api/service-requests', data: body);
      return ServiceRequest.fromJson(
          res.data['request'] as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<List<ServiceRequest>> list() async {
    try {
      final res = await _dio.get('/api/service-requests');
      final list = (res.data['requests'] as List?) ?? const [];
      return list
          .map((e) => ServiceRequest.fromJson(e as Map<String, dynamic>))
          .toList();
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<ServiceRequest> get(String id) async {
    try {
      final res = await _dio.get('/api/service-requests/$id');
      return ServiceRequest.fromJson(
          res.data['request'] as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }
}
