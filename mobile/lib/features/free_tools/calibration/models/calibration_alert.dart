// lib/features/free_tools/calibration/models/calibration_alert.dart

class CalibrationAlert {
  const CalibrationAlert({
    required this.id,
    required this.equipmentId,
    required this.emailTo,
    required this.daysBefore,
    required this.enabled,
  });

  final String id;
  final String equipmentId;
  final String emailTo;
  final int daysBefore;
  final bool enabled;

  factory CalibrationAlert.fromJson(Map<String, dynamic> json) {
    return CalibrationAlert(
      id: json['id']?.toString() ?? json['_id']?.toString() ?? '',
      equipmentId: json['equipmentId']?.toString() ?? '',
      emailTo: json['emailTo']?.toString() ?? '',
      daysBefore: (json['daysBefore'] as num?)?.toInt() ?? 30,
      enabled: json['enabled'] as bool? ?? true,
    );
  }

  Map<String, dynamic> toJson() => {
        if (id.isNotEmpty) 'id': id,
        'equipmentId': equipmentId,
        'emailTo': emailTo,
        'daysBefore': daysBefore,
        'enabled': enabled,
      };

  CalibrationAlert copyWith({
    String? equipmentId,
    String? emailTo,
    int? daysBefore,
    bool? enabled,
  }) =>
      CalibrationAlert(
        id: id,
        equipmentId: equipmentId ?? this.equipmentId,
        emailTo: emailTo ?? this.emailTo,
        daysBefore: daysBefore ?? this.daysBefore,
        enabled: enabled ?? this.enabled,
      );
}
