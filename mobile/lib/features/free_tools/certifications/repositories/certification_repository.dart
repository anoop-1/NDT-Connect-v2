// lib/features/free_tools/certifications/repositories/certification_repository.dart

import 'package:dio/dio.dart';

import '../../../../core/api/api_exception.dart';
import '../models/certification.dart';

class CertificationBundle {
  const CertificationBundle({
    required this.personnel,
    required this.company,
  });
  final List<Certification> personnel;
  final List<Certification> company;
}

class CertificationRepository {
  CertificationRepository(this._dio);
  final Dio _dio;

  Future<CertificationBundle> fetch({required String userId}) async {
    try {
      final res = await _dio.get('/api/certifications',
          queryParameters: {'userId': userId});
      final data = (res.data['data'] as Map?)?.cast<String, dynamic>() ?? {};
      final personnelRaw = (data['personnelQualifications'] as List?) ?? const [];
      final companyRaw = (data['companyCertifications'] as List?) ?? const [];
      return CertificationBundle(
        personnel: List.generate(personnelRaw.length, (i) {
          final raw = (personnelRaw[i] as Map).cast<String, dynamic>();
          return Certification.fromJson(
              {...raw, 'kind': 'personnel', 'id': i.toString()});
        }),
        company: List.generate(companyRaw.length, (i) {
          final raw = (companyRaw[i] as Map).cast<String, dynamic>();
          return Certification.fromJson(
              {...raw, 'kind': 'company', 'id': i.toString()});
        }),
      );
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<CertificationBundle> save({
    required String userId,
    required List<Certification> personnel,
    required List<Certification> company,
  }) async {
    try {
      final res = await _dio.put('/api/certifications', data: {
        'userId': userId,
        'personnelQualifications':
            personnel.map((e) => e.toJson()..remove('id')).toList(),
        'companyCertifications':
            company.map((e) => e.toJson()..remove('id')).toList(),
      });
      final data = (res.data['data'] as Map?)?.cast<String, dynamic>() ?? {};
      final personnelRaw =
          (data['personnelQualifications'] as List?) ?? const [];
      final companyRaw =
          (data['companyCertifications'] as List?) ?? const [];
      return CertificationBundle(
        personnel: List.generate(personnelRaw.length, (i) {
          final raw = (personnelRaw[i] as Map).cast<String, dynamic>();
          return Certification.fromJson(
              {...raw, 'kind': 'personnel', 'id': i.toString()});
        }),
        company: List.generate(companyRaw.length, (i) {
          final raw = (companyRaw[i] as Map).cast<String, dynamic>();
          return Certification.fromJson(
              {...raw, 'kind': 'company', 'id': i.toString()});
        }),
      );
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }
}
