// lib/main.dart
//
// Entry point. Boots Flutter, initialises secure storage + Sentry + Firebase,
// then hands off to App which wires Riverpod and go_router.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Defer heavy boot until after first frame so the splash unblocks ASAP.
  // Sentry / Firebase init goes here once their config files are in place.
  runApp(
    const ProviderScope(
      child: App(),
    ),
  );
}
