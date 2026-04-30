// lib/features/settings/ui/profile_edit_screen.dart

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/api/api_client.dart';
import '../../../core/auth/auth_repository.dart';
import '../../../core/auth/auth_state.dart';

class ProfileEditScreen extends ConsumerStatefulWidget {
  const ProfileEditScreen({super.key});
  @override
  ConsumerState<ProfileEditScreen> createState() => _ProfileEditScreenState();
}

class _ProfileEditScreenState extends ConsumerState<ProfileEditScreen> {
  final _form = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _company = TextEditingController();
  final _location = TextEditingController();
  final _contact = TextEditingController();
  final _description = TextEditingController();
  final _specialization = TextEditingController();
  bool _busy = false;
  bool _loaded = false;

  @override
  void dispose() {
    _name.dispose();
    _company.dispose();
    _location.dispose();
    _contact.dispose();
    _description.dispose();
    _specialization.dispose();
    super.dispose();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_loaded) return;
    _loaded = true;
    _hydrate();
  }

  Future<void> _hydrate() async {
    final auth = ref.read(authControllerProvider).value;
    if (auth is! AuthAuthenticated) return;
    _name.text = auth.user.name ?? '';
    try {
      final dio = ref.read(apiClientProvider);
      final res = await dio.get('/api/users/${auth.user.id}');
      final data = (res.data['data'] as Map?)?.cast<String, dynamic>();
      final profile =
          (data?['providerProfile'] as Map?)?.cast<String, dynamic>() ?? {};
      _company.text = profile['companyName']?.toString() ?? '';
      _location.text = profile['location']?.toString() ?? '';
      _contact.text = profile['contactNumber']?.toString() ?? '';
      _description.text = profile['description']?.toString() ?? '';
      _specialization.text = profile['specialization']?.toString() ?? '';
      if (mounted) setState(() {});
    } catch (_) {}
  }

  Future<void> _save() async {
    if (!_form.currentState!.validate()) return;
    final auth = ref.read(authControllerProvider).value;
    if (auth is! AuthAuthenticated) return;
    setState(() => _busy = true);
    try {
      final dio = ref.read(apiClientProvider);
      await dio.patch('/api/users/${auth.user.id}', data: {
        'name': _name.text.trim(),
        'profileData': {
          'companyName': _company.text.trim(),
          'location': _location.text.trim(),
          'contactNumber': _contact.text.trim(),
          'description': _description.text.trim(),
          'specialization': _specialization.text.trim(),
        },
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Profile saved')),
        );
        context.pop();
      }
    } on DioException catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.response?.data['error']?.toString() ?? 'Save failed')),
        );
      }
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = ref.watch(authControllerProvider).value;
    final isProvider = auth is AuthAuthenticated && auth.user.role == UserRole.provider;
    return Scaffold(
      appBar: AppBar(title: const Text('Edit profile')),
      body: SafeArea(
        child: Form(
          key: _form,
          child: ListView(
            padding: const EdgeInsets.all(20),
            children: [
              TextFormField(
                controller: _name,
                decoration: const InputDecoration(labelText: 'Full name'),
                validator: (v) =>
                    (v == null || v.trim().isEmpty) ? 'Required' : null,
              ),
              const SizedBox(height: 12),
              if (isProvider) ...[
                TextFormField(
                  controller: _company,
                  decoration: const InputDecoration(labelText: 'Company name'),
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: _location,
                  decoration: const InputDecoration(labelText: 'Location'),
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: _contact,
                  decoration: const InputDecoration(labelText: 'Contact number'),
                  keyboardType: TextInputType.phone,
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: _specialization,
                  decoration: const InputDecoration(labelText: 'Specialization'),
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: _description,
                  maxLines: 4,
                  decoration: const InputDecoration(labelText: 'Description'),
                ),
                const SizedBox(height: 12),
              ],
              const SizedBox(height: 8),
              FilledButton(
                onPressed: _busy ? null : _save,
                child: _busy
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(strokeWidth: 2))
                    : const Text('Save'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
