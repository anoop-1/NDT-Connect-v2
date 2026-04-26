// lib/features/marketplace/models/provider.dart
//
// Domain model for an NDT service provider listed in the marketplace.
// Named ServiceProvider (not Provider) to avoid name collision with
// Riverpod's Provider class when both are imported together.

class ServiceProvider {
  const ServiceProvider({
    required this.id,
    required this.name,
    required this.location,
    required this.methods,
    required this.contactEmail,
    this.rating,
  });

  final String id;
  final String name;
  final String location;
  final List<String> methods;
  final double? rating;
  final String contactEmail;

  factory ServiceProvider.fromJson(Map<String, dynamic> json) {
    final rawMethods = json['methods'];
    final methods = rawMethods is List
        ? rawMethods.map((e) => e.toString()).toList()
        : <String>[];
    final rawRating = json['rating'];
    final rating = rawRating is num ? rawRating.toDouble() : null;
    return ServiceProvider(
      id: json['id']?.toString() ?? json['_id']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      location: json['location']?.toString() ?? '',
      methods: methods,
      rating: rating,
      contactEmail: json['contactEmail']?.toString() ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
        if (id.isNotEmpty) 'id': id,
        'name': name,
        'location': location,
        'methods': methods,
        if (rating != null) 'rating': rating,
        'contactEmail': contactEmail,
      };
}

class ProviderListPage {
  const ProviderListPage({required this.providers, required this.hasMore});
  final List<ServiceProvider> providers;
  final bool hasMore;
}

class ProviderListFilter {
  const ProviderListFilter({this.method, this.city});
  final String? method;
  final String? city;

  ProviderListFilter copyWith({String? method, String? city}) =>
      ProviderListFilter(
        method: method ?? this.method,
        city: city ?? this.city,
      );

  @override
  bool operator ==(Object other) =>
      other is ProviderListFilter &&
      other.method == method &&
      other.city == city;

  @override
  int get hashCode => Object.hash(method, city);
}
