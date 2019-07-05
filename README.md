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

- anniversary sensor type 이 `memorial` 일 경우 옆에 `†` 아이콘이\
`wedding` 일 경우 `♥` 아이콘이 붙어서 보여집니다.

<br>

## Version history
| Version | Date        |               |
| :-----: | :---------: | ------------- |
| v0.1    | 2019.07.11  | First version  |
| v0.2    | 2019.07.12  | showdate 옵션 추가<br>anniversary 센서 1.1 버전 필요 |
| v0.21   | 2019.07.12  | type이 todo 또는 event 일 경우에는 count(x번째) 표시를 하지 않음 |

<br>


## Installation

- HA 설치 경로 아래 www 폴더에 파일을 넣어줍니다.\
`<config directory>/www/anniversary-card.js`

<br>


## Usage

### configuration
- lovelace UI 설정 최상단 아래 내용을 추가

```yaml
resources:
  - url: /local/anniversary-card.js?v=0.2
    type: js
```

- card 설정을 추가
```yaml
entities:
  - sensor.anniv_birth_wife
  - sensor.anniv_birth_son
  - sensor.anniv_memorial_daddy
  - sensor.anniv_wedding
lang: ko
numberofdays: 90
showdate: both
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
|title| (옵션) 카드 상단에 표시되는 카드명칭<br>기본값은 기념일 (ko) / Anniversary (en) |
|numberofdays| (옵션) 화면에 표시할 센서의 기한. 기본값은 31일<br>설정한 일수 이하로 남은 기념일만 표시됨 |
|showdate| (옵션) 음력기념일의 날짜 표시 설정<br><ul><li>solar = 양력으로 표시 (기본값)</li><li>lunar = 음력으로 표시</li><li>both = 양력, 음력 둘다 표시</li></ul>

<br>

## 버그 또는 문의사항
네이버 카페 [SmartThings&IoT Home](https://cafe.naver.com/stsmarthome/) `그레고리하우스`

