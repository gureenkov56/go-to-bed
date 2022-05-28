document.addEventListener('DOMContentLoaded', () => {

	const
		deepZone = document.getElementById('deepZone'),
		shortWakeUpZone = document.getElementById('shortWakeUpZone'),
		currentCycle = document.getElementById('currentCycle'),
		fallBlock = document.getElementById('fallBlock')
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
})