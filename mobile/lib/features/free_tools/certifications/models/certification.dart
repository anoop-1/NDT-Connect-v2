// lib/features/free_tools/certifications/models/certification.dart

enum CertificationKind { personnel, company }

CertificationKind certificationKindFromString(String? raw) {
  switch (raw) {
    case 'company':
      return CertificationKind.company;
    case 'personnel':
    default:
      return CertificationKind.personnel;
  }
}

class Certification {
  const Certification({
    required this.id,
    required this.kind,
    required this.expiryDate,
    this.personName,
    this.method,
    this.level,
    this.body,
    this.certName,
    this.issuedDate,
    this.notes,
  });

  final String id;
  final CertificationKind kind;
  final DateTime? expiryDate;
  final String? personName;
  final String? method;
  final String? level;
  final String? body;
  final String? certName;
  final DateTime? issuedDate;
  final String? notes;

  int? get daysUntilExpiry {
    if (expiryDate == null) return null;
    final now = DateTime.now();
    final due = expiryDate!;
    return DateTime(due.year, due.month, due.day)
        .difference(DateTime(now.year, now.month, now.day))
        .inDays;
  }

  factory Certification.fromJson(Map<String, dynamic> json) {
    DateTime? parseDate(dynamic v) {
      if (v == null || (v is String && v.isEmpty)) return null;
      try {
        return DateTime.parse(v.toString()).toLocal();
      } catch (_) {
        return null;
      }
    }

    return Certification(
      id: json['id']?.toString() ?? json['_id']?.toString() ?? '',
      kind: certificationKindFromString(json['kind']?.toString()),
      expiryDate: parseDate(json['expiryDate']),
      issuedDate: parseDate(json['issuedDate']),
      personName: json['personName']?.toString(),
      method: json['method']?.toString(),
      level: json['level']?.toString(),
      body: json['body']?.toString(),
      certName: json['certName']?.toString(),
      notes: json['notes']?.toString(),
    );
  }

  Map<String, dynamic> toJson() => {
        if (id.isNotEmpty) 'id': id,
        'kind': kind.name,
        'expiryDate': expiryDate?.toIso8601String(),
        'issuedDate': issuedDate?.toIso8601String(),
        if (personName != null) 'personName': personName,
        if (method != null) 'method': method,
        if (level != null) 'level': level,
        if (body != null) 'body': body,
        if (certName != null) 'certName': certName,
        if (notes != null) 'notes': notes,
      };

  Certification copyWith({
    DateTime? expiryDate,
    DateTime? issuedDate,
    String? personName,
    String? method,
    String? level,
    String? body,
    String? certName,
    String? notes,
  }) =>
      Certification(
        id: id,
        kind: kind,
        expiryDate: expiryDate ?? this.expiryDate,
        issuedDate: issuedDate ?? this.issuedDate,
        personName: personName ?? this.personName,
        method: method ?? this.method,
        level: level ?? this.level,
        body: body ?? this.body,
        certName: certName ?? this.certName,
        notes: notes ?? this.notes,
      );
}
