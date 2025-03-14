# SHIFT Helper

[English](README.md) | [中文](README_zh.md) | [Deutsch](README_de.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Wikang Tagalog](README_tl.md) | [reo Māori](README_mi.md) | [हिन्दी](README_hi.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Kinetic NZ Bus Tauranga의 운전자들을 위해 특별히 설계된 간단하고 사용하기 쉬운 오픈소스 근무 관리 도구로, 주간 근무를 계획하고 대부분의 캘린더 애플리케이션에 추가할 수 있도록 도와줍니다.

#### 기능
1. **다중 Depot 지원**: Greerton, Papamoa, Maleme, Standby의 Shifts를 지원합니다.
2. **학교 방학 모드**: School Holiday 스위치를 켜면 Shift 옵션이 자동으로 조정됩니다.
3. **공휴일 모드**: 특정 날짜를 Public Holiday로 설정하여 해당 날짜의 옵션을 동적으로 변경할 수 있습니다.
4. **일괄 Shift 배치**: 여러 날에 걸쳐 반복되는 Shift를 한 번에 선택하여 동기화할 수 있습니다.
5. **캘린더 내보내기**: .ics 파일을 생성하여 주류 캘린더 앱(예: Google Calendar, Apple Calendar, Microsoft Outlook Calendar)에 추가할 수 있습니다.
6. **오프라인 사용 가능**: PWA 기술로 언제 어디서나 사용 가능합니다.

### 사용 방법
1. Depot을 선택하세요(예: Greerton).
2. 원하는 주의 아무 날짜를 선택하면 일요일을 시작으로 한 주간 근무 뷰가 자동 표시됩니다.
3. 드롭다운 메뉴로 매일 근무를 설정하고, 체크박스로 일괄 동기화하며, 휴일 옵션을 전환하여 Shift를 조정하세요.
4. “Add to Calendar”를 클릭하여 .ics 파일을 생성하고 캘린더에 가져오세요. iPhone Safari 사용자는 다운로드 없이 바로 가져올 수 있습니다.
5. “Send Feedback”을 클릭하여 제안이나 데이터베이스 오류를 제출하거나, “About”에서 버전 및 업데이트 정보를 확인하세요.

### 설치
SHIFT Helper는 브라우저 접속과 모바일 설치를 지원하며, PWA(프로그레시브 웹 앱) 경험을 제공합니다. 아래는 각 기기에 대한 단계별 안내입니다:

#### 브라우저 접속
- 최신 브라우저(예: Chrome, Safari, Edge)를 엽니다.
- URL을 입력하세요: https://chenpreston.github.io/shift-helper-pwa/
- 추가 설치 없이 바로 사용할 수 있습니다.

#### 안드로이드 사용자
- **단계**:
  1. Chrome 브라우저(권장)에서 위 URL을 엽니다.
  2. 오른쪽 상단의 “점 세 개 메뉴”를 탭합니다.
  3. “홈 화면에 추가” 또는 “앱 설치”를 선택합니다.
  4. 확인하면 앱 아이콘이 홈 화면에 나타나며, 일반 앱처럼 사용할 수 있습니다.
- **캘린더 가져오기**:
  - “Add to Calendar”를 클릭하면 .ics 파일이 다운로드됩니다.
  - 파일을 열면(보통 Google Calendar와 자동 연결됨) 안내에 따라 가져옵니다.
- **주의**: 오프라인 사용을 지원하며, 최신 데이터를 위해 네트워크 연결을 권장합니다.

#### 애플 사용자 (iPhone/iPad)
- **단계**:
  1. Safari 브라우저에서 위 URL을 엽니다(캘린더 직접 가져오기를 위해 Safari 필수).
  2. 하단의 “공유” 아이콘(위쪽 화살표가 있는 사각형)을 탭합니다.
  3. “홈 화면에 추가”를 선택합니다.
  4. 확인하면 앱 아이콘이 홈 화면에 나타나며 사용할 수 있습니다.
- **캘린더 가져오기**:
  - “Add to Calendar”를 클릭하면:
    - **Safari**: 캘린더 가져오기 프롬프트가 나타나며, 안내에 따라 Apple Calendar에 추가됩니다.
    - **Chrome**: .ics 파일만 다운로드되며, Apple Calendar에 직접 가져올 수 없습니다.
  - Chrome에서 .ics 파일을 다운로드한 경우, 이메일이나 AirDrop을 통해 Safari에서 열거나, .ics를 지원하는 타사 앱(예: Google Calendar App)을 사용하세요.
- **중요 참고**:
  - 애플 기기에서 Chrome 등 비-Safari 브라우저는 .ics 파일을 Apple Calendar에 직접 가져올 수 없습니다. 평소 Safari를 사용하지 않는 경우, 위 설치 단계를 Safari에서 한 번만 수행하세요. 설치 후 홈 화면에서 앱을 실행하면 시스템이 자동으로 Safari 엔진을 사용하므로, 일상적인 웹 브라우징은 Chrome을 계속 사용할 수 있습니다.
  - 최적의 경험을 위해 iOS 시스템을 최신 버전으로 업데이트하세요.

### 데이터 출처
데이터는 회사에서 제공한 최신 Shift Card에서 가져왔습니다(2025년 1월 기준 정리). 캘린더에는 다음이 포함됩니다: 근무 번호, 출근 시간, 퇴근 시간, 식사 장소, 식사 시간, 휴식 시간.

### 기술
- **프론트엔드**: HTML, CSS, JavaScript
- **PWA**: Service Worker로 오프라인 캐싱 구현
- **CSV 파싱**: PapaParse 라이브러리
- **오픈소스**: MIT 라이선스, 소스 코드는 [GitHub](https://github.com/chenpreston/shift-helper-pwa)에서 확인 가능