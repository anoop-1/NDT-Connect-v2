// lib/features/home/home_screen.dart

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/auth/auth_repository.dart';
import '../../core/auth/auth_state.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final auth = ref.watch(authControllerProvider);
    final loggedIn = auth.value is AuthAuthenticated;
    final user = auth.value is AuthAuthenticated ? (auth.value as AuthAuthenticated).user : null;

    return Scaffold(
      appBar: AppBar(
        title: const Text('NDT Connect'),
        actions: [
          if (loggedIn)
            IconButton(
              tooltip: 'Settings',
              icon: const Icon(Icons.settings_outlined),
              onPressed: () => context.go('/settings'),
            )
          else
            TextButton(
              onPressed: () => context.go('/login'),
              child: const Text('Sign in'),
            ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          if (user != null)
            Text('Welcome back${user.name != null ? ', ${user.name}' : ''}.',
              style: Theme.of(context).textTheme.titleLarge),
          if (user == null)
            Text('Free NDT software — no card, just a user ID.',
              style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 16),
          _ShortcutGrid(loggedIn: loggedIn, role: user?.role),
        ],
      ),
    );
  }
}

class _ShortcutGrid extends StatelessWidget {
  const _ShortcutGrid({required this.loggedIn, required this.role});
  final bool loggedIn;
  final UserRole? role;

  @override
  Widget build(BuildContext context) {
    final tiles = <_Shortcut>[
      _Shortcut('Free tools', Icons.build_outlined, '/free-tools'),
      _Shortcut('Find providers', Icons.search, '/find-providers'),
      _Shortcut('Recommendations', Icons.auto_awesome_outlined, '/recommendations'),
      if (loggedIn) _Shortcut('Request service', Icons.add_task, '/request-service'),
      if (loggedIn) _Shortcut('My requests', Icons.list_alt, '/my-requests'),
      if (loggedIn) _Shortcut('Notifications', Icons.notifications_outlined, '/notifications'),
      if (loggedIn && (role == UserRole.provider || role == UserRole.inspector))
        _Shortcut('Provider dashboard', Icons.dashboard_customize_outlined, '/provider-dashboard'),
      if (!loggedIn) _Shortcut('Create free account', Icons.person_add_outlined, '/register'),
    ];
    return GridView.count(
      crossAxisCount: MediaQuery.sizeOf(context).width > 700 ? 3 : 2,
      mainAxisSpacing: 12,
      crossAxisSpacing: 12,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      childAspectRatio: 1.4,
      children: tiles
          .map((t) => Card(
                child: InkWell(
                  onTap: () => context.go(t.path),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(t.icon, size: 36, color: Theme.of(context).colorScheme.primary),
                        const SizedBox(height: 8),
                        Text(t.label, textAlign: TextAlign.center),
                      ],
                    ),
                  ),
                ),
              ))
          .toList(),
    );
  }
}

class _Shortcut {
  const _Shortcut(this.label, this.icon, this.path);
  final String label;
  final IconData icon;
  final String path;
}
