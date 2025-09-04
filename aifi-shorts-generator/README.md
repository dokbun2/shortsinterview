# AIFI 숏츠생성기

AIFI 숏츠생성기는 비디오 스크립트 JSON 파일을 관리하고 미리보기할 수 있는 웹 애플리케이션입니다.

## 기능

- **JSON 파일 업로드/다운로드**: 스크립트 데이터를 JSON 형식으로 관리
- **씬 네비게이션**: 좌측 사이드바에서 각 씬을 선택하여 탐색
- **탭 시스템**: 이미지, 비디오, 오디오 콘텐츠를 탭으로 구분하여 표시
- **미디어 프리뷰**: URL을 입력하여 이미지, 비디오, 오디오를 미리보기
- **갤러리 뷰**: 모든 미디어를 한 곳에서 확인

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 프로덕션 빌드

```bash
npm run build
```

## 사용 방법

1. 헤더의 "업로드" 버튼을 클릭하여 JSON 파일을 업로드합니다.
2. 좌측 사이드바에서 원하는 씬을 선택합니다.
3. 상단 탭에서 이미지, 비디오, 오디오를 선택합니다.
4. URL 입력란에 미디어 URL을 입력하여 미리보기합니다.
5. "갤러리" 페이지에서 모든 미디어를 한눈에 확인합니다.
6. "다운로드" 버튼으로 현재 상태를 JSON으로 저장합니다.

## JSON 구조

```json
{
  "script_id": "string",
  "request_parameters": {
    "dialect": "string",
    "subject": "string",
    "core_conflict": "string"
  },
  "output": {
    "title": "string",
    "character_setting": "string",
    "logline": "string",
    "production_note": "string",
    "timeline": [
      {
        "timestamp": "string",
        "scene_description": "string",
        "dialogue": "string",
        "image_prompts": {
          "midjourney": "string",
          "narobanana": "string"
        },
        "video_prompts": {
          "kling": "string",
          "veo3": "string"
        }
      }
    ]
  }
}
```

## 기술 스택

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand (상태 관리)
- React Dropzone (파일 업로드)