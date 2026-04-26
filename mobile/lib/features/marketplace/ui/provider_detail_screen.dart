// lib/features/marketplace/ui/provider_detail_screen.dart
//
// Provider profile with services list and a "Request a quote" CTA.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/api/api_exception.dart';
import '../../../core/ui/loading_indicator.dart';
import '../providers/provider_providers.dart';

class ProviderDetailScreen extends ConsumerWidget {
  const ProviderDetailScreen({super.key, required this.providerId});
  final String providerId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncProvider = ref.watch(providerDetailProvider(providerId));
    return Scaffold(
      appBar: AppBar(title: const Text('Provider')),
      body: asyncProvider.when(
        loading: () => const LoadingIndicator(label: 'Loading provider...'),
        error: (e, _) => ErrorRetry(
          message: e is ApiException ? e.message : 'Could not load provider',
          onRetry: () =>
              ref.invalidate(providerDetailProvider(providerId)),
        ),
        data: (provider) => ListView(
          padding: const EdgeInsets.all(20),
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(
                  radius: 32,
                  backgroundColor:
                      Theme.of(context).colorScheme.primaryContainer,
                  child: Text(
                    provider.name.isNotEmpty
                        ? provider.name[0].toUpperCase()
                        : '?',
                    style: TextStyle(
                      color: Theme.of(context).colorScheme.onPrimaryContainer,
                      fontWeight: FontWeight.w800,
                      fontSize: 22,
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        provider.name,
                        style: Theme.of(context).textTheme.headlineSmall,
                      ),
                      const SizedBox(height: 4),
                      Text(provider.location),
                      if (provider.rating != null) ...[
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            const Icon(Icons.star,
                                color: Colors.amber, size: 18),
                            const SizedBox(width: 4),
                            Text(provider.rating!.toStringAsFixed(1)),
                          ],
                        ),
                      ],
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            Text('Services offered',
                style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 8),
            if (provider.methods.isEmpty)
              const Text('No methods listed')
            else
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: provider.methods
                    .map((m) => Chip(label: Text(m)))
                    .toList(),
              ),
            const SizedBox(height: 24),
            Text('Contact',
                style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 8),
            ListTile(
              leading: const Icon(Icons.email_outlined),
              title: Text(provider.contactEmail.isEmpty
                  ? '—'
                  : provider.contactEmail),
              dense: true,
              contentPadding: EdgeInsets.zero,
            ),
            const SizedBox(height: 24),
            FilledButton.icon(
              onPressed: () => context.go(
                '/request-service?providerId=${provider.id}',
              ),
              icon: const Icon(Icons.send_outlined),
              label: const Text('Request a quote'),
            ),
          ],
        ),
      ),
    );
  }
}
