# front-five
사이드프로젝트

애자일로 간다.

1. 주제
- 캠핑 커뮤니티 + EC
2. 라이브러리
- react 17 , next.js, 리코일,  (리덕스 + 사가 vs 리쿼 + 리코), ts, 이모션, MUI
3. 구조설계
- 다음주까지 각자 정해서 발표 (이유를) 
4. 공통
- 각자 생각해서 붙일거 있으면 가져오기
5. UI 설계 ( 기획 29까지 공유)
- 요구사항 정리
* 앱형태로
* b2c
  - 로그인, 로그아웃, 회원가입 (선영)
  - 검색 (민준)
  - 자유게시판 (유경)
  - 공지사항 (상민)
  - 추천(지도기반 장소) (호영)
  - 상품 렌딩페이지(상세) (민준)
  - 결제화면 (상민)
  - 장바구니 (호영)
  - 상품리스트 (선영)
  - 마이페이지 (유경)
* admin
  - 회원관리 (병식)
  - 게시글 관리
  - 추천 관리
  - 대시보드
  - 상품관리
  (차후 인프라관리까지...)
6. 테스트코드
- jest

## 폴더 구조
```bash
├── api                 : api 요청/응답 관련 모듈
│   ├── index           : 외부에서 사용할 모듈
│   ├── other folder    : 내부 모듈
├── assets              : 배포시 포함시킬 리소스
│   ├── fonts           : 폰트 관련
│   ├── icon            : 아이콘 관련
│   ├── style           : 스타일 관련
│   └── ts              : 상수나 공통 함수, 유틸리티 폴더
│        └── common
│        └── const      : 상수
└── components          : 공통 component 관리
└── layout              : layout 폴더
└── pages               : page 단위의 component 폴더
└── recoil              : recoil을 위한 폴더
└── index.html          : HTML 시작 파일
└── index.tsx           : React 시작 파일
└── package.json        : 설치된 라이브러리/패키지 정보
└── webpack.config.ts   : 웹팩 설정 파일
└── tsconfig.json       : typescript 설정 파일
```

## 빌드
### 최초 빌드
최초 빌드시 아래의 명령을 사용해 모듈을 다운 받아야합니다.
* `npm install`
### 개발용 빌드
command : `npm run dev`
빌드된 파일 위치 : `/dist`