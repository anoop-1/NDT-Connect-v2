// lib/core/api/api_client.dart
//
// Single Dio instance, configured with the API base URL, default headers,
// retry on transient errors, and an auth interceptor that injects the
// current access token and handles refresh on 401.
//
// NOTE: This file deliberately avoids importing auth_repository.dart to
// prevent a static type-inference cycle (auth_repository.dart imports
// api_client.dart). The refresh callback is wired via dynamic ref.read
// at runtime — the cycle exists only at runtime resolution, not at
// top-level type inference.

import 'package:dio/dio.dart';
import 'package:dio_smart_retry/dio_smart_retry.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../storage/secure_storage.dart';
import 'auth_interceptor.dart';

// TODO: move to env-driven config once flavors land.
const kApiBaseUrl = 'https://ndt-connect.com';

/// Late-bound provider override for the refresh callback. The auth layer
/// publishes its `refreshToken` function here once it's constructed; until
/// then, refresh attempts return false and the request fails normally.
final authRefreshProvider = Provider<RefreshFn>((Ref ref) {
  return () async => false;
});

final apiClientProvider = Provider<Dio>((Ref ref) {
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
    refresh: () => ref.read(authRefreshProvider).call(),
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
