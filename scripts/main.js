let session = 25;
let breakSession = 5;
let timeNow;
let timerTime;
let intervalCount = 0;
let interval;


// functions
function setTime(input){
	timeNow = Date.parse(new Date());
	timerTime = new Date(timeNow + input * 60 * 1000);
}

function formatTime(inputTime){
	let time = Date.parse(inputTime) - Date.parse(new Date());
	let minutes = Math.floor((time / (1000 * 60)) % 60);
	let seconds = Math.floor((time / 1000) % 60);
	return {
		'time': time,
		'minutes': minutes,
		'seconds': seconds,
	}
}

function timer(element, inputTime){
	interval = setInterval(function(){
		let format = formatTime(inputTime);
		element.textContent = ((format.minutes < 10)? '0' + format.minutes : format.minutes) +
			':' + ((format.seconds < 10)? '0' + format.seconds : format.seconds);
		if(formatTime(inputTime).time <= 0){
			clearInterval(interval);
			intervalCount += 1;
			if(intervalCount < 4){
				if(intervalCount % 2 !== 0){
					setTime(breakSession);
					timer(displayTimer, timerTime);
				}else{
					setTime(session);
					timer(displayTimer, timerTime);
				}
			}
		}
	}, 1000);
}

function setAndStrat(session){
	setTime(session);
	timer(displayTimer, timerTime);
}

function displayTimes(){
	pomodoroTime.textContent = ((session < 0) ? '0' + session : session) + ':00';
	breakTime.textContent = ((breakSession < 0) ? '0' + breakSession : breakSession) + ':00';
	displayTimer.textContent = ((session < 0) ? '0' + session : session) + ':00';
}

function stopAndClear(){
	clearInterval(interval)
	intervalCount = 0;
	displayTimes()
}
// Select Nodes
let pomodoroTime = document.getElementById('pomodoro-time');
let breakTime = document.getElementById('break-time');
let displayTimer = document.getElementById('display-time');
displayTimes()
// Select Button Nodes
let startBtn = document.getElementById('start-control');
let pauseBtn = document.getElementById('pause-control');;
let stopBtn = document.getElementById('stop-control');;
let resetBtn = document.getElementById('reset-control');;
let changeMinuteBtns = document.querySelectorAll('.change-minute');
// Fire up buttons
startBtn.addEventListener('click', () => {
	setAndStrat(session);
});

pauseBtn.addEventListener('click', () => {
	alert('Hello!')
});

stopBtn.addEventListener('click', () => {
	stopAndClear();
});

resetBtn.addEventListener('click', () => {
	session = 25;
	breakSession = 5;
	stopAndClear();	
});

// Adding/substracting minutes to default pomodoro/break
changeMinuteBtns.forEach((button) => {
	button.addEventListener('click', (e) => {
	// Don't wanna over 60 min, pomodoro is for high focus work
	if(session >= 60){
		if(button === changeMinuteBtns[0]){
			alert('High focus work over 60 minuts it is not productive!');
			return;
		}
	}
	if(session <= 1){
		if(button === changeMinuteBtns[1]){
			alert('Nice try!')
			return;
		}
	}
	// Don't wanna break session over 25 minutes
	if(breakSession >= 25){
		if(button === changeMinuteBtns[2]){
			alert('To much break time, focus on your work!!!');
			return;
		}
	}
	if(breakSession <= 1){
		if(button === changeMinuteBtns[3]){
			alert('Nice try!')
			return;
		}
	}
	// Accessing buttuns in node list with position index
	if(button === changeMinuteBtns[0]){
		session += 1;
	}else if(button === changeMinuteBtns[1]){
		session -= 1;
	}else if(button === changeMinuteBtns[2]){
		breakSession += 1;
	}else{
		breakSession -=1;
	}
	// Displaying new values
	displayTimes()
	});
});