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
	deepZone.addEventListener('click', (event) => sleepZones('Глубокий восстановительный сон', event.target));
	fallBlock.addEventListener('click', (event) => sleepZones('Погружение в сон', event.target));


	function sleepZones(text, eventTarget) {
		console.log(currentCycle);
		currentCycle.innerHTML = text;
		currentCycle.style.backgroundColor = window.getComputedStyle(eventTarget).backgroundColor;;
	}
})