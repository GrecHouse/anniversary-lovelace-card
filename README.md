![version](https://img.shields.io/badge/version-0.5-blue)
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)

# Anniversary Lovelace UI card for Home Assistant

### 이 카드 소스는 https://github.com/erlsta/homeassistant-lovelace-birthday-reminder-card 를 이용해 만들어졌습니다.

<br><br>

홈어시스턴트 lovelace 커스텀 UI 입니다.\
아래의 anniversary 커스텀 컴포넌트 센서를 이용합니다.

[Anniversary Senser 설치하기](https://github.com/GrecHouse/anniversary)

이 커스텀 센서를 이용하지 않으려면\
위에 링크된 homeassistant-lovelace-birthday-reminder-card 를 이용해보세요.\
별도의 json 파일로 기념일을 관리합니다.

<br>

## Screenshot

![screenshot_anniv_card_02](https://user-images.githubusercontent.com/49514473/60637306-ee105500-9e54-11e9-9a6e-504c951727bc.png)
![screenshot_anniv_card_01](https://user-images.githubusercontent.com/49514473/60637307-eea8eb80-9e54-11e9-827b-28a687453f8f.png)

- anniversary sensor type 이 `memorial` 일 경우 옆에 `†` 아이콘이,\
`wedding` 일 경우 `♥` 아이콘이 붙어서 보여집니다.
- anniversary sensor type 이 `todo` 또는 `event` 이거나\
date 형식이 `mm-dd`일 경우 count(x번째)가 표시되지 않습니다.
- anniversary sensor type 이 `birth` 이고, showkage 옵션이 `true` 일 경우\
한국 나이가 아이콘 자리에 표시됩니다.
- 장보기목록에 추가된 항목은 type 이 `todo`로 추가됩니다.

<br>

## Version history
| Version | Date        |               |
| :-----: | :---------: | ------------- |
| v0.1    | 2019.07.04  | First version  |
| v0.2    | 2019.07.05  | showdate 옵션 추가<br>anniversary 센서 1.1 버전 필요 |
| v0.21   | 2019.07.05  | type이 todo 또는 event 일 경우에는 count(x번째) 표시를 하지 않음 |
| v0.3    | 2019.07.15  | 장보기목록 이용 기능 추가<br>anniversary 센서 1.2 버전 필요 |
| v0.31   | 2019.07.15  | noshoplist 옵션 추가 |
| v0.32   | 2019.11.25  | 장보기목록 동일 명칭 중복 항목 버그 수정 |
| v0.4    | 2019.12.11  | mm-dd 형식 지원<br>anniversary 센서 1.3 버전 필요 |
| v0.5    | 2019.12.12  | 제목 보이지 않도록 하는 설정 추가 |
| v0.6    | 2021.05.03  | 한국 나이 표시 추가 |

<br>


## Installation

### 직접 설치
- HA 설치 경로 아래 www 폴더에 파일을 넣어줍니다.\
`<config directory>/www/anniversary-card.js`

### HACS로 설치
- HACS > Frontend 메뉴 선택
- 우측 상단 메뉴 버튼 클릭 후 Custom repositories 선택
- Add Custom Repository URL 에 `https://github.com/GrecHouse/anniversary-lovelace-card` 입력, \
  Category에 `Lovelace` 선택 후 ADD
- HACS > Frontend 메뉴에서 우측 하단 + 버튼 누르고 `[KR] Anniversary Card` 검색하여 설치

<br>


## Usage

### configuration

- lovelace UI 설정 최상단 아래 내용을 추가

#### 직접 설치
```yaml
resources:
  - url: /local/anniversary-card.js?v=0.5
    type: js
```

#### HACS로 설치
```yaml
resources:
  - url: /hacsfiles/anniversary-lovelace-card/anniversary-card.js
    type: js
```
- card 설정을 추가
```yaml
entities:
  - sensor.birthday_hong
  - sensor.wedding
  - sensor.steve_jobs
  - sensor.anniv_mmdd
lang: ko
numberofdays: 90
showdate: both
showkage: true
title: Anniversary
type: 'custom:anniversary-card'
```

<br>

### 설정값

|옵션|값|
|--|--|
|type| (필수) custom:anniversary-card |
|entities| (필수) 표시할 센서 목록 |
|lang| (옵션) 표시언어. 기본값은 en, 한글로 바꾸려면 ko |
|title| (옵션) 카드 상단에 표시되는 카드명칭<br>설정하지 않을 경우 기본값은 기념일 (ko) / Anniversary (en)<br>'' 또는 'none'으로 지정시 제목 보이지 않음 |
|numberofdays| (옵션) 화면에 표시할 센서의 기한. 기본값은 31일<br>설정한 일수 이하로 남은 기념일만 표시됨 |
|showdate| (옵션) 음력기념일의 날짜 표시 설정<br><ul><li>solar = 양력으로 표시 (기본값)</li><li>lunar = 음력으로 표시</li><li>both = 양력, 음력 둘다 표시</li></ul>|
|showkage| (옵션) 한국 나이 표시 여부. 기본값은 false<br>true로 설정하면 윗첨자 스타일로 한국 나이가 추가 표시됨. |
|noshoplist| (옵션) 장보기목록 사용 안함 여부. 기본값은 false<br>true로 설정하면 장보기목록 리스트는 보이지 않음. |

<br>

## 버그 또는 문의사항
네이버 카페 [HomeAssistant](https://cafe.naver.com/koreassistant/) `그렉하우스` \
네이버 카페 [SmartThings&IoT Home](https://cafe.naver.com/stsmarthome/) `그렉하우스`

