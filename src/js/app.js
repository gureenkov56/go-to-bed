/*********************
 *        app.js
 *
 * 1. Sleep zone
 * 2. Open Setting Modal
 * 3. Time
 * 4. Calc cycle
 * 5. Content modal
 * 6. Service Worker reg
 * 7. Calc type to wake up time
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
        h2 = document.querySelector('.perfect-time__h2'),
        otherTimeH4 = document.getElementById('otherTimeH4'),

        calcWithStartSleeping = document.getElementById('calcWithStartSleeping'),
        selectTimeForFallingSleep = document.getElementById('selectTimeForFallingSleep'),
        closeModalBtns = document.querySelectorAll('.close-modal-btn'),
        perfectTimeIfText = document.getElementById('perfectTimeIfText'),

        perfectHours = document.getElementById('perfectHours'),
        perfectMinutes = document.getElementById('perfectMinutes'),
        perfectTimeIfSpan = document.getElementById('perfectTimeIfSpan'),
        perfectTimeIf = document.getElementById('perfectTimeIf'),
        iGoToBedNow = document.getElementById('iGoToBedNow'),

        startSleepOnGraphic = document.getElementById('startSleepOnGraphic'),
        activeDotAll = document.querySelectorAll('.active-dot'),
        widthOfOneCycle = 180,
        startSleepOnGraphicDefaultMinWidth = parseInt(window.getComputedStyle(startSleepOnGraphic).minWidth),

        openPostModalAll = document.querySelectorAll('.open-post-modal'),
        postModal = document.getElementById('postModal'),
        closePostModal = document.getElementById('closePostModal'),
        dreamShowZone = document.getElementById('dreamShowZone'),

        calcTypeWakeUpTime = document.getElementById('calcTypeWakeUpTime'),
        calcTypeGoToBedTime = document.getElementById('calcTypeGoToBedTime'),
        otOrK = document.getElementById('otOrK'),
        easyWakeUpWrapper = document.querySelector('.easy-wake-up__wrapper'),
        timeList = document.querySelector('.time-list')
    ;

    let
        timeForFallingDown = localStorage.getItem('timeForFallingDown') ? localStorage.getItem('timeForFallingDown') : 15,
        timeForCalc = null,
        timeWasSetted = false,
        isCalculateToTime = false
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

    dreamShowZone.addEventListener('click', (event) => sleepZones('Снятся сны', event.target));
    dreamShowZone.addEventListener('mouseover', (event) => sleepZones('Снятся сны', event.target));


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
    if (localStorage.getItem('timeForCalc')) {
        inputStartSleeping.value = localStorage.getItem('timeForCalc');
        btnSpanStartSleeping.innerHTML = inputStartSleeping.value;
    }

    inputStartSleeping.addEventListener('change', () => {
        btnSpanStartSleeping.innerHTML = inputStartSleeping.value;
    })

    // I need in X time for falling sleep
    if (localStorage.getItem('timeForFallingDown')) {
        selectTimeForFallingSleep.value = localStorage.getItem('timeForFallingDown');
        timeForFallingDown = selectTimeForFallingSleep.value;
    }

    selectTimeForFallingSleep.addEventListener('change', () => {
        localStorage.setItem('timeForFallingDown', selectTimeForFallingSleep.value);
        timeForFallingDown = selectTimeForFallingSleep.value;
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

            calcCycle(timeForCalc);
        })
    })

    function calcCycle(goToBedTime = null) {


        let currentTime = new Date;

        if (goToBedTime != null) {
            let goToBedHour = Number(goToBedTime.split(':')[0]),
                goToBedMinutes = Number(goToBedTime.split(':')[1]);

            currentTime.setHours(goToBedHour);
            currentTime.setMinutes(goToBedMinutes);
        }

        let perfectHoursFormat = null;
        let perfectMinutesFormat = null;

        drowCycleGraphic(currentTime);
        if (isCalculateToTime) {
            currentTime.setMinutes(currentTime.getMinutes() - Number(timeForFallingDown));
            easyWakeUpWrapper.style.flexDirection = 'row-reverse';
            timeList.classList.add('reverse');
        } else {
            currentTime.setMinutes(currentTime.getMinutes() + Number(timeForFallingDown));
            easyWakeUpWrapper.style.flexDirection = 'row';
            timeList.classList.remove('reverse');
        }


        for (let i = 1; i < 7; i++) {
            if (isCalculateToTime) {
                currentTime.setMinutes(currentTime.getMinutes() - 90);
            } else {
                currentTime.setMinutes(currentTime.getMinutes() + 90);
            }

            if (i === 5) {
                perfectHoursFormat = formatTime(currentTime.getHours());
                perfectMinutesFormat = formatTime(currentTime.getMinutes());
            }

            let timeOfCycleEndingIArr = document.querySelectorAll(`.timeOfCycleEnding${i}`);

            timeOfCycleEndingIArr.forEach(el => {
                el.innerHTML = formatTime(currentTime.getHours()) + ':' + formatTime(currentTime.getMinutes());
            })

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

    function formatTime(number) {
        if (Number(number) < 10) {
            return '0' + number;
        } else {
            return number;
        }
    }

    function drowCycleGraphic(startSleepDate) {
        fallBlock.style.minWidth = timeForFallingDown * 2 + 'px';
        shortWakeUpZone.style.left = timeForFallingDown * 2 + 130 + 'px';
        dreamShowZone.style.left = timeForFallingDown * 2 + 480 + 'px';
        deepZone.style.left = timeForFallingDown * 2 + 'px';
        activeDotAll.forEach(dot => {
            dot.style.left = (widthOfOneCycle * (dot.classList[1][4] - 1) + (timeForFallingDown * 2)) + "px";
        })
        startSleepOnGraphic.innerHTML = formatTime(startSleepDate.getHours()) + ":" + formatTime(startSleepDate.getMinutes());
        startSleepOnGraphic.style.minWidth = (startSleepOnGraphicDefaultMinWidth + timeForFallingDown * 2) + 'px';
    }

    calcWithStartSleeping.addEventListener('click', () => {
        timeForCalc = inputStartSleeping.value;
        localStorage.setItem('timeForCalc', timeForCalc);
        perfectTimeIf.classList.remove('d-none');
        perfectTimeIfSpan.innerHTML = timeForCalc;

        if (calcTypeWakeUpTime.classList.contains('active')) {
            h2.innerHTML = 'Идеальное время пойти в кроватку';
            perfectTimeIfText.innerHTML = 'чтобы проснуться в';
            otherTimeH4.innerHTML = 'Также можно лечь спать...';
        } else {
            h2.innerHTML = 'Идеальное время пробуждения';
            perfectTimeIfText.innerHTML = 'если лечь спать в';
            otherTimeH4.innerHTML = 'Также легко проснуться в...';
        }

        calcCycle(timeForCalc);
    })

    iGoToBedNow.addEventListener('click', () => {
        perfectTimeIf.classList.add('d-none');
        timeForCalc = null;
        calcCycle(timeForCalc);
    })


    /********************
     * 5. Content modal *
     ********************/

    let lastOpenedPost = null;

    openPostModalAll.forEach(openPostModal => {
        openPostModal.addEventListener('click', () => {
            postModal.style.top = '10%';
            document.body.style.overflow = 'hidden';

            const lastPostId = openPostModal.dataset.postId;
            lastOpenedPost = document.getElementById(lastPostId);
            lastOpenedPost.classList.remove('d-none');
            lastOpenedPost.style.visibility = 'visible';
            setTimeout(() => {
                lastOpenedPost.style.opacity = 1;
            }, 100);
        })
    })

    closePostModal.addEventListener('click', () => {
        postModal.style.top = '100%';
        document.body.style.overflow = 'auto';
        lastOpenedPost.style.opacity = 0;
        setTimeout(() => {
            lastOpenedPost.classList.add('d-none');
            lastOpenedPost.style.visibility = 'hidden';
        }, 500);
    })


    setInterval(() => {
        calcCycle(timeForCalc);
    }, 60000);

    calcCycle(timeForCalc);

    /*****
     * 6. ServiceWorker reg *
     */

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceWorker.js');
    }

    /******************
     * 7. Calc type to wake up time
     */

    calcTypeWakeUpTime.addEventListener('click', () => {
        calcTypeWakeUpTime.classList.add('active');
        calcTypeGoToBedTime.classList.remove('active');
        localStorage.setItem('calcType', 'calcToWakeUpTime');
        otOrK.innerHTML = 'к';
        isCalculateToTime = true;
    });

    calcTypeGoToBedTime.addEventListener('click', () => {
        calcTypeGoToBedTime.classList.add('active');
        calcTypeWakeUpTime.classList.remove('active');
        localStorage.setItem('calcType', 'calcByGoToBedTime');
        otOrK.innerHTML = 'от';
        isCalculateToTime = false;
    });



	/********
	 * 7. Set dark/light mode
	 */

	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// dark mode
		document.body.classList.add('dark');

		// safari top bar on mobile
		const safariBar = document.querySelector('[name="apple-mobile-web-app-status-bar-style"]');
		safariBar.content = '#092552';

		// theme color meta
		const themeColor = document.querySelector('[name="theme-color"]');
		themeColor.content = '#092552';
	}
})