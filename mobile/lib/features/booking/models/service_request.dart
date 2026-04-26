// lib/features/booking/models/service_request.dart

enum ServiceRequestStatus {
  pending,
  confirmed,
  inProgress,
  completed,
  cancelled,
  unknown,
}

ServiceRequestStatus statusFromString(String? raw) {
  switch (raw) {
    case 'pending':
      return ServiceRequestStatus.pending;
    case 'confirmed':
      return ServiceRequestStatus.confirmed;
    case 'in_progress':
    case 'in-progress':
    case 'inProgress':
      return ServiceRequestStatus.inProgress;
    case 'completed':
      return ServiceRequestStatus.completed;
    case 'cancelled':
    case 'canceled':
      return ServiceRequestStatus.cancelled;
    default:
      return ServiceRequestStatus.unknown;
  }
}

extension ServiceRequestStatusX on ServiceRequestStatus {
  String get label {
    switch (this) {
      case ServiceRequestStatus.pending:
        return 'Pending';
      case ServiceRequestStatus.confirmed:
        return 'Confirmed';
      case ServiceRequestStatus.inProgress:
        return 'In progress';
      case ServiceRequestStatus.completed:
        return 'Completed';
      case ServiceRequestStatus.cancelled:
        return 'Cancelled';
      case ServiceRequestStatus.unknown:
        return 'Unknown';
    }
  }
}

class ServiceRequest {
  const ServiceRequest({
    required this.id,
    required this.serviceType,
    required this.location,
    required this.description,
    required this.status,
    required this.createdAt,
    this.providerId,
    this.requestedDate,
  });

  final String id;
  final String? providerId;
  final String serviceType;
  final String location;
  final String description;
  final DateTime? requestedDate;
  final ServiceRequestStatus status;
  final DateTime createdAt;

  factory ServiceRequest.fromJson(Map<String, dynamic> json) {
    DateTime? parseDate(dynamic v) {
      if (v == null || (v is String && v.isEmpty)) return null;
      try {
        return DateTime.parse(v.toString()).toLocal();
      } catch (_) {
        return null;
      }
    }

    return ServiceRequest(
      id: json['id']?.toString() ?? json['_id']?.toString() ?? '',
      providerId: json['providerId']?.toString(),
      serviceType: json['serviceType']?.toString() ?? '',
      location: json['location']?.toString() ?? '',
      description: json['description']?.toString() ?? '',
      requestedDate: parseDate(json['requestedDate']),
      status: statusFromString(json['status']?.toString()),
      createdAt: parseDate(json['createdAt']) ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() => {
        if (id.isNotEmpty) 'id': id,
        if (providerId != null) 'providerId': providerId,
        'serviceType': serviceType,
        'location': location,
        'description': description,
        'requestedDate': requestedDate?.toIso8601String(),
        'status': status.name,
      };
}
