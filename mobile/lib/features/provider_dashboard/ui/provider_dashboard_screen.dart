// lib/features/provider_dashboard/ui/provider_dashboard_screen.dart

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ProviderDashboardScreen extends StatelessWidget {
  const ProviderDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final tiles = [
      _Tile('Incoming requests', Icons.inbox_outlined, '/my-requests'),
      _Tile('Equipment', Icons.precision_manufacturing_outlined, '/free-tools/equipment'),
      _Tile('Calibration', Icons.notifications_active_outlined, '/free-tools/calibration'),
      _Tile('Certifications', Icons.workspace_premium_outlined, '/free-tools/certifications'),
    ];
    return Scaffold(
      appBar: AppBar(title: const Text('Provider dashboard')),
      body: GridView.count(
        crossAxisCount: 2,
        padding: const EdgeInsets.all(16),
        mainAxisSpacing: 12,
        crossAxisSpacing: 12,
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
                          Text(t.title, textAlign: TextAlign.center),
                        ],
                      ),
                    ),
                  ),
                ))
            .toList(),
      ),
    );
  }
}

class _Tile {
  const _Tile(this.title, this.icon, this.path);
  final String title;
  final IconData icon;
  final String path;
}
