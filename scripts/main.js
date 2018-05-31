let session = 25;
let breakSession = 5;
let timeNow;
let timerTime;
let intervalCount = 0;

// functions
function setTime(input){
	timeNow = Date.parse(new Date());
	timerTime = new Date(timeNow + input * 60 * 1000);
}

function formatTime(inputTime){
	var time = Date.parse(inputTime) - Date.parse(new Date());
	var minutes = Math.floor((time / (1000 * 60)) % 60);
	var seconds = Math.floor((time / 1000) % 60);
	return {
		'time': time,
		'minutes': minutes,
		'seconds': seconds,
	}
}

function timer(element, inputTime){
	let interval = setInterval(function(){
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
// Select Nodes
let pomodoroTime = document.getElementById('pomodoro-time');
let breakTime = document.getElementById('break-time');
let displayTimer = document.getElementById('display-time');

let startBtn = document.getElementById('start-control');
// Nodes modifiaers
pomodoroTime.textContent = ((session < 0) ? '0' + session : session) + ':00';
breakTime.textContent = ((breakSession < 0) ? '0' + breakSession : breakSession) + ':00';
displayTimer.textContent = ((session < 0) ? '0' + session : session) + ':00';

startBtn.addEventListener('click', () => {
	setAndStrat(session);
});







// Set up custom session buttons
// Adding/substracting minutes to default pomodoro/break
var changeMinuteBtns = document.querySelectorAll('.change-minute');
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
	pomodoroTime.textContent = ((session < 0) ? '0' + session : session) + ':00';
	breakTime.textContent = ((breakSession < 0) ? '0' + breakSession : breakSession) + ':00';
	displayTimer.textContent = ((session < 0) ? '0' + session : session) + ':00';
	});
});