// lib/core/storage/local_db.dart
//
// Cross-platform SQLite wrapper. On native (Android, iOS, macOS, Windows,
// Linux) uses sqflite. On web, uses sqflite_common_ffi_web which backs the
// same SQL surface with IndexedDB.
//
// The web initialiser MUST be called before openDatabase. It downloads the
// sql.js WASM blob on first run (~600 KB) and caches it in the SW. This
// happens once per device per app version.

import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';
import 'package:sqflite_common_ffi_web/sqflite_ffi_web.dart';

class LocalDb {
  static Database? _db;

  static Future<void> initForPlatform() async {
    if (kIsWeb) {
      // Wires databaseFactory to the IndexedDB-backed FFI factory.
      databaseFactory = databaseFactoryFfiWeb;
    }
    // Native uses the default sqflite factory; nothing to do.
  }

  static Future<Database> instance() async {
    if (_db != null) return _db!;
    await initForPlatform();

    final path = kIsWeb
        ? 'ndtconnect.db'
        : p.join((await getApplicationDocumentsDirectory()).path, 'ndtconnect.db');

    _db = await openDatabase(
      path,
      version: 1,
      onCreate: (db, _) async {
        await db.execute('CREATE TABLE IF NOT EXISTS equipment ('
            'id TEXT PRIMARY KEY, name TEXT, type TEXT, manufacturer TEXT, '
            'model TEXT, serial_number TEXT, calibration_due_date TEXT, '
            'status TEXT, notes TEXT, updated_at TEXT)');
        await db.execute('CREATE TABLE IF NOT EXISTS calibration_alerts ('
            'id TEXT PRIMARY KEY, equipment_id TEXT, email_to TEXT, '
            'days_before INTEGER, enabled INTEGER, updated_at TEXT)');
        await db.execute('CREATE TABLE IF NOT EXISTS certifications ('
            'id TEXT PRIMARY KEY, kind TEXT, person_name TEXT, '
            'method TEXT, level TEXT, body TEXT, '
            'issued_date TEXT, expiry_date TEXT, notes TEXT, updated_at TEXT)');
      },
    );
    return _db!;
  }
}
