// lib/features/marketplace/repositories/provider_repository.dart

import 'package:dio/dio.dart';

import '../../../core/api/api_exception.dart';
import '../models/provider.dart';

class ProviderRepository {
  ProviderRepository(this._dio);
  final Dio _dio;

  Future<ProviderListPage> list({
    String? method,
    String? city,
    int page = 1,
  }) async {
    try {
      final res = await _dio.get(
        '/api/providers',
        queryParameters: {
          if (method != null && method.isNotEmpty) 'method': method,
          if (city != null && city.isNotEmpty) 'city': city,
          'page': page,
        },
      );
      final list = (res.data['providers'] as List?) ?? const [];
      final providers = list
          .map((e) => ServiceProvider.fromJson(e as Map<String, dynamic>))
          .toList();
      final hasMore = res.data['hasMore'] == true;
      return ProviderListPage(providers: providers, hasMore: hasMore);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<ServiceProvider> get(String id) async {
    try {
      final res = await _dio.get('/api/providers/$id');
      return ServiceProvider.fromJson(res.data['provider'] as Map<String, dynamic>);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }
}
