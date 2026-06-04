import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// mongodb+srv:// always negotiates TLS. A plain mongodb:// host does not.
// If a srv/ssl URI points at a server that does NOT accept TLS you get:
//   "Mongoose is connecting with SSL enabled, but the server is not accepting
//    SSL connections." -> that is an ENV/Atlas problem, not a code problem.
const isSrv = MONGODB_URI.startsWith('mongodb+srv://');

let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// Drop the cached connection whenever the socket dies so the next request
// rebuilds it instead of reusing a half-open/broken connection. This is the
// fix for intermittent login failures on warm serverless lambdas.
function bindResetHandlers(conn: typeof mongoose) {
  const c = conn.connection;
  if ((c as any).__ndtHandlersBound) return;
  (c as any).__ndtHandlersBound = true;
  const reset = () => {
    cached.conn = null;
    cached.promise = null;
  };
  c.on('error', reset);
  c.on('disconnected', reset);
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    // Only reuse a connection that is actually live (readyState 1 = connected).
    if (cached.conn.connection.readyState === 1) return cached.conn;
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      // srv URIs imply tls; only set tls=true explicitly for srv to avoid
      // accidentally forcing TLS on a plain mongodb:// host.
      ...(isSrv ? { tls: true } : {}),
    };
    cached.promise = mongoose.connect(MONGODB_URI as string, opts);
  }

  try {
    cached.conn = await cached.promise;
    bindResetHandlers(cached.conn);
  } catch (e: any) {
    cached.promise = null;
    cached.conn = null;
    throw e;
  }
  return cached.conn;
}

export default dbConnect;
