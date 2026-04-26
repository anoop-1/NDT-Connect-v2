// lib/core/maps/map_view_web.dart
//
// Web implementation of MapView, backed by mapbox-gl-js loaded from the CDN.
// Mounted via HtmlElementView with a unique view-type per instance.
//
// Set the Mapbox public token in main_web.dart before MapView is rendered.
// `js` interop calls write the token into window.mapboxgl.accessToken.

import 'dart:async';
import 'dart:html' as html;
import 'dart:ui_web' as ui_web;
import 'dart:js_util' as js_util;
import 'dart:js' as js;

import 'package:flutter/widgets.dart';

import 'map_view.dart' show MapMarker;

const _mapboxJsUrl = 'https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js';
const _mapboxCssUrl = 'https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css';

bool _libsLoaded = false;
Future<void>? _libsLoadingFuture;

Future<void> _ensureMapboxLoaded() {
  if (_libsLoaded) return Future.value();
  if (_libsLoadingFuture != null) return _libsLoadingFuture!;
  _libsLoadingFuture = _injectAssets();
  return _libsLoadingFuture!;
}

Future<void> _injectAssets() async {
  if (html.document.querySelector('link[href="$_mapboxCssUrl"]') == null) {
    final link = html.LinkElement()
      ..rel = 'stylesheet'
      ..href = _mapboxCssUrl;
    html.document.head!.append(link);
  }
  if (html.document.querySelector('script[src="$_mapboxJsUrl"]') == null) {
    final completer = Completer<void>();
    final script = html.ScriptElement()
      ..src = _mapboxJsUrl
      ..async = true
      ..onLoad.first.then((_) => completer.complete())
      ..onError.first.then((_) => completer.completeError('mapbox-gl-js load failed'));
    html.document.head!.append(script);
    await completer.future;
  }
  _libsLoaded = true;
}

class PlatformMapView extends StatefulWidget {
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
  State<PlatformMapView> createState() => _PlatformMapViewState();
}

class _PlatformMapViewState extends State<PlatformMapView> {
  static int _id = 0;
  late final String _viewType = 'ndtconnect-map-${_id++}';
  late html.DivElement _container;

  @override
  void initState() {
    super.initState();
    _container = html.DivElement()
      ..style.width = '100%'
      ..style.height = '100%';
    ui_web.platformViewRegistry.registerViewFactory(_viewType, (_) => _container);
    _initMap();
  }

  Future<void> _initMap() async {
    await _ensureMapboxLoaded();
    final mapboxgl = js.context['mapboxgl'];
    if (mapboxgl == null) return;
    if (mapboxgl['accessToken'] == null || mapboxgl['accessToken'] == '') {
      // Token must be set globally in main_web.dart before this runs.
      // Fail open — map renders with watermark + zero tiles.
      // ignore: avoid_print
      print('[mapbox] accessToken not set; map will not render tiles');
    }
    final mapOpts = js_util.jsify({
      'container': _container,
      'style': 'mapbox://styles/mapbox/streets-v12',
      'center': [widget.initialLng, widget.initialLat],
      'zoom': widget.zoom,
    });
    final mapCtor = mapboxgl['Map'];
    final map = js_util.callConstructor(mapCtor, [mapOpts]);

    // Markers
    final markerCtor = mapboxgl['Marker'];
    for (final m in widget.markers) {
      final markerOpts = js_util.jsify({});
      final marker = js_util.callConstructor(markerCtor, [markerOpts]);
      js_util.callMethod(marker, 'setLngLat', [
        js_util.jsify([m.lng, m.lat])
      ]);
      js_util.callMethod(marker, 'addTo', [map]);
    }
  }

  @override
  Widget build(BuildContext context) {
    return HtmlElementView(viewType: _viewType);
  }
}

