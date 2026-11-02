const Reaction = document.getElementById("Reaction-panel");
const panel = document.getElementById("panel-text");

const panel1 = document.getElementById("panel-text1");
const panel2 = document.getElementById("panel-icon");

let state = "ready";
let timer;

const changeText = (message, message1, message1fontsize, message2) => {
  panel1.textContent = message;
  panel2.textContent = message1;
  panel.textContent = message2;
  panel2.style.fontsize = message1fontsize;
  panel1.style.color= message2

};

const panelcolor = () => {
  state = "waiting";
  Reaction.classList.remove("bg-[#27272A]");
  Reaction.classList.add("bg-rose-950");

  timer = setTimeout(panel1color, 3000);

  changeText("Not yet. Stay ready.", "…", "48px", "Wait for green");
};

const panel1color = () => {
  state = "go";
  Reaction.classList.remove("bg-rose-950");
  Reaction.classList.add("bg-lime-200");

  changeText("Go, go, go!", "!", "Click now!");
};

const panelcolor2 = () => {
  state = "result";
  Reaction.classList.remove("bg-lime-200");
  Reaction.classList.add("bg-[#27272A]");

  changeText("Click to play again", "✓", "36833");
};

const panelcolor3 = () => {
  state = "result";
  changeText("Click to try again", "↻", "Too soon");
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
