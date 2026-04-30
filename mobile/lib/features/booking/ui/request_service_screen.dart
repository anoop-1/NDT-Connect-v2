// lib/features/booking/ui/request_service_screen.dart
//
// 4-step wizard for creating a service request.
// 1. Method + scope
// 2. Site + dates
// 3. Requirements + attachments (attachments deferred to v1.1)
// 4. Review + submit

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/api/api_exception.dart';
import '../../../core/auth/auth_repository.dart';
import '../../../core/auth/auth_state.dart';
import '../../../core/predefined_lists/predefined_lists_repository.dart';
import '../../../core/ui/loading_indicator.dart';
import '../models/service_request.dart';
import '../providers/service_request_providers.dart';

const _kMethodsListKey = 'ndtMethods';

class RequestServiceScreen extends ConsumerStatefulWidget {
  const RequestServiceScreen({super.key});

  @override
  ConsumerState<RequestServiceScreen> createState() =>
      _RequestServiceScreenState();
}

class _RequestServiceScreenState extends ConsumerState<RequestServiceScreen> {
  int _step = 0;
  String? _method;
  final _scope = TextEditingController();
  final _location = TextEditingController();
  DateTime? _requestedDate;
  final _requirements = TextEditingController();
  bool _submitting = false;

  String? get _providerId {
    final raw = GoRouterState.of(context).uri.queryParameters['providerId'];
    return raw == null || raw.isEmpty ? null : raw;
  }

  @override
  void dispose() {
    _scope.dispose();
    _location.dispose();
    _requirements.dispose();
    super.dispose();
  }

  bool _canContinue() {
    switch (_step) {
      case 0:
        return _method != null &&
            _method!.isNotEmpty &&
            _scope.text.trim().isNotEmpty;
      case 1:
        return _location.text.trim().isNotEmpty && _requestedDate != null;
      case 2:
        return _requirements.text.trim().isNotEmpty;
      case 3:
      default:
        return true;
    }
  }

  Future<void> _submit() async {
    final authValue = ref.read(authControllerProvider).value;
    if (authValue is! AuthAuthenticated) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Sign in to submit a request')),
      );
      context.go('/login');
      return;
    }
    final user = authValue.user;
    setState(() => _submitting = true);
    try {
      final body = {
        'clientId': user.id,
        'clientName': user.name,
        'clientEmail': user.email,
        'serviceType': _method,
        'location': _location.text.trim(),
        'description':
            '${_scope.text.trim()}\n\nRequirements:\n${_requirements.text.trim()}',
        'requestedDate': _requestedDate?.toIso8601String(),
        if (_providerId != null) 'providerId': _providerId,
      };
      final created = await ref.read(myRequestsProvider.notifier).create(body);
      if (!mounted) return;
      await showDialog<void>(
        context: context,
        builder: (_) => AlertDialog(
          icon: Icon(Icons.check_circle,
              color: Theme.of(context).colorScheme.primary, size: 48),
          title: const Text('Request submitted'),
          content: Text(
              'Your request #${created.id.isNotEmpty ? created.id.substring(0, created.id.length.clamp(0, 8)) : ''} '
              'is now ${created.status.label.toLowerCase()}.'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('OK'),
            ),
          ],
        ),
      );
      if (mounted) context.go('/my-requests');
    } on ApiException catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.message)),
        );
      }
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Request a service')),
      body: Stepper(
        type: StepperType.vertical,
        currentStep: _step,
        onStepTapped: (i) {
          if (i <= _step) setState(() => _step = i);
        },
        controlsBuilder: (context, details) {
          final isLast = _step == 3;
          return Padding(
            padding: const EdgeInsets.only(top: 12),
            child: Row(
              children: [
                FilledButton(
                  onPressed: _submitting
                      ? null
                      : () {
                          if (!_canContinue()) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                  content: Text('Complete this step first')),
                            );
                            return;
                          }
                          if (isLast) {
                            _submit();
                          } else {
                            setState(() => _step++);
                          }
                        },
                  child: _submitting
                      ? const SizedBox(
                          height: 18,
                          width: 18,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : Text(isLast ? 'Submit request' : 'Continue'),
                ),
                const SizedBox(width: 8),
                if (_step > 0)
                  TextButton(
                    onPressed: _submitting
                        ? null
                        : () => setState(() => _step--),
                    child: const Text('Back'),
                  ),
              ],
            ),
          );
        },
        steps: [
          Step(
            title: const Text('Method & scope'),
            isActive: _step >= 0,
            state: _step > 0 ? StepState.complete : StepState.indexed,
            content: _MethodScopeStep(
              method: _method,
              onMethod: (v) => setState(() => _method = v),
              scope: _scope,
            ),
          ),
          Step(
            title: const Text('Site & dates'),
            isActive: _step >= 1,
            state: _step > 1 ? StepState.complete : StepState.indexed,
            content: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                TextField(
                  controller: _location,
                  decoration: const InputDecoration(
                      labelText: 'Site / city / address'),
                ),
                const SizedBox(height: 12),
                InkWell(
                  onTap: () async {
                    final now = DateTime.now();
                    final picked = await showDatePicker(
                      context: context,
                      initialDate:
                          _requestedDate ?? now.add(const Duration(days: 7)),
                      firstDate: now,
                      lastDate: DateTime(now.year + 2),
                    );
                    if (picked != null) {
                      setState(() => _requestedDate = picked);
                    }
                  },
                  borderRadius: BorderRadius.circular(10),
                  child: InputDecorator(
                    decoration: const InputDecoration(
                      labelText: 'Requested date',
                      suffixIcon: Icon(Icons.calendar_today_outlined),
                    ),
                    child: Text(_requestedDate == null
                        ? 'Select a date'
                        : DateFormat.yMMMd().format(_requestedDate!)),
                  ),
                ),
              ],
            ),
          ),
          Step(
            title: const Text('Requirements'),
            isActive: _step >= 2,
            state: _step > 2 ? StepState.complete : StepState.indexed,
            content: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                TextField(
                  controller: _requirements,
                  maxLines: 5,
                  decoration: const InputDecoration(
                    labelText:
                        'Codes, certifications, materials, special tooling',
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Attachments are coming in v1.1.',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              ],
            ),
          ),
          Step(
            title: const Text('Review & submit'),
            isActive: _step >= 3,
            state: StepState.indexed,
            content: _ReviewStep(
              method: _method,
              scope: _scope.text,
              location: _location.text,
              requestedDate: _requestedDate,
              requirements: _requirements.text,
              providerId: _providerId,
            ),
          ),
        ],
      ),
    );
  }
}

class _MethodScopeStep extends ConsumerWidget {
  const _MethodScopeStep({
    required this.method,
    required this.onMethod,
    required this.scope,
  });
  final String? method;
  final ValueChanged<String?> onMethod;
  final TextEditingController scope;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final methodsAsync = ref.watch(predefinedListProvider(_kMethodsListKey));
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        methodsAsync.when(
          loading: () => const SizedBox(
            height: 56,
            child: LoadingIndicator(size: 18),
          ),
          error: (e, _) => Text(
            e is ApiException ? e.message : 'Could not load methods',
            style: TextStyle(color: Theme.of(context).colorScheme.error),
          ),
          data: (methods) => DropdownButtonFormField<String>(
            value: method,
            isExpanded: true,
            decoration: const InputDecoration(labelText: 'NDT method'),
            items: methods
                .map((m) => DropdownMenuItem(value: m, child: Text(m)))
                .toList(),
            onChanged: onMethod,
          ),
        ),
        const SizedBox(height: 12),
        TextField(
          controller: scope,
          maxLines: 3,
          decoration: const InputDecoration(
            labelText: 'Scope of work',
            hintText: 'What needs to be inspected and to what code/standard?',
          ),
        ),
      ],
    );
  }
}

class _ReviewStep extends StatelessWidget {
  const _ReviewStep({
    required this.method,
    required this.scope,
    required this.location,
    required this.requestedDate,
    required this.requirements,
    required this.providerId,
  });

  final String? method;
  final String scope;
  final String location;
  final DateTime? requestedDate;
  final String requirements;
  final String? providerId;

  @override
  Widget build(BuildContext context) {
    final lines = <(String, String)>[
      ('Method', method ?? '—'),
      ('Scope', scope.isEmpty ? '—' : scope),
      ('Site', location.isEmpty ? '—' : location),
      (
        'Requested date',
        requestedDate == null ? '—' : DateFormat.yMMMd().format(requestedDate!),
      ),
      ('Requirements', requirements.isEmpty ? '—' : requirements),
      if (providerId != null) ('Targeted provider', providerId!),
    ];
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: lines
              .map((entry) => Padding(
                    padding: const EdgeInsets.symmetric(vertical: 4),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                          width: 120,
                          child: Text(
                            entry.$1,
                            style:
                                const TextStyle(fontWeight: FontWeight.w600),
                          ),
                        ),
                        Expanded(child: Text(entry.$2)),
                      ],
                    ),
                  ))
              .toList(),
        ),
      ),
    );
  }
}
