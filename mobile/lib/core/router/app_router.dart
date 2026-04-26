// lib/core/router/app_router.dart
//
// go_router configuration with auth-aware redirect.
// Routes that require authentication are protected by the redirect callback.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../auth/auth_repository.dart';
import '../auth/auth_state.dart';
import '../../features/auth/login_screen.dart';
import '../../features/auth/register_screen.dart';
import '../../features/home/home_screen.dart';
import '../../features/marketplace/ui/find_providers_screen.dart';
import '../../features/free_tools/free_tools_screen.dart';
import '../../features/free_tools/equipment/ui/equipment_list_screen.dart';
import '../../features/free_tools/calibration/ui/calibration_screen.dart';
import '../../features/free_tools/certifications/ui/certifications_screen.dart';
import '../../features/booking/ui/request_service_screen.dart';
import '../../features/booking/ui/my_requests_screen.dart';
import '../../features/booking/ui/track_request_screen.dart';
import '../../features/marketplace/ui/provider_detail_screen.dart';
import '../../features/provider_dashboard/ui/provider_dashboard_screen.dart';
import '../../features/settings/ui/settings_screen.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authControllerProvider);

  return GoRouter(
    initialLocation: '/',
    redirect: (context, state) {
      // While booting, never redirect — show whatever is asked for and let
      // screens render a loading indicator if they need auth.
      if (authState.isLoading) return null;

      final loggedIn = authState.value is AuthAuthenticated;
      final goingToAuth = state.matchedLocation == '/login' ||
          state.matchedLocation == '/register';

      if (!loggedIn && _requiresAuth(state.matchedLocation)) return '/login';
      if (loggedIn && goingToAuth) return '/';
      return null;
    },
    routes: [
      GoRoute(path: '/', builder: (_, __) => const HomeScreen()),
      GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),
      GoRoute(path: '/register', builder: (_, __) => const RegisterScreen()),
      GoRoute(path: '/find-providers', builder: (_, __) => const FindProvidersScreen()),
      GoRoute(
        path: '/provider/:id',
        builder: (_, state) =>
            ProviderDetailScreen(providerId: state.pathParameters['id'] ?? ''),
      ),
      GoRoute(
        path: '/track-request/:id',
        builder: (_, state) =>
            TrackRequestScreen(requestId: state.pathParameters['id'] ?? ''),
      ),
      GoRoute(path: '/free-tools', builder: (_, __) => const FreeToolsScreen()),
      GoRoute(path: '/free-tools/equipment', builder: (_, __) => const EquipmentListScreen()),
      GoRoute(path: '/free-tools/calibration', builder: (_, __) => const CalibrationScreen()),
      GoRoute(path: '/free-tools/certifications', builder: (_, __) => const CertificationsScreen()),
      GoRoute(path: '/request-service', builder: (_, __) => const RequestServiceScreen()),
      GoRoute(path: '/my-requests', builder: (_, __) => const MyRequestsScreen()),
      GoRoute(path: '/provider-dashboard', builder: (_, __) => const ProviderDashboardScreen()),
      GoRoute(path: '/settings', builder: (_, __) => const SettingsScreen()),
    ],
    errorBuilder: (_, state) => Scaffold(
      appBar: AppBar(title: const Text('Not found')),
      body: Center(child: Text('No route for ${state.matchedLocation}')),
    ),
  );
});

bool _requiresAuth(String location) {
  const publicPrefixes = [
    '/',
    '/login',
    '/register',
    '/find-providers',
    '/free-tools',
  ];
  for (final prefix in publicPrefixes) {
    if (prefix == '/' && location == '/') return false;
    if (prefix != '/' && location.startsWith(prefix)) return false;
  }
  return true;
}
