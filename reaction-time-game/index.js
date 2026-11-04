const Reaction = document.getElementById("Reaction-panel");
const panel = document.getElementById("panel-text");
const panel1 = document.getElementById("panel-text1");
const panel2 = document.getElementById("panel-icon");
const last= document.getElementById("Last-attempt") 
const Best= document.getElementById("Best-attempt") 
let state = "ready";
let timer;
let startTime;
let best= null;

const changeText = (message, icon, fontSize, title, color) => {
  panel1.textContent = message;
  panel2.textContent = icon;
  panel2.style.fontSize = fontSize;
  panel.textContent = title;
  panel1.style.color = color;
  panel2.style.color = color;
  panel.style.color = color;
};

const panelcolor = () => {
  state = "waiting";

  Reaction.classList.remove("bg-[#27272A]", "bg-lime-200");
  Reaction.classList.add("bg-rose-950");

  changeText("Not yet. Stay ready.", "…", "48px", "Wait for green", "white");

  timer = setTimeout(panel1color, 3000);
};

const panel1color = () => {
  state = "go";

  Reaction.classList.remove("bg-rose-950");
  Reaction.classList.add("bg-lime-200");

startTime= performance.now() 

  changeText("Go, go, go!", "!", "48px", "Click now!", "black");
};

const panelcolor2 = () => {
  state = "result";

  Reaction.classList.remove("bg-lime-200");
  Reaction.classList.add("bg-[#27272A]");

  const ms = Math.round(performance.now() - startTime)
  best = !best ? ms : Math.min(ms, best)
  Best.textContent= `${best}ms`
  last.textContent= `${ms}ms`
  changeText("Click to play again", "✓", "48px", `${reactionTime} ms`, "white");
};

const panelcolor3 = () => {
  clearTimeout(timer);

  state = "result";

  Reaction.classList.remove("bg-rose-950");
  Reaction.classList.add("bg-[#27272A]");

  changeText("Click to try again", "↻", "48px", "Too soon", "white");
};

Reaction.addEventListener("click", () => {
  if (state === "ready" || state === "result") {
    panelcolor();
  } else if (state === "waiting") {
    panelcolor3();
  } else if (state === "go") {
    panelcolor2();
  }
});
