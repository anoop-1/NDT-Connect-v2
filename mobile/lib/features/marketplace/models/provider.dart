// lib/features/marketplace/models/provider.dart

class ServiceProvider {
  const ServiceProvider({
    required this.id,
    required this.name,
    required this.location,
    required this.services,
    required this.contactEmail,
    this.specialization,
    this.description,
    this.imageUrl,
    this.contactNumber,
    this.rating,
    this.isVerified = false,
    this.availableDocuments = const [],
  });

  final String id;
  final String name;
  final String location;
  final List<String> services;
  final String? specialization;
  final String? description;
  final String? imageUrl;
  final String? contactNumber;
  final double? rating;
  final bool isVerified;
  final List<String> availableDocuments;
  final String contactEmail;

  List<String> get methods => services;

  factory ServiceProvider.fromJson(Map<String, dynamic> json) {
    List<String> _strList(dynamic v) =>
        v is List ? v.map((e) => e.toString()).toList() : <String>[];
    final rawRating = json['rating'];
    return ServiceProvider(
      id: json['id']?.toString() ?? json['_id']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      location: json['location']?.toString() ?? '',
      services: _strList(json['services'] ?? json['methods']),
      specialization: json['specialization']?.toString(),
      description: json['description']?.toString(),
      imageUrl: json['imageUrl']?.toString(),
      contactNumber: json['contactNumber']?.toString(),
      rating: rawRating is num ? rawRating.toDouble() : null,
      isVerified: json['isVerified'] == true,
      availableDocuments: _strList(json['availableDocuments']),
      contactEmail:
          json['email']?.toString() ?? json['contactEmail']?.toString() ?? '',
    );
  }
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
