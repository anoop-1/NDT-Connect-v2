// lib/core/auth/auth_state.dart
//
// Immutable representation of who is logged in, if anyone, plus a coarse
// loading indicator for app boot.

enum UserRole { client, provider, admin, unknown }

UserRole roleFromString(String? raw) {
  switch (raw) {
    case 'client':
      return UserRole.client;
    case 'provider':
      return UserRole.provider;
    case 'admin':
      return UserRole.admin;
    default:
      return UserRole.unknown;
  }
}

class AppUser {
  AppUser({
    required this.id,
    required this.email,
    required this.role,
    this.name,
    this.companyName,
  });

  final String id;
  final String email;
  final UserRole role;
  final String? name;
  final String? companyName;

  factory AppUser.fromJson(Map<String, dynamic> json) {
    return AppUser(
      id: json['id']?.toString() ?? json['_id']?.toString() ?? '',
      email: json['email'] as String,
      role: roleFromString(json['role'] as String?),
      name: json['name'] as String?,
      companyName: json['companyName'] as String?,
    );
  }
}

sealed class AuthState {
  const AuthState();
}

class AuthLoading extends AuthState {
  const AuthLoading();
}

class AuthUnauthenticated extends AuthState {
  const AuthUnauthenticated();
}

class AuthAuthenticated extends AuthState {
  const AuthAuthenticated(this.user);
  final AppUser user;
}
