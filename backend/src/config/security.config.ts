const isProd = process.env.NODE_ENV === 'production';

export const SECURITY_CONFIG = {
  cors: {
    origin: process.env.CORS_ORIGIN || (isProd ? 'https://fe.com' : 'http://localhost:3000'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  },
  cookie: {
    httpOnly: true,
    secure: isProd,  // HTTPS에서만 쿠키 전송
    sameSite: isProd ? 'strict' : 'lax' as 'strict' | 'lax',  // CSRF 보호
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7일
  }
} 