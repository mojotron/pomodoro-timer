var defaultPomodoroTime = 25;
var defaultBreakTime = 5;

var currentInterval;

var currentTime;
var countdownTime;

var pauseFlag = false;
var timeLeft;

var pomodoroOrBreak = false;
////////////////////////////////////////////////////////////////////////////////////
var displayTimer = document.querySelector('#display-time');
displayTimer.textContent = defaultPomodoroTime + ':00';
// Start button
var startBtn = document.querySelector('#start-control');
startBtn.addEventListener('click', () => {
	setTime(defaultPomodoroTime);
	startTimer(displayTimer,countdownTime);
});
// Pause button
var pauseBtn = document.querySelector('#pause-control');
pauseBtn.addEventListener('click', () => {
	pauseTimer();
});
// Stop button
var stopBtn = document.querySelector('#stop-control');
stopBtn.addEventListener('click', () => {
	stopTimer();
});
//reset button
var resetBtn = document.querySelector('#reset-control');
resetBtn.addEventListener('click', () => {
	resetTimer();
});

// Set up custom session buttons
var customPomodoro = document.querySelector('#pomodoro-time');
customPomodoro.textContent = defaultPomodoroTime + ':00';
var customBreak = document.querySelector('#break-time');
customBreak.textContent = defaultBreakTime + ':00';
// Adding/substracting minutes to default pomodoro/break
var changeMinuteBtns = document.querySelectorAll('.change-minute');
changeMinuteBtns.forEach((button) => {
	button.addEventListener('click', (e) => {
	// Don't wanna over 60 min, pomodoro is for high focus work
	if(defaultPomodoroTime >= 60){
		if(button === changeMinuteBtns[0]){
			alert('High focus work over 60 minuts it is not productive!');
			return;
		}
	}
	if(defaultPomodoroTime <= 1){
		if(button === changeMinuteBtns[1]){
			alert('Nice try!')
			return;
		}
	}
	// Don't wanna break session over 25 minutes
	if(defaultBreakTime >= 25){
		if(button === changeMinuteBtns[2]){
			alert('To much break time, focus on your work!!!');
			return;
		}
	}
	if(defaultBreakTime <= 1){
		if(button === changeMinuteBtns[3]){
			alert('Nice try!')
			return;
		}
	}
	// Accessing buttuns in node list with position index
	if(button === changeMinuteBtns[0]){
		defaultPomodoroTime += 1;
	}else if(button === changeMinuteBtns[1]){
		defaultPomodoroTime -= 1;
	}else if(button === changeMinuteBtns[2]){
		defaultBreakTime += 1;
	}else{
		defaultBreakTime -=1;
	}
	// Displaying new values
	customPomodoro.textContent = defaultPomodoroTime + ':00';
	customBreak.textContent = defaultBreakTime + ':00';
	displayTimer.textContent = defaultPomodoroTime + ':00';
	});
});