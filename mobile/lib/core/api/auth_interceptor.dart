// lib/core/api/auth_interceptor.dart
//
// Injects the current access token into every outgoing request.
// On 401, attempts a single token refresh, then retries the original request.
// On refresh failure, clears tokens and lets the error propagate so router
// guards can redirect to /login.

import 'package:dio/dio.dart';

import '../storage/secure_storage.dart';

typedef RefreshFn = Future<bool> Function();

class AuthInterceptor extends Interceptor {
  AuthInterceptor({required this.storage, required this.refresh});

  final SecureStorage storage;
  final RefreshFn refresh;

  bool _refreshing = false;

  @override
  Future<void> onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final token = await storage.readAccessToken();
    if (token != null && token.isNotEmpty) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }

  @override
  Future<void> onError(
    DioException err,
    ErrorInterceptorHandler handler,
  ) async {
    final isUnauthorized = err.response?.statusCode == 401;
    final isRefreshCall = err.requestOptions.path.contains('/auth/refresh');

    if (!isUnauthorized || isRefreshCall || _refreshing) {
      return handler.next(err);
    }

    _refreshing = true;
    try {
      final ok = await refresh();
      if (!ok) {
        await storage.clearTokens();
        return handler.next(err);
      }

      final token = await storage.readAccessToken();
      final retried = await Dio(BaseOptions(
        baseUrl: err.requestOptions.baseUrl,
      )).fetch(
        err.requestOptions
          ..headers['Authorization'] = 'Bearer $token',
      );
      return handler.resolve(retried);
    } catch (_) {
      return handler.next(err);
    } finally {
      _refreshing = false;
    }
  }
}
