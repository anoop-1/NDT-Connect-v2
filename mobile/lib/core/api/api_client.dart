// lib/core/api/api_client.dart
//
// Single Dio instance, configured with the API base URL, default headers,
// retry on transient errors, and an auth interceptor that injects the
// current access token and handles refresh on 401.

import 'package:dio/dio.dart';
import 'package:dio_smart_retry/dio_smart_retry.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../auth/auth_repository.dart';
import '../storage/secure_storage.dart';
import 'auth_interceptor.dart';

// TODO: move to env-driven config once flavors land.
const kApiBaseUrl = 'https://ndt-connect.com';

final apiClientProvider = Provider<Dio>((ref) {
  final dio = Dio(
    BaseOptions(
      baseUrl: kApiBaseUrl,
      connectTimeout: const Duration(seconds: 15),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    ),
  );

  dio.interceptors.add(AuthInterceptor(
    storage: ref.read(secureStorageProvider),
    refresh: () => ref.read(authRepositoryProvider).refreshToken(),
  ));

  dio.interceptors.add(
    RetryInterceptor(
      dio: dio,
      retries: 2,
      retryDelays: const [Duration(seconds: 1), Duration(seconds: 2)],
    ),
  );

  return dio;
});
