const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const status = document.getElementById("status");
const displayHours = document.getElementById("hours");
const displayMinutes = document.getElementById("minutes");
const displaySeconds = document.getElementById("seconds");

let intervalId;
let startTime = 0;
const formatTime = (startTime) => {
  const seconds = Math.floor(startTime % 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((startTime % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const hours = Math.floor(startTime / 3600)
    .toString()
    .padStart(2, "0");

  displayHours.textContent = hours;
  displayMinutes.textContent = minutes;
  displaySeconds.textContent = seconds;
};

const startTimer = () => {
  intervalId = setInterval(() => {
    startTime++;
    formatTime(startTime);
  }, 1000);

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;

  status.textContent = "Running";
};

const stopTimer = () => {
  clearInterval(intervalId);

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = false;

  status.textContent = "Paused";
  startBtn.textContent = "Resume";
};

const resetTimer = () => {
clearInterval(intervalId);
  startTime = 0;
  formatTime(startTime);

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;

  status.textContent = "Ready";
  startBtn.textContent = "Start";
};

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
