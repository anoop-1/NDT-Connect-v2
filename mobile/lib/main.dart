// lib/main.dart
//
// Entry point. Boots Flutter, initialises secure storage + Sentry + Firebase,
// then hands off to App which wires Riverpod and go_router.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'app.dart';
import 'core/api/api_client.dart';
import 'core/auth/auth_repository.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Defer heavy boot until after first frame so the splash unblocks ASAP.
  // Sentry / Firebase init goes here once their config files are in place.
  runApp(
    ProviderScope(
      overrides: [
        // Wire the auth-refresh callback published by api_client.dart so the
        // 401 retry path can call AuthRepository.refreshToken without the
        // top-level import cycle that would otherwise break type inference.
        authRefreshProvider.overrideWith(
          (Ref ref) => () => ref.read(authRepositoryProvider).refreshToken(),
        ),
      ],
      child: const App(),
    ),
  );
}
