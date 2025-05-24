import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { SECURITY_CONFIG } from '../../config/security.config';

export const securityMiddleware = [
  helmet(),  // 기본 보안 헤더 설정
  cors(SECURITY_CONFIG.cors),  // CORS 설정
  cookieParser(),  // 쿠키 파서
]; 