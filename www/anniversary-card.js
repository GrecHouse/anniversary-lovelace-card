class AnniversaryCard extends HTMLElement {
	set hass(hass) {

		const entities = this.config.entities;

		if ( entities.length > 0 && hass.states[entities[0]].state !== this._entityState ) {

			const symbolMemorial = "&#8224;";
			const symbolMarried = "&#9829;";
			
			const MESSAGE = {
				en: {
					title: 'Anniversary',
					today: 'Today',
					tomorrow: 'Tomorrow',
					none: 'No anniversaries in the next',
					days: 'days',
					years: 'years',
					in: 'in',
					space: ' '
				},
				ko: {
					title: '기념일',
					today: '오늘',
					tomorrow: '내일',
					none: '예정된 기념일이 없습니다.',
					days: '일 후',
					years: '번째',
					in: '',
					space: ''
				}
			}
			
			const lang = this.config.lang;
			let MSG = MESSAGE.en;
			if (lang && lang == "ko"){
				MSG = MESSAGE.ko;
			}

			const annivList = [];
			
			const numberOfDays = this.config.numberofdays ? this.config.numberofdays : 31; //Number of days from today upcoming birthdays will be displayed - default 31
			const showDate = this.config.showdate ? this.config.showdate : "solar";

			entities.forEach(el => {
				try {
					const anniv = hass.states[el];
					const up_date = anniv.attributes.upcoming_date;
					let this_date = new Date(up_date);

					const lunardate = new Date(anniv.attributes.lunar_date);
					const lunar = "음" + (lunardate.getMonth()+1) + "." + lunardate.getDate()

					annivList.push({
						"name": anniv.attributes.friendly_name,
						"count": anniv.state,
						"age": anniv.attributes.upcoming_count,
						"date": up_date,
						"month": this_date.getMonth()+1,
						"day": this_date.getDate(),
						"type": anniv.attributes.type,
						"icon": anniv.attributes.icon,
						"id": anniv.entity_id,
						"is_lunar": anniv.attributes.is_lunar,
						"lunar_date": lunar
					});
				} catch(e) {}
			});

			annivList.sort(function(a,b){
				return Number(a.count) < Number(b.count) ? -1 : Number(a.count) > Number(b.count) ? 1 : 0;
			});
			

			var annivToday = "";
			var annivNext = "";
			
			annivList.forEach(obj => {
				
				var bdSymbol = "";
				if (obj.type == 'memorial') {
					bdSymbol = " " + symbolMemorial;
				} else if (obj.type == 'wedding') {
					bdSymbol = " " + symbolMarried;
				}

				if ( obj.count == 0 ) {
					annivToday = annivToday + `<div class='aniv-wrapper aniv-today' entity-id='${obj.id}'><ha-icon class='ha-icon entity on' icon='mdi:crown'></ha-icon><div class='aniv-name'>${obj.name} (${obj.age}${MSG.space}${MSG.years}) ${bdSymbol}</div><div class='aniv-when'>${MSG.today}</div></div>`;
				} else if ( obj.count <= numberOfDays ) {
					var dbExpr = obj.count == 1 ? MSG.tomorrow : MSG.in + " " + obj.count + " " + MSG.days;
					if ( obj.is_lunar == "True" ){
						if ( showDate == "both" ) {
							dbExpr = dbExpr + ` (${obj.month}.${obj.day}/${obj.lunar_date})`;
						} else if ( showDate == "lunar" ) {
							dbExpr = dbExpr + ` (${obj.lunar_date})`;
						} else {
							dbExpr = dbExpr + ` (${obj.month}.${obj.day})`;
						}
					} else {
						dbExpr = dbExpr + ` (${obj.month}.${obj.day})`;
					}

					annivNext = annivNext + `<div class='aniv-wrapper' entity-id='${obj.id}'><ha-icon class='ha-icon entity' icon='${obj.icon}'></ha-icon><div class='aniv-name'>${obj.name} (${obj.age}${MSG.space}${MSG.years}) ${bdSymbol}</div><div class='aniv-when'>${dbExpr}</div></div>`;
				}

			});
			
			var cardHtmlStyle = `
			<style>
				.aniv-wrapper {
					padding: 5px;
					margin-bottom: 5px;
				}
				.aniv-wrapper:last-child {
					OFFborder-bottom: none;
				}
				.aniv-divider {
					height: 1px;
					border-bottom: 1px solid rgba(127, 127, 127, 0.7);
					margin-bottom: 5px;
				}
				.aniv-today {
					font-weight: bold;
					OFFborder-bottom: 1px solid;
				}
				.aniv-wrapper .ha-icon {
					display: inline-block;
					height: 20px;
					width: 20px;
					margin-left: 5px;
					margin-right: 17px;
					color: var(--paper-item-icon-color);
				}
				.aniv-wrapper .ha-icon.on {
					margin-left: 5px;
					margin-right: 17px;
					color: var(--paper-item-icon-active-color);
				}
				.aniv-name {
					display: inline-block;
					padding-left: 10px;
					padding-top: 2px;
				}
				.aniv-none {
					color: var(--paper-item-icon-color);
				}
				.aniv-when {
					display: inline-block;
					float: right;
					font-size: smaller;
					padding-top: 3px;
				}
			</style>
			`;
			
			if (!annivToday && !annivNext) {
				var cardHtmlContent = `<div class='aniv-none'>${MSG.none} ${numberOfDays} ${MSG.days}</div>`;
				if (lang && lang == "ko"){
					cardHtmlContent = `<div class='aniv-none'>다음 ${numberOfDays}일 동안 예정된 기념일이 없습니다.</div>`;
				}
			} else if (!annivToday) {
				var cardHtmlContent = annivNext;
			} else if (!annivNext) {
				var cardHtmlContent = annivToday;
			} else {
				var cardHtmlContent = annivToday + "<div class='aniv-divider'></div>" + annivNext;
			}
			
			const card = document.createElement('ha-card');
			const tittel = this.config.title;
			card.header = tittel ? tittel : MSG.title; // Card title from ui-lovelace.yaml - Defaults to Anniversary
			this.content = document.createElement('div');
			this.content.style.padding = '0 16px 16px';
			
			card.appendChild(this.content);
			this.appendChild(card);

			this.content.innerHTML = cardHtmlStyle + cardHtmlContent;
				
			const cols = this.content.querySelectorAll('.aniv-wrapper');
			cols.forEach(col => {
				col.addEventListener("click", function(){
					const event = new Event('hass-more-info', {
						bubbles: true,
						cancelable: false,
						composed: true
					});
					event.detail = { entityId: col.getAttribute("entity-id") };
					card.shadowRoot.dispatchEvent(event);
					return event;
				});
			});

			this._entityState = hass.states[entities[0]].state;

		}	
		
	}
	
	setConfig(config) {
		this.config = config;
	}
	
	// The height of your card. Home Assistant uses this to automatically distribute all cards over the available columns.
	getCardSize() {
		return 3;
	}

}

customElements.define('anniversary-card', AnniversaryCard);
