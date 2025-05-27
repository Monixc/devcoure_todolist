# TodoList
데브코스 마르코 멘토님 과제로 개발한 투두리스트 애플리케이션입니다.

## 기술 스택
- FrontEnd: React, Typescript, Styled-components
- BackEnd: Express, Typescript, Prisma
- Database: MySQL

## 주요 기능
- 회원가입 및 로그인(JWT 인증)
- 팀 생성 및 팀원 초대
- 팀/개인별 투두리스트 관리
- 투두 항목 CRUD
- 실시간 UI 반영, 마지막 접속 화면 기억


| 이미지 | 주요 기능 설명                                   |
|--------|--------------------------------------------------|
| **회원가입**<br>사용자가 이메일, 비밀번호 등 정보를 입력하여 계정 생성| ![todolist1](https://github.com/user-attachments/assets/11eb5608-d70c-4e4d-a92e-53fe4a3cb66d)  |
| **로그인**<br>이메일, 비밀번호로 로그인하여 서비스 이용 시작 | ![todolist2](https://github.com/user-attachments/assets/d900ab92-fd36-4c37-a819-da2aecde13e1) |
| **투두 관리**<br>개인 투두리스트 추가, 수정, 삭제, 완료 처리 | ![todolsit3](https://github.com/user-attachments/assets/65dba9b4-6754-4eb2-bd8a-5fc7d1b8d197) |
| **팀 생성/초대**<br>새로운 팀을 만들고, 팀원 초대 링크 생성| ![todo4](https://github.com/user-attachments/assets/a8b34131-a3cd-465c-a6fa-debb1bb68c29) |
| **초대 수락 및 팀 투두 공유**<br>초대 링크로 팀에 가입, 팀 투두리스트를 함께 관리 | ![todo5](https://github.com/user-attachments/assets/c799c0e9-0b1c-4bb9-8cf9-a195e6c7cc27) |

---

## 폴더 구조
```
devcoure_todolist/
  backend/         # 백엔드(Express, Prisma, JWT 등)
    prisma/        # Prisma 스키마 및 마이그레이션
    src/
      config/      # 환경설정, 설정 파일
      constants/   # 상수 정의
      features/    # 주요 도메인(인증, 팀, 투두 등)
        auth/      # 인증 관련 로직
          validators/ # 인증 입력값 검증
        teams/     # 팀 관련 기능
        todos/     # 투두 관련 기능
      middlewares/ # 미들웨어(인증, 권한, 보안 등)
        auth/
        permissions/
        security/
        validation/
      types/       # 타입 정의
        express/
      utils/       # 유틸리티 함수
  frontend/        # 프론트엔드(React, TypeScript)
    public/        # 정적 파일
    src/
      assets/      # 이미지, 폰트 등
      components/  # 재사용 컴포넌트
        common/
        layout/
          SideBar/
            _components/
      constants/   # 상수
      hooks/       # 커스텀 훅
      pages/       # 페이지별 컴포넌트
        Home/
          __components/
            TodoItem/
        Join/
        Login/
      services/    # API 서비스
      styles/      # 스타일, 토큰
        tokens/
      types/       # 타입 정의
      utils/       # 유틸리티 함수
  .gitignore       # Git 무시 파일
```

## 설치 및 실행 방법

1. 레포지토리 클론
   ```
   git clone [레포지토리 주소]
   cd devcoure_todolist  
   ```
2. 백엔드 실행
   ```
   cd backend
   npm install
   npx prisma migrate dev
   npm run dev
   ```
3. 프론트엔드 실행
   ```
   cd frontend
   npm install
   npm run dev
   ```
