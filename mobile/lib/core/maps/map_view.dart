// lib/core/maps/map_view.dart
//
// Cross-platform map widget. Native (Android/iOS) uses mapbox_maps_flutter.
// Web uses an HtmlElementView pointing at mapbox-gl-js loaded from the
// official CDN.
//
// The web implementation is intentionally minimal — it loads the JS library
// once via document.head injection, then mounts a <div> mapbox-gl-js binds to.
// All control plumbing (markers, popups, camera) is exposed through a
// MapController abstraction so feature code stays platform-agnostic.

import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';

// Lazy imports — avoid pulling mapbox_maps_flutter onto the web build, which
// would fail at compile-time. The conditional pattern below resolves at
// build time so each platform only sees its own implementation.

import 'map_view_native.dart' if (dart.library.html) 'map_view_web.dart' as platform;

class MapView extends StatelessWidget {
  const MapView({
    super.key,
    required this.initialLat,
    required this.initialLng,
    this.zoom = 4.0,
    this.markers = const [],
  });

  final double initialLat;
  final double initialLng;
  final double zoom;
  final List<MapMarker> markers;

  @override
  Widget build(BuildContext context) {
    return platform.PlatformMapView(
      initialLat: initialLat,
      initialLng: initialLng,
      zoom: zoom,
      markers: markers,
    );
  }
}

class MapMarker {
  const MapMarker({required this.id, required this.lat, required this.lng, this.label});
  final String id;
  final double lat;
  final double lng;
  final String? label;
}
