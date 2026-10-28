
const counter = document.getElementById("counter");
const message = document.getElementById("message");
const loadingbar = document.getElementById("loading-bar");

let startTime = null;

const LOADING_DURATION_MS = 5000;

const messages = [
  "Preparing your space",
  "Bringing everything together",
  "Adding the finishing touches",
  "All set. Welcome in!"
];

const renderProcess = (percentage) => {
  const roundedPercentage = Math.floor(percentage);

  counter.textContent = roundedPercentage;

  loadingbar.style.width = `${roundedPercentage}%`;

  const messageIndex = Math.min(
    Math.floor(percentage / 25),
    messages.length - 1
  );

  message.textContent = messages[messageIndex];
};

const updateprocess = (timestamp) => {
  if (startTime === null) startTime = timestamp;

  const percentage = Math.min(
    ((timestamp - startTime) / LOADING_DURATION_MS) * 100,
    100
  );

  renderProcess(percentage);

  if (percentage < 100) {
    requestAnimationFrame(updateprocess);
  }
};

requestAnimationFrame(updateprocess);
