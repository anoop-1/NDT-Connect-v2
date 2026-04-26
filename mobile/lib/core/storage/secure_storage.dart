// lib/core/storage/secure_storage.dart
//
// Thin wrapper over flutter_secure_storage for our specific tokens.
// Keychain on iOS, EncryptedSharedPreferences on Android.

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

const _kAccessTokenKey = 'ndt.access_token';
const _kRefreshTokenKey = 'ndt.refresh_token';

class SecureStorage {
  SecureStorage(this._inner);
  final FlutterSecureStorage _inner;

  Future<String?> readAccessToken() => _inner.read(key: _kAccessTokenKey);
  Future<String?> readRefreshToken() => _inner.read(key: _kRefreshTokenKey);

  Future<void> writeTokens({
    required String accessToken,
    required String refreshToken,
  }) async {
    await _inner.write(key: _kAccessTokenKey, value: accessToken);
    await _inner.write(key: _kRefreshTokenKey, value: refreshToken);
  }

  Future<void> clearTokens() async {
    await _inner.delete(key: _kAccessTokenKey);
    await _inner.delete(key: _kRefreshTokenKey);
  }
}

final secureStorageProvider = Provider<SecureStorage>((ref) {
  return SecureStorage(
    const FlutterSecureStorage(
      aOptions: AndroidOptions(encryptedSharedPreferences: true),
      iOptions: IOSOptions(accessibility: KeychainAccessibility.first_unlock),
    ),
  );
});
