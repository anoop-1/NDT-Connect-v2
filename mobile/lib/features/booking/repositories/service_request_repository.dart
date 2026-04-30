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
      final data = res.data['data'] as Map<String, dynamic>? ??
          res.data as Map<String, dynamic>;
      return ServiceRequest.fromJson(data);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<List<ServiceRequest>> list({
    String? clientId,
    String? providerId,
    String? status,
    bool includeOpen = false,
  }) async {
    try {
      final res = await _dio.get(
        '/api/service-requests',
        queryParameters: {
          if (clientId != null) 'clientId': clientId,
          if (providerId != null) 'providerId': providerId,
          if (status != null) 'status': status,
          if (includeOpen) 'includeOpen': 'true',
        },
      );
      final list = (res.data['data'] as List?) ?? const [];
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
      final data = res.data['data'] as Map<String, dynamic>? ??
          res.data as Map<String, dynamic>;
      return ServiceRequest.fromJson(data);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<ServiceRequest> updateStatus(String id, ServiceRequestStatus status) async {
    try {
      final res = await _dio.put(
        '/api/service-requests/$id',
        data: {'status': status.apiValue},
      );
      final data = res.data['data'] as Map<String, dynamic>? ??
          res.data as Map<String, dynamic>;
      return ServiceRequest.fromJson(data);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<ServiceRequest> assignProvider(
    String id, {
    required String providerId,
    String? providerName,
    num? estimatedCost,
  }) async {
    try {
      final res = await _dio.put(
        '/api/service-requests/$id',
        data: {
          'providerId': providerId,
          if (providerName != null) 'providerName': providerName,
          if (estimatedCost != null) 'estimatedCost': estimatedCost,
          'status': 'Confirmed',
        },
      );
      final data = res.data['data'] as Map<String, dynamic>? ??
          res.data as Map<String, dynamic>;
      return ServiceRequest.fromJson(data);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }
}
