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
		modalCloseBtn = document.querySelector('.modal__close'),
		inputStartSleeping = document.getElementById('inputStartSleeping'),
		btnSpanStartSleeping = document.getElementById('btnSpanStartSleeping'),
		inputNeedWakeUp = document.getElementById('inputNeedWakeUp'),
		btnSpanNeedWakeUp =  document.getElementById('btnSpanNeedWakeUp'),
		calcWithStartSleeping = document.getElementById('calcWithStartSleeping'),
		selectTimeForFallingSleep = document.getElementById('selectTimeForFallingSleep')
		;

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
		})
	})

	modalCloseBtn.addEventListener('click', () => {
		modal.style.visibility = 'hidden';
		modal.style.opacity = 0;

		modalContainer.style.visibility = 'hidden';
		modalContainer.style.opacity = 0;
		modalContainer.style.marginTop = '6rem';
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
	if (localStorage.getItem('iNeedInForFallingSleep')) selectTimeForFallingSleep.value = localStorage.getItem('iNeedInForFallingSleep');

	selectTimeForFallingSleep.addEventListener('change', () => {
		localStorage.setItem('iNeedInForFallingSleep', selectTimeForFallingSleep.value);
	})

	/*****************
	 * 4. Calc cycle *
	 *****************/

	calcWithStartSleeping.addEventListener('click', () => {

	})

	calcWithNeedWakeUp.addEventListener('click', () => {

	})



})