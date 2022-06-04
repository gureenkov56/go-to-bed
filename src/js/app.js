/*********************
 * 		app.js
 *
 * 1. Sleep zone
 * 2. Open Setting Modal
 * 3. Time
 * 4. Calc cycle
 */

document.addEventListener('DOMContentLoaded', () => {

	const
		deepZone = document.getElementById('deepZone'),
		shortWakeUpZone = document.getElementById('shortWakeUpZone'),
		currentCycle = document.getElementById('currentCycle'),
		fallBlock = document.getElementById('fallBlock'),
		modal = document.querySelector('.modal'),
		openSettingModalBtn = document.querySelectorAll('.open-setting-modal'),

		modalContainer = document.querySelector('.modal__container'),
		inputStartSleeping = document.getElementById('inputStartSleeping'),
		btnSpanStartSleeping = document.getElementById('btnSpanStartSleeping'),
		inputNeedWakeUp = document.getElementById('inputNeedWakeUp'),

		btnSpanNeedWakeUp = document.getElementById('btnSpanNeedWakeUp'),
		calcWithStartSleeping = document.getElementById('calcWithStartSleeping'),
		selectTimeForFallingSleep = document.getElementById('selectTimeForFallingSleep'),
		closeModalBtns = document.querySelectorAll('.close-modal-btn'),

		perfectHours = document.getElementById('perfectHours'),
		perfectMinutes = document.getElementById('perfectMinutes'),
		blinkedColon = document.getElementById('blinkedColon')
		;

	let
		timeForFallingDown = localStorage.getItem('timeForFallingDown') ? localStorage.getItem('timeForFallingDown') : 15,
		timeWasSetted = false
		;

	timeForFallingDown = Number(timeForFallingDown);

	/******************
	 * 1. Sleep zones *
	 ******************/
	shortWakeUpZone.addEventListener('click', (event) => sleepZones('Незаметные короткие пробуждения', event.target));
	shortWakeUpZone.addEventListener('mouseover', (event) => sleepZones('Незаметные короткие пробуждения', event.target));

	deepZone.addEventListener('click', (event) => sleepZones('Глубокий восстановительный сон', event.target));
	deepZone.addEventListener('mouseover', (event) => sleepZones('Глубокий восстановительный сон', event.target));

	fallBlock.addEventListener('click', (event) => sleepZones('Погружение в сон', event.target));
	fallBlock.addEventListener('mouseover', (event) => sleepZones('Погружение в сон', event.target));



	function sleepZones(text, eventTarget) {
		currentCycle.innerHTML = text;
		let newColor = eventTarget.dataset.color ? eventTarget.dataset.color : window.getComputedStyle(eventTarget).backgroundColor;
		currentCycle.style.backgroundColor = newColor;
	}

	/*************************
	 * 2. Open Setting Modal *
	 *************************/

	openSettingModalBtn.forEach(btn => {
		btn.addEventListener('click', () => {
			modal.style.visibility = 'visible';
			modal.style.opacity = 1;

			modalContainer.style.visibility = 'visible';
			modalContainer.style.opacity = 1;
			modalContainer.style.marginTop = '0px';

			document.body.style.overflow = 'hidden';
		})
	})

	/***********
	 * 3. Time *
	 ***********/

	// start sleeping time
	if (localStorage.getItem('timeStartSleeping')) {
		inputStartSleeping.value = localStorage.getItem('timeStartSleeping');
		btnSpanStartSleeping.innerHTML = inputStartSleeping.value;
	}

	inputStartSleeping.addEventListener('change', () => {
		localStorage.setItem('timeStartSleeping', inputStartSleeping.value);
		btnSpanStartSleeping.innerHTML = inputStartSleeping.value;
	})

	// need wake up time
	if (localStorage.getItem('timeNeedWakeUp')) {
		inputNeedWakeUp.value = localStorage.getItem('timeNeedWakeUp');
		btnSpanNeedWakeUp.innerHTML = inputNeedWakeUp.value;
	}

	inputNeedWakeUp.addEventListener('change', () => {
		localStorage.setItem('timeNeedWakeUp', inputNeedWakeUp.value);
		btnSpanNeedWakeUp.innerHTML = inputNeedWakeUp.value;
	})

	// I need in X time for falling sleep
	if (localStorage.getItem('timeForFallingDown')) {
		selectTimeForFallingSleep.value = localStorage.getItem('timeForFallingDown');
		timeForFallingDown = selectTimeForFallingSleep.value;
		calcCycleByNow();
	}

	selectTimeForFallingSleep.addEventListener('change', () => {
		localStorage.setItem('timeForFallingDown', selectTimeForFallingSleep.value);
		timeForFallingDown = selectTimeForFallingSleep.value;
		calcCycleByNow();
	})

	/*****************
	 * 4. Calc cycle *
	 *****************/

	closeModalBtns.forEach(closeModalBtn => {
		closeModalBtn.addEventListener('click', () => {
			modal.style.visibility = 'hidden';
			modal.style.opacity = 0;

			modalContainer.style.visibility = 'hidden';
			modalContainer.style.opacity = 0;
			modalContainer.style.marginTop = '6rem';

			document.body.style.overflow = 'scroll';

			calcCycleByNow();
			drowCycleGraphic(selectTimeForFallingSleep.value);
		})
	})

	function calcCycleByNow() {
		let currentTime = new Date;
		let perfectHoursFormat = null;
		let perfectMinutesFormat = null;

		currentTime.setMinutes(currentTime.getMinutes() + Number(timeForFallingDown));

		for (let i = 1; i < 7; i++) {
			currentTime.setMinutes(currentTime.getMinutes() + 90);

			if (i === 5) {
				perfectHoursFormat = formatTime(currentTime.getHours());
				perfectMinutesFormat = formatTime(currentTime.getMinutes());
			} else {

				document.getElementById(`timeOfCycleEnding${i}`).innerHTML = formatTime(currentTime.getHours()) + ':' + formatTime(currentTime.getMinutes());
			}
		}

		if (!timeWasSetted) {
			perfectHours.innerHTML = perfectHoursFormat;
			perfectMinutes.innerHTML = perfectMinutesFormat;
			timeWasSetted = true;
		}

		if (perfectHours.innerHTML != perfectHoursFormat) {
			perfectHours.classList.add('opacity0');
			setTimeout(() => {
				perfectHours.innerHTML = perfectHoursFormat;
				perfectHours.classList.remove('opacity0');
			}, 1000);
		}

		if (perfectMinutes.innerHTML != perfectMinutesFormat) {
			perfectMinutes.classList.add('opacity0');
			setTimeout(() => {
				perfectMinutes.innerHTML = perfectMinutesFormat;
				perfectMinutes.classList.remove('opacity0');
			}, 1000);
		}


	}

	calcCycleByNow();

	setInterval(() => {
		blinkedColon.classList.toggle('opacity0');
		calcCycleByNow();
	}, 1000);

	function formatTime(number) {
		if (Number(number) < 10) {
			return '0' + number;
		} else {
			return number;
		}
	}

	function drowCycleGraphic() {
		fallBlock.style.minWidth = timeForFallingDown * 2 + 'px';
		shortWakeUpZone.style.left = timeForFallingDown * 2 + 130 + 'px';
		deepZone.style.left = timeForFallingDown * 2 + 'px';
	}

	calcWithStartSleeping.addEventListener('click', () => {
		let inputStartSleepingValue = inputStartSleeping.value;
	})

	calcWithNeedWakeUp.addEventListener('click', () => {

	})

	drowCycleGraphic();
	calcCycleByNow();
})