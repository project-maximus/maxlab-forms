import { neon } from '@neondatabase/serverless';

// Singleton — reused across requests in the same lambda instance
let _sql: ReturnType<typeof neon> | null = null;

export function getDb() {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    _sql = neon(url);
  }
  return _sql;
}
