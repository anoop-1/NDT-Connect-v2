// lib/features/free_tools/certifications/repositories/certification_repository.dart

import 'package:dio/dio.dart';

import '../../../../core/api/api_exception.dart';
import '../models/certification.dart';

class CertificationRepository {
  CertificationRepository(this._dio);
  final Dio _dio;

  Future<List<Certification>> list(CertificationKind kind) async {
    try {
      final res = await _dio.get(
        '/api/certifications',
        queryParameters: {'kind': kind.name},
      );
      final list = (res.data['certifications'] as List?) ?? const [];
      return list
          .map((e) => Certification.fromJson(e as Map<String, dynamic>))
          .toList();
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<Certification> create(Certification input) async {
    try {
      final body = input.toJson()..remove('id');
      final res = await _dio.post('/api/certifications', data: body);
      return Certification.fromJson(
          res.data['certification'] as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<Certification> update(String id, Map<String, dynamic> partial) async {
    try {
      final res =
          await _dio.patch('/api/certifications/$id', data: partial);
      return Certification.fromJson(
          res.data['certification'] as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<void> delete(String id) async {
    try {
      await _dio.delete('/api/certifications/$id');
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }
}
