// lib/core/api/api_exception.dart
//
// Typed exception surface for API failures. Use ApiException.fromDio to wrap
// a DioException into a friendlier shape.

import 'package:dio/dio.dart';

class ApiException implements Exception {
  ApiException({
    required this.message,
    this.statusCode,
    this.code,
  });

  final String message;
  final int? statusCode;
  final String? code;

  factory ApiException.fromDio(DioException e) {
    final response = e.response;
    if (response != null) {
      final body = response.data;
      String message = 'Request failed (${response.statusCode}).';
      String? code;
      if (body is Map) {
        message = (body['error']?.toString() ?? body['message']?.toString() ?? message);
        code = body['code']?.toString();
      }
      return ApiException(
        message: message,
        statusCode: response.statusCode,
        code: code,
      );
    }
    return ApiException(message: e.message ?? 'Network error');
  }

  @override
  String toString() => 'ApiException($statusCode $code): $message';
}
