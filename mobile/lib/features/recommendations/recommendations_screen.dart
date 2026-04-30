// lib/features/recommendations/recommendations_screen.dart

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../core/api/api_client.dart';
import '../../core/predefined_lists/predefined_lists_repository.dart';

class _Recommendation {
  const _Recommendation({
    required this.id,
    required this.name,
    required this.description,
    required this.rating,
    required this.location,
    required this.verified,
  });
  final String id;
  final String name;
  final String description;
  final double rating;
  final String location;
  final bool verified;

  factory _Recommendation.fromJson(Map<String, dynamic> j) {
    return _Recommendation(
      id: j['referenceId']?.toString() ?? '',
      name: j['providerName']?.toString() ?? 'Provider',
      description: j['description']?.toString() ?? '',
      rating: (j['rating'] is num) ? (j['rating'] as num).toDouble() : 4.0,
      location: j['location']?.toString() ?? '',
      verified: j['isVerified'] == true,
    );
  }
}

class RecommendationsScreen extends ConsumerStatefulWidget {
  const RecommendationsScreen({super.key});
  @override
  ConsumerState<RecommendationsScreen> createState() =>
      _RecommendationsScreenState();
}

class _RecommendationsScreenState extends ConsumerState<RecommendationsScreen> {
  final _location = TextEditingController();
  final _asset = TextEditingController();
  final _standard = TextEditingController();
  String? _service;
  bool _busy = false;
  List<_Recommendation> _results = const [];
  bool _searched = false;

  @override
  void dispose() {
    _location.dispose();
    _asset.dispose();
    _standard.dispose();
    super.dispose();
  }

  Future<void> _search() async {
    setState(() {
      _busy = true;
      _searched = true;
    });
    try {
      final dio = ref.read(apiClientProvider);
      final res = await dio.post('/api/recommendations', data: {
        'location': _location.text.trim(),
        'serviceType': _service ?? '',
        'standard': _standard.text.trim(),
        'assetToBeInspected': _asset.text.trim(),
      });
      final list = (res.data['data'] as List?) ?? const [];
      setState(() {
        _results = list
            .map((e) => _Recommendation.fromJson(e as Map<String, dynamic>))
            .toList();
      });
    } on DioException catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.response?.data['error']?.toString() ?? 'Search failed')),
        );
      }
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final methodsAsync = ref.watch(predefinedListProvider('ndtMethods'));
    return Scaffold(
      appBar: AppBar(title: const Text('Recommendations')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Text(
            'Tell us about the inspection. We\'ll match providers from our network.',
            style: TextStyle(fontSize: 14),
          ),
          const SizedBox(height: 16),
          TextField(
            controller: _location,
            decoration: const InputDecoration(
                labelText: 'Location (city/state)',
                prefixIcon: Icon(Icons.place_outlined)),
          ),
          const SizedBox(height: 12),
          methodsAsync.when(
            loading: () => const SizedBox(height: 56),
            error: (_, __) => const SizedBox(),
            data: (methods) => DropdownButtonFormField<String>(
              value: _service,
              isExpanded: true,
              decoration: const InputDecoration(
                  labelText: 'NDT method', prefixIcon: Icon(Icons.build_outlined)),
              items: methods
                  .map((m) => DropdownMenuItem(value: m, child: Text(m)))
                  .toList(),
              onChanged: (v) => setState(() => _service = v),
            ),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _asset,
            decoration: const InputDecoration(
                labelText: 'Asset / equipment to inspect',
                prefixIcon: Icon(Icons.precision_manufacturing_outlined)),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _standard,
            decoration: const InputDecoration(
                labelText: 'Required standard / code',
                prefixIcon: Icon(Icons.rule_outlined)),
          ),
          const SizedBox(height: 16),
          FilledButton.icon(
            onPressed: _busy ? null : _search,
            icon: _busy
                ? const SizedBox(
                    height: 16, width: 16, child: CircularProgressIndicator(strokeWidth: 2))
                : const Icon(Icons.search),
            label: const Text('Find providers'),
          ),
          const SizedBox(height: 24),
          if (_searched && _results.isEmpty && !_busy)
            const Center(
              child: Padding(
                padding: EdgeInsets.all(16),
                child: Text('No matches. Try widening your filters.'),
              ),
            ),
          ..._results.map((r) => Card(
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: Theme.of(context).colorScheme.primary,
                    child: const Icon(Icons.business, color: Colors.white),
                  ),
                  title: Row(
                    children: [
                      Expanded(
                          child: Text(r.name,
                              style: const TextStyle(fontWeight: FontWeight.w700))),
                      if (r.verified)
                        const Icon(Icons.verified, color: Colors.blue, size: 18),
                    ],
                  ),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 4),
                      if (r.location.isNotEmpty) Text(r.location),
                      Text(r.description,
                          maxLines: 2, overflow: TextOverflow.ellipsis),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          const Icon(Icons.star, size: 14, color: Colors.amber),
                          const SizedBox(width: 2),
                          Text(r.rating.toStringAsFixed(1),
                              style: const TextStyle(fontSize: 12)),
                        ],
                      ),
                    ],
                  ),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () => context.push('/provider/${r.id}'),
                ),
              )),
        ],
      ),
    );
  }
}
