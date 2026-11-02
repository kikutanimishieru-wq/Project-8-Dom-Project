const marker = document.getElementById("marker");
const numberContainer = document.getElementById("number");

const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");

// Create 60 clock markers
for (let i = 0; i < 60; i++) {
  const markerDiv = document.createElement("div");

  markerDiv.className = "absolute inset-0";
  markerDiv.style.transform = `rotate(${i * 6}deg)`;

  const tick = document.createElement("span");

  const tickType =
    i % 5 === 0 ? "w-0.5 h-3 bg-gray-500" : "w-px h-1.5 bg-slate-400";

  tick.className = `absolute left-1/2 top-2 -translate-x-1/2 ${tickType}`;

  markerDiv.appendChild(tick);
  marker.appendChild(markerDiv);
}

// Create 12 clock numbers
for (let i = 1; i <= 12; i++) {
  const numberDiv = document.createElement("span");

  numberDiv.textContent = i;

  const angle = (i * Math.PI) / 6;

  numberDiv.className =
    "absolute -translate-x-1/2 -translate-y-1/2 text-lg font-medium";

  numberDiv.style.left = `${50 + 40 * Math.sin(angle)}%`;
  numberDiv.style.top = `${50 - 40 * Math.cos(angle)}%`;

  numberContainer.appendChild(numberDiv);
}

// Update clock hands
const runtime = () => {
  const now = new Date();

  const ms = now.getMilliseconds();
  const seconds = now.getSeconds() + ms / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = now.getHours() + minutes / 60;

  hour.style.transform = `rotate(${(hours % 12) * 30}deg)`;
  minute.style.transform = `rotate(${minutes * 6}deg)`;
  second.style.transform = `rotate(${seconds * 6}deg)`;

  requestAnimationFrame(runtime);
};

runtime();
