// lib/core/maps/map_view_native.dart
//
// Native (Android/iOS) implementation using mapbox_maps_flutter.
// This file is referenced via a conditional import in map_view.dart and is
// NOT pulled onto the web build (the web build resolves to map_view_web.dart).

import 'package:flutter/material.dart';
import 'package:mapbox_maps_flutter/mapbox_maps_flutter.dart';

import 'map_view.dart' show MapMarker;

class PlatformMapView extends StatelessWidget {
  const PlatformMapView({
    super.key,
    required this.initialLat,
    required this.initialLng,
    required this.zoom,
    required this.markers,
  });

  final double initialLat;
  final double initialLng;
  final double zoom;
  final List<MapMarker> markers;

  @override
  Widget build(BuildContext context) {
    return MapWidget(
      cameraOptions: CameraOptions(
        center: Point(coordinates: Position(initialLng, initialLat)),
        zoom: zoom,
      ),
      onMapCreated: (controller) async {
        final pm = await controller.annotations.createPointAnnotationManager();
        for (final m in markers) {
          await pm.create(PointAnnotationOptions(
            geometry: Point(coordinates: Position(m.lng, m.lat)),
            textField: m.label,
          ));
        }
      },
    );
  }
}
