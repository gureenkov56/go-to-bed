document.addEventListener('DOMContentLoaded', () => {

	const
		deepZone = document.getElementById('deepZone'),
		shortWakeUpZone = document.getElementById('shortWakeUpZone'),
		currentCycle = document.getElementById('currentCycle'),
		fallBlock = document.getElementById('fallBlock'),
		modal = document.querySelector('.modal'),
		openSettingModalBtn = document.querySelectorAll('.open-setting-modal'),
		modalContainer = document.querySelector('.modal__container'),
		modalCloseBtn = document.querySelector('.modal__close')
		;

	/***************
	 * Sleep zones *
	 ***************/
	shortWakeUpZone.addEventListener('click', (event) => sleepZones('Незаметные короткие пробуждения', event.target));
	shortWakeUpZone.addEventListener('mouseover', (event) => sleepZones('Незаметные короткие пробуждения', event.target));

	deepZone.addEventListener('click', (event) => sleepZones('Глубокий восстановительный сон', event.target));
	deepZone.addEventListener('mouseover', (event) => sleepZones('Глубокий восстановительный сон', event.target));

	fallBlock.addEventListener('click', (event) => sleepZones('Погружение в сон', event.target));
	fallBlock.addEventListener('mouseover', (event) => sleepZones('Погружение в сон', event.target));



	function sleepZones(text, eventTarget) {
		currentCycle.innerHTML = text;
		currentCycle.style.backgroundColor = eventTarget.dataset.color ? eventTarget.dataset.color : window.getComputedStyle(eventTarget).backgroundColor;
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
})