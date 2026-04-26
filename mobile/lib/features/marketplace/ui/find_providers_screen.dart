// lib/features/marketplace/ui/find_providers_screen.dart
//
// Provider list with method dropdown + city text filter and infinite scroll.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/api/api_exception.dart';
import '../../../core/predefined_lists/predefined_lists_repository.dart';
import '../../../core/ui/loading_indicator.dart';
import '../models/provider.dart';
import '../providers/provider_providers.dart';

const _kMethodsListKey = 'ndtMethods';

class FindProvidersScreen extends ConsumerStatefulWidget {
  const FindProvidersScreen({super.key});

  @override
  ConsumerState<FindProvidersScreen> createState() =>
      _FindProvidersScreenState();
}

class _FindProvidersScreenState extends ConsumerState<FindProvidersScreen> {
  final _scroll = ScrollController();
  final _city = TextEditingController();
  String? _method;
  ProviderListFilter _filter = const ProviderListFilter();

  @override
  void initState() {
    super.initState();
    _scroll.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scroll.removeListener(_onScroll);
    _scroll.dispose();
    _city.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (_scroll.position.pixels >=
        _scroll.position.maxScrollExtent - 240) {
      ref.read(providerListProvider(_filter).notifier).loadMore();
    }
  }

  void _applyFilter() {
    setState(() {
      _filter = ProviderListFilter(
        method: _method,
        city: _city.text.trim().isEmpty ? null : _city.text.trim(),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    final asyncList = ref.watch(providerListProvider(_filter));
    final methodsAsync = ref.watch(predefinedListProvider(_kMethodsListKey));

    return Scaffold(
      appBar: AppBar(title: const Text('Find providers')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
            child: Row(
              children: [
                Expanded(
                  flex: 2,
                  child: methodsAsync.when(
                    loading: () => const SizedBox(
                      height: 56, child: LoadingIndicator(size: 16),
                    ),
                    error: (_, __) => const SizedBox.shrink(),
                    data: (methods) => DropdownButtonFormField<String>(
                      value: _method,
                      isExpanded: true,
                      decoration:
                          const InputDecoration(labelText: 'Method'),
                      items: [
                        const DropdownMenuItem(value: null, child: Text('Any')),
                        ...methods.map(
                          (m) => DropdownMenuItem(value: m, child: Text(m)),
                        ),
                      ],
                      onChanged: (v) {
                        setState(() => _method = v);
                        _applyFilter();
                      },
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  flex: 3,
                  child: TextField(
                    controller: _city,
                    decoration: InputDecoration(
                      labelText: 'City',
                      suffixIcon: IconButton(
                        icon: const Icon(Icons.search),
                        onPressed: _applyFilter,
                      ),
                    ),
                    textInputAction: TextInputAction.search,
                    onSubmitted: (_) => _applyFilter(),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: asyncList.when(
              loading: () => const ListSkeleton(),
              error: (e, _) => ErrorRetry(
                message:
                    e is ApiException ? e.message : 'Could not load providers',
                onRetry: () =>
                    ref.read(providerListProvider(_filter).notifier).refresh(),
              ),
              data: (state) {
                if (state.items.isEmpty) {
                  return const EmptyState(
                    icon: Icons.search_off_outlined,
                    title: 'No providers found',
                    body: 'Try a different method or city.',
                  );
                }
                return RefreshIndicator(
                  onRefresh: () => ref
                      .read(providerListProvider(_filter).notifier)
                      .refresh(),
                  child: ListView.separated(
                    controller: _scroll,
                    padding: const EdgeInsets.fromLTRB(16, 8, 16, 32),
                    itemCount: state.items.length + (state.hasMore ? 1 : 0),
                    separatorBuilder: (_, __) => const SizedBox(height: 8),
                    itemBuilder: (_, i) {
                      if (i >= state.items.length) {
                        return const Padding(
                          padding: EdgeInsets.all(16),
                          child: LoadingIndicator(size: 18),
                        );
                      }
                      return _ProviderCard(item: state.items[i]);
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _ProviderCard extends StatelessWidget {
  const _ProviderCard({required this.item});
  final ServiceProvider item;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () => context.go('/provider/${item.id}'),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      item.name,
                      style: const TextStyle(
                          fontWeight: FontWeight.w800, fontSize: 16),
                    ),
                  ),
                  if (item.rating != null) ...[
                    const Icon(Icons.star, size: 18, color: Colors.amber),
                    const SizedBox(width: 4),
                    Text(item.rating!.toStringAsFixed(1)),
                  ],
                ],
              ),
              const SizedBox(height: 4),
              Text(item.location,
                  style: Theme.of(context).textTheme.bodyMedium),
              const SizedBox(height: 8),
              Wrap(
                spacing: 6,
                runSpacing: 4,
                children: item.methods
                    .take(6)
                    .map((m) => Chip(
                          label: Text(m),
                          visualDensity: VisualDensity.compact,
                          materialTapTargetSize:
                              MaterialTapTargetSize.shrinkWrap,
                        ))
                    .toList(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
