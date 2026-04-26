// lib/features/free_tools/equipment/models/equipment.dart
//
// Plain immutable model. We avoid freezed code-gen here so the file is
// always compile-clean without running build_runner.

class Equipment {
  const Equipment({
    required this.id,
    required this.name,
    required this.type,
    required this.manufacturer,
    required this.model,
    required this.serialNumber,
    required this.calibrationDueDate,
    required this.status,
    this.notes,
  });

  final String id;
  final String name;
  final String type;
  final String manufacturer;
  final String model;
  final String serialNumber;
  final DateTime? calibrationDueDate;
  final String status;
  final String? notes;

  /// Days until calibration is due. Negative = overdue.
  int? get daysUntilCalibration {
    if (calibrationDueDate == null) return null;
    final now = DateTime.now();
    final due = calibrationDueDate!;
    return DateTime(due.year, due.month, due.day)
        .difference(DateTime(now.year, now.month, now.day))
        .inDays;
  }

  CalibrationUrgency get urgency {
    final d = daysUntilCalibration;
    if (d == null) return CalibrationUrgency.unknown;
    if (d < 0) return CalibrationUrgency.overdue;
    if (d <= 30) return CalibrationUrgency.soon;
    if (d <= 90) return CalibrationUrgency.upcoming;
    return CalibrationUrgency.ok;
  }

  factory Equipment.fromJson(Map<String, dynamic> json) {
    DateTime? parseDate(dynamic v) {
      if (v == null) return null;
      if (v is String && v.isEmpty) return null;
      try {
        return DateTime.parse(v.toString()).toLocal();
      } catch (_) {
        return null;
      }
    }

    return Equipment(
      id: json['id']?.toString() ?? json['_id']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      type: json['type']?.toString() ?? '',
      manufacturer: json['manufacturer']?.toString() ?? '',
      model: json['model']?.toString() ?? '',
      serialNumber: json['serialNumber']?.toString() ?? '',
      calibrationDueDate: parseDate(json['calibrationDueDate']),
      status: json['status']?.toString() ?? 'active',
      notes: json['notes']?.toString(),
    );
  }

  Map<String, dynamic> toJson() => {
        if (id.isNotEmpty) 'id': id,
        'name': name,
        'type': type,
        'manufacturer': manufacturer,
        'model': model,
        'serialNumber': serialNumber,
        'calibrationDueDate': calibrationDueDate?.toIso8601String(),
        'status': status,
        if (notes != null) 'notes': notes,
      };

  Equipment copyWith({
    String? id,
    String? name,
    String? type,
    String? manufacturer,
    String? model,
    String? serialNumber,
    DateTime? calibrationDueDate,
    String? status,
    String? notes,
  }) {
    return Equipment(
      id: id ?? this.id,
      name: name ?? this.name,
      type: type ?? this.type,
      manufacturer: manufacturer ?? this.manufacturer,
      model: model ?? this.model,
      serialNumber: serialNumber ?? this.serialNumber,
      calibrationDueDate: calibrationDueDate ?? this.calibrationDueDate,
      status: status ?? this.status,
      notes: notes ?? this.notes,
    );
  }
}

enum CalibrationUrgency { ok, upcoming, soon, overdue, unknown }

const equipmentStatuses = ['active', 'in-calibration', 'retired', 'damaged'];
