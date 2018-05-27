// Set up custom session
var customPomodoro = document.querySelector('#pomodoro-time');
customPomodoro.textContent = defaultPomodoro + ':00';
var customBreak = document.querySelector('#break-time');
customBreak.textContent = defaultBreak + ':00';
// Adding/substracting minutes to default pomodoro/break
var changeMinuteBtns = document.querySelectorAll('.change-minute');
changeMinuteBtns.forEach((button) => {
	button.addEventListener('click', (e) => {
	// Don't wanna negative time
		if(defaultPomodoro <= 0 || defaultBreak <= 0){
			if(button.textContent === '-'){
				return;
			}
		}
		// Don't wanna over 60 min, pomodoro is for high focus work
		if(defaultPomodoro >= 60){
			if(button === changeMinuteBtns[0]){
				alert('High focus work over 60 minuts it is not productive!');
				return;
			}
		}
		// Don't wanna break session over 20 minutes
		if(defaultBreak >= 20){
			if(button === changeMinuteBtns[2]){
				alert('To much break time, focus on your work!!!');
				return;
			}
		}
		// Accessing buttuns in node list with position index
		if(button === changeMinuteBtns[0]){
			defaultPomodoro += 1;
		}else if(button === changeMinuteBtns[1]){
			defaultPomodoro -= 1;
		}else if(button === changeMinuteBtns[2]){
			defaultBreak += 1;
		}else{
			defaultBreak -=1;
		}
		// Displaying new values
		customPomodoro.textContent = defaultPomodoro + ':00';
		customBreak.textContent = defaultBreak + ':00';
		timeCountown.textContent = defaultPomodoro + ':00';
	});
});