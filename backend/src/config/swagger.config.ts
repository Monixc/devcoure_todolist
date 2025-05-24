import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TodoList API',
      version: '1.0.0',
      description: '마르코 멘토님 투두리스트 과제 API 문서',
    },
    servers: [
      {
        url: 'http://localhost:4444',
        description: '개발 서버',
      },
    ],
  },
  apis: ['./src/features/**/*.routes.ts'], // 라우트 파일들 경로
};

export const swaggerSpec = swaggerJsdoc(options); 