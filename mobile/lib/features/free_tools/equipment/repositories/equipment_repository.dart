// lib/features/free_tools/equipment/repositories/equipment_repository.dart

import 'package:dio/dio.dart';

import '../../../../core/api/api_exception.dart';
import '../models/equipment.dart';

class EquipmentRepository {
  EquipmentRepository(this._dio);
  final Dio _dio;

  Future<List<Equipment>> list({required String userId}) async {
    try {
      final res =
          await _dio.get('/api/equipment', queryParameters: {'userId': userId});
      final list = (res.data['data'] as List?) ?? const [];
      return list
          .map((e) => Equipment.fromJson(e as Map<String, dynamic>))
          .toList();
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<Equipment> create({required String userId, required Equipment input}) async {
    try {
      final body = {...input.toJson(), 'userId': userId}..remove('id');
      final res = await _dio.post('/api/equipment', data: body);
      return Equipment.fromJson(res.data['data'] as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<Equipment> update(String id, Map<String, dynamic> partial) async {
    try {
      final res = await _dio.put('/api/equipment/$id', data: partial);
      return Equipment.fromJson(res.data['data'] as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<void> delete(String id) async {
    try {
      await _dio.delete('/api/equipment/$id');
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }
}
