# front-five
사이드프로젝트

애자일로 간다.


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
