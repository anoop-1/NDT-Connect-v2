// lib/core/auth/auth_repository.dart
//
// Talks to /api/auth/* endpoints. Owns secure-storage writes for tokens.
// Exposes a simple AsyncNotifier for AuthState that screens can watch.

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../api/api_client.dart';
import '../api/api_exception.dart';
import '../storage/secure_storage.dart';
import 'auth_state.dart';

class AuthRepository {
  AuthRepository({required this.dio, required this.storage});
  final Dio dio;
  final SecureStorage storage;

  Future<AppUser> login({required String email, required String password}) async {
    try {
      final res = await dio.post('/api/auth/login', data: {'email': email, 'password': password});
      return _persistAndDecode(res);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<AppUser> register({
    required String email,
    required String password,
    required UserRole role,
    String? companyName,
  }) async {
    try {
      final res = await dio.post('/api/auth/register', data: {
        'email': email,
        'password': password,
        'role': role.name,
        if (companyName != null) 'companyName': companyName,
      });
      return _persistAndDecode(res);
    } on DioException catch (e) {
      throw ApiException.fromDio(e);
    }
  }

  Future<bool> refreshToken() async {
    final refresh = await storage.readRefreshToken();
    if (refresh == null) return false;
    try {
      final res = await dio.post('/api/auth/refresh', data: {'refreshToken': refresh});
      final access = res.data['accessToken'] as String?;
      final newRefresh = (res.data['refreshToken'] as String?) ?? refresh;
      if (access == null) return false;
      await storage.writeTokens(accessToken: access, refreshToken: newRefresh);
      return true;
    } catch (_) {
      return false;
    }
  }

  Future<AppUser?> hydrate() async {
    final token = await storage.readAccessToken();
    if (token == null) return null;
    try {
      final res = await dio.get('/api/me');
      return AppUser.fromJson(res.data as Map<String, dynamic>);
    } catch (_) {
      return null;
    }
  }

  Future<void> logout() async {
    try {
      await dio.post('/api/auth/logout');
    } catch (_) {
      // Best-effort.
    }
    await storage.clearTokens();
  }

  Future<AppUser> _persistAndDecode(Response res) async {
    final access = res.data['accessToken'] as String?;
    final refresh = res.data['refreshToken'] as String?;
    if (access == null || refresh == null) {
      throw ApiException(message: 'Login response missing tokens');
    }
    await storage.writeTokens(accessToken: access, refreshToken: refresh);
    return AppUser.fromJson(res.data['user'] as Map<String, dynamic>);
  }
}

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepository(
    dio: ref.watch(apiClientProvider),
    storage: ref.watch(secureStorageProvider),
  );
});

class AuthController extends AsyncNotifier<AuthState> {
  @override
  Future<AuthState> build() async {
    final repo = ref.read(authRepositoryProvider);
    final user = await repo.hydrate();
    return user == null ? const AuthUnauthenticated() : AuthAuthenticated(user);
  }

  Future<void> login(String email, String password) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      final user = await ref.read(authRepositoryProvider).login(email: email, password: password);
      return AuthAuthenticated(user);
    });
  }

  Future<void> register({
    required String email,
    required String password,
    required UserRole role,
    String? companyName,
  }) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      final user = await ref.read(authRepositoryProvider).register(
        email: email, password: password, role: role, companyName: companyName,
      );
      return AuthAuthenticated(user);
    });
  }

  Future<void> logout() async {
    await ref.read(authRepositoryProvider).logout();
    state = const AsyncValue.data(AuthUnauthenticated());
  }
}

final authControllerProvider = AsyncNotifierProvider<AuthController, AuthState>(
  AuthController.new,
);
