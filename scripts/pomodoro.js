function setTime(timeAddition){
	currentTime = Date.parse(new Date());
	countdownTime = new Date(currentTime + timeAddition * 60 * 1000);
}

function formatTime(timeForInterval){
	var timerTime = Date.parse(countdownTime) - Date.parse(new Date());
	var seconds = Math.floor((timerTime / 1000)  % 60);
	var minutes = Math.floor((timerTime / (1000 * 60))  % 60);
	return {
		'timerTime': timerTime,
		'minutes': minutes,
		'seconds': seconds
	}
}

function startTimer(element,inputTime){
	if(pauseFlag){
		pauseFlag= false;
		countdownTime = new Date(Date.parse(new Date()) + timeLeft);
	}
	currentInterval = setInterval(function(){
		var timeInterval = formatTime(inputTime);
		element.textContent = timeInterval.minutes + ':' + timeInterval.seconds;
	}, 1000);
}

function pauseTimer(){
	if(!pauseFlag){
		pauseFlag = true;
		clearInterval(currentInterval);
		timeLeft = formatTime(countdownTime).timerTime;
	}
}

function stopTimer(){
	clearInterval(currentInterval);
	pauseFlag= false;
	customPomodoro.textContent = defaultPomodoroTime + ':00';
	customBreak.textContent = defaultBreakTime + ':00';
	displayTimer.textContent = defaultPomodoroTime + ':00';
}

function resetTimer(){
	clearInterval(currentInterval);
	pauseFlag= false;
	defaultPomodoroTime = 25;
	defaultbreakTime = 5;
	customPomodoro.textContent = defaultPomodoroTime + ':00';
	customBreak.textContent = defaultBreakTime + ':00';
	displayTimer.textContent = defaultPomodoroTime + ':00';
}
