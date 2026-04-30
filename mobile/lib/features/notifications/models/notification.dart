// lib/features/notifications/models/notification.dart

class AppNotification {
  const AppNotification({
    required this.id,
    required this.title,
    required this.message,
    required this.read,
    required this.createdAt,
    this.type,
    this.link,
  });

  final String id;
  final String title;
  final String message;
  final bool read;
  final DateTime createdAt;
  final String? type;
  final String? link;

  factory AppNotification.fromJson(Map<String, dynamic> json) {
    DateTime parseDate(dynamic v) {
      if (v == null) return DateTime.now();
      try {
        return DateTime.parse(v.toString()).toLocal();
      } catch (_) {
        return DateTime.now();
      }
    }

    return AppNotification(
      id: json['id']?.toString() ?? json['_id']?.toString() ?? '',
      title: json['title']?.toString() ?? json['type']?.toString() ?? 'Notification',
      message: json['message']?.toString() ?? '',
      read: json['read'] == true,
      createdAt: parseDate(json['createdAt']),
      type: json['type']?.toString(),
      link: json['link']?.toString(),
    );
  }
}
