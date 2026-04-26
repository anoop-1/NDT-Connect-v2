// lib/features/booking/ui/track_request_screen.dart
//
// Linear timeline for a single service request: Pending → Confirmed →
// In Progress → Completed. Includes a placeholder chat section (chat is v1.1).

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../../../core/api/api_exception.dart';
import '../../../core/ui/loading_indicator.dart';
import '../models/service_request.dart';
import '../providers/service_request_providers.dart';

class TrackRequestScreen extends ConsumerWidget {
  const TrackRequestScreen({super.key, required this.requestId});
  final String requestId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncRequest = ref.watch(serviceRequestDetailProvider(requestId));
    return Scaffold(
      appBar: AppBar(title: const Text('Track request')),
      body: asyncRequest.when(
        loading: () => const LoadingIndicator(label: 'Loading request...'),
        error: (e, _) => ErrorRetry(
          message: e is ApiException ? e.message : 'Could not load request',
          onRetry: () =>
              ref.invalidate(serviceRequestDetailProvider(requestId)),
        ),
        data: (req) => ListView(
          padding: const EdgeInsets.all(20),
          children: [
            Text(
              req.serviceType.isEmpty ? 'Service request' : req.serviceType,
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 4),
            Text(req.location),
            if (req.requestedDate != null) ...[
              const SizedBox(height: 4),
              Text(
                'Requested for ${DateFormat.yMMMd().format(req.requestedDate!)}',
                style: Theme.of(context).textTheme.bodySmall,
              ),
            ],
            const SizedBox(height: 24),
            _Timeline(current: req.status),
            const SizedBox(height: 24),
            Text('Description',
                style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 8),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Text(req.description.isEmpty ? '—' : req.description),
              ),
            ),
            const SizedBox(height: 24),
            Text('Messages',
                style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 8),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    const Icon(Icons.chat_bubble_outline),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        'Real-time chat between you and the provider arrives in v1.1. '
                        'For now, your contact details are shared on confirmation.',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Timeline extends StatelessWidget {
  const _Timeline({required this.current});
  final ServiceRequestStatus current;

  static const _stages = [
    ServiceRequestStatus.pending,
    ServiceRequestStatus.confirmed,
    ServiceRequestStatus.inProgress,
    ServiceRequestStatus.completed,
  ];

  int get _currentIndex {
    final idx = _stages.indexOf(current);
    return idx == -1 ? 0 : idx;
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    if (current == ServiceRequestStatus.cancelled) {
      return Card(
        color: cs.errorContainer,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Icon(Icons.cancel_outlined, color: cs.onErrorContainer),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  'This request was cancelled.',
                  style: TextStyle(color: cs.onErrorContainer),
                ),
              ),
            ],
          ),
        ),
      );
    }
    return Column(
      children: List.generate(_stages.length, (i) {
        final reached = i <= _currentIndex;
        final isLast = i == _stages.length - 1;
        return IntrinsicHeight(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                children: [
                  Container(
                    width: 26,
                    height: 26,
                    decoration: BoxDecoration(
                      color: reached ? cs.primary : cs.surfaceContainerHighest,
                      shape: BoxShape.circle,
                    ),
                    alignment: Alignment.center,
                    child: Icon(
                      reached ? Icons.check : Icons.circle_outlined,
                      size: 14,
                      color: reached ? cs.onPrimary : cs.outline,
                    ),
                  ),
                  if (!isLast)
                    Expanded(
                      child: Container(
                        width: 2,
                        color: reached ? cs.primary : cs.outlineVariant,
                      ),
                    ),
                ],
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Padding(
                  padding: EdgeInsets.only(bottom: isLast ? 0 : 16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _stages[i].label,
                        style: TextStyle(
                          fontWeight:
                              reached ? FontWeight.w700 : FontWeight.w500,
                          color: reached ? cs.onSurface : cs.outline,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        );
      }),
    );
  }
}
