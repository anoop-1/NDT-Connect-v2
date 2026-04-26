// lib/features/free_tools/free_tools_screen.dart

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class FreeToolsScreen extends StatelessWidget {
  const FreeToolsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final tools = const [
      _Tool('Equipment management', 'Track every UT/RT/MT/PT/ET instrument with serials, status, and calibration due dates.', Icons.precision_manufacturing_outlined, '/free-tools/equipment'),
      _Tool('Calibration tracking', 'Email + push alerts before any calibration expires. Pre-book lab capacity in advance.', Icons.notifications_active_outlined, '/free-tools/calibration'),
      _Tool('Certificate management', 'ASNT, ISO 9712, ISO 17025, OEM — manpower & company certs in one dashboard.', Icons.workspace_premium_outlined, '/free-tools/certifications'),
    ];
    return Scaffold(
      appBar: AppBar(title: const Text('Free tools')),
      body: ListView.separated(
        padding: const EdgeInsets.all(20),
        itemCount: tools.length,
        separatorBuilder: (_, __) => const SizedBox(height: 12),
        itemBuilder: (_, i) {
          final t = tools[i];
          return Card(
            child: ListTile(
              leading: Icon(t.icon, color: Theme.of(context).colorScheme.primary, size: 32),
              title: Text(t.title, style: const TextStyle(fontWeight: FontWeight.w700)),
              subtitle: Padding(padding: const EdgeInsets.only(top: 4), child: Text(t.body)),
              trailing: const Icon(Icons.chevron_right),
              onTap: () => context.go(t.path),
              isThreeLine: true,
            ),
          );
        },
      ),
    );
  }
}

class _Tool {
  const _Tool(this.title, this.body, this.icon, this.path);
  final String title, body, path;
  final IconData icon;
}
