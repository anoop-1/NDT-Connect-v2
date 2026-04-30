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
  if (raw == null) return ServiceRequestStatus.unknown;
  switch (raw.toLowerCase().replaceAll(RegExp(r'[\s_-]'), '')) {
    case 'pending':
      return ServiceRequestStatus.pending;
    case 'confirmed':
      return ServiceRequestStatus.confirmed;
    case 'inprogress':
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
        return 'In Progress';
      case ServiceRequestStatus.completed:
        return 'Completed';
      case ServiceRequestStatus.cancelled:
        return 'Cancelled';
      case ServiceRequestStatus.unknown:
        return 'Unknown';
    }
  }

  String get apiValue {
    switch (this) {
      case ServiceRequestStatus.pending:
        return 'Pending';
      case ServiceRequestStatus.confirmed:
        return 'Confirmed';
      case ServiceRequestStatus.inProgress:
        return 'In Progress';
      case ServiceRequestStatus.completed:
        return 'Completed';
      case ServiceRequestStatus.cancelled:
        return 'Cancelled';
      case ServiceRequestStatus.unknown:
        return 'Pending';
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
    this.clientId,
    this.clientName,
    this.clientEmail,
    this.providerId,
    this.providerName,
    this.requestedDate,
    this.estimatedCost,
    this.fileAttachmentUrl,
  });

  final String id;
  final String? clientId;
  final String? clientName;
  final String? clientEmail;
  final String? providerId;
  final String? providerName;
  final String serviceType;
  final String location;
  final String description;
  final DateTime? requestedDate;
  final num? estimatedCost;
  final String? fileAttachmentUrl;
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
      clientId: json['clientId']?.toString(),
      clientName: json['clientName']?.toString(),
      clientEmail: json['clientEmail']?.toString(),
      providerId: json['providerId']?.toString(),
      providerName: json['providerName']?.toString(),
      serviceType: json['serviceType']?.toString() ?? '',
      location: json['location']?.toString() ?? '',
      description: json['description']?.toString() ?? '',
      requestedDate: parseDate(json['requestedDate']),
      estimatedCost: json['estimatedCost'] is num
          ? json['estimatedCost'] as num
          : null,
      fileAttachmentUrl: json['fileAttachmentUrl']?.toString(),
      status: statusFromString(json['status']?.toString()),
      createdAt: parseDate(json['createdAt']) ?? DateTime.now(),
    );
  }
}
