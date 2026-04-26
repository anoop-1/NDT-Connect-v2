// lib/main_web.dart
//
// Web entry point. Initialises web-specific configuration before mounting
// the App: Mapbox public access token, FCM web VAPID key (when wired),
// and the URL strategy (clean URLs without # fragments).
//
// Build:
//   flutter build web --release -t lib/main_web.dart \
//     --dart-define=MAPBOX_PUBLIC_TOKEN=pk.eyJ... \
//     --dart-define=API_BASE_URL=https://ndt-connect.com
//
// Run dev:
//   flutter run -d chrome -t lib/main_web.dart \
//     --dart-define=MAPBOX_PUBLIC_TOKEN=pk.eyJ...

import 'dart:js' as js;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_web_plugins/url_strategy.dart';

import 'app.dart';
import 'core/storage/local_db.dart';

const _kMapboxToken = String.fromEnvironment('MAPBOX_PUBLIC_TOKEN');

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Clean URLs (https://app.ndt-connect.com/free-tools, no /#/free-tools).
  usePathUrlStrategy();

  // Web-only DB shim — switches sqflite to its IndexedDB-backed factory.
  await LocalDb.initForPlatform();

  // Inject the Mapbox public token into window.mapboxgl.accessToken so
  // mapbox-gl-js (loaded lazily by map_view_web.dart) can request tiles.
  if (_kMapboxToken.isNotEmpty) {
    final mapboxgl = js.context['mapboxgl'];
    if (mapboxgl != null) {
      js.JsObject.fromBrowserObject(mapboxgl)['accessToken'] = _kMapboxToken;
    }
  }

  runApp(const ProviderScope(child: App()));
}
