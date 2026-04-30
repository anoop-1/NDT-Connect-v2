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
      final res = await _dio.get('/api/providers');
      final list = (res.data['data'] as List?) ?? const [];
      var providers = list
          .map((e) => ServiceProvider.fromJson(e as Map<String, dynamic>))
          .toList();
      if (method != null && method.isNotEmpty) {
        providers = providers
            .where((p) => p.services.any((s) =>
                s.toLowerCase().contains(method.toLowerCase())))
            .toList();
      }
      if (city != null && city.isNotEmpty) {
        providers = providers
            .where((p) =>
                p.location.toLowerCase().contains(city.toLowerCase()))
            .toList();
      }
      return ProviderListPage(providers: providers, hasMore: false);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<ServiceProvider> get(String id) async {
    try {
      final res = await _dio.get('/api/users/$id');
      final data = res.data['data'] as Map<String, dynamic>;
      final profile = (data['providerProfile'] as Map?)?.cast<String, dynamic>() ?? {};
      final merged = {
        'id': data['id'],
        'name': profile['companyName'] ?? data['name'],
        'email': data['email'],
        'role': data['role'],
        'location': profile['location'],
        'services': profile['servicesOffered'],
        'specialization': profile['specialization'],
        'rating': profile['rating'],
        'description': profile['description'],
        'imageUrl': profile['companyLogoUrl'],
        'isVerified': profile['isVerified'],
        'contactNumber': profile['contactNumber'],
        'availableDocuments': profile['availableDocuments'],
      };
      return ServiceProvider.fromJson(merged);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }
}
