// src/middleware.ts
import { NextResponse } from 'next/server'
import { withRole } from '../middleware/withRole'

console.log('⚡ Middleware file loaded! (You should see this on server start)')

export const config = {
  matcher: [
    '/api/admin/:path*'
  ]
}

export default withRole(['admin'])
