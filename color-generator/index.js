
const color = document.getElementById("colors");
const statusElement = document.getElementById("status");
const shufflePalettes = document.getElementById("shuffle-colors");

const lightness = [94, 86, 76, 64, 52, 43, 35, 27, 20, 12];
const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const families = [
  { name: "red", hue: 0, saturation: 85 },
  { name: "lime", hue: 82, saturation: 76 },
  { name: "sky", hue: 199, saturation: 90 },
  { name: "gray", hue: 220, saturation: 9 },
  { name: "zinc", hue: 240, saturation: 5 },
  { name: "stone", hue: 30, saturation: 6 },
  { name: "teal", hue: 174, saturation: 72 },
  { name: "cyan", hue: 189, saturation: 86 },
  { name: "blue", hue: 217, saturation: 88 },
  { name: "pink", hue: 330, saturation: 80 },
  { name: "rose", hue: 347, saturation: 86 },
  { name: "neutral", hue: 0, saturation: 0 },
  { name: "amber", hue: 40, saturation: 94 },
  { name: "orange", hue: 25, saturation: 92 },
  { name: "yellow", hue: 52, saturation: 90 },
  { name: "green", hue: 142, saturation: 68 },
  { name: "slate", hue: 215, saturation: 20 },
  { name: "indigo", hue: 239, saturation: 80 },
  { name: "violet", hue: 258, saturation: 84 },
  { name: "purple", hue: 271, saturation: 82 },
  { name: "emerald", hue: 160, saturation: 76 },
  { name: "fuchsia", hue: 292, saturation: 82 },
];

// Initial six color families
let selectedFamilies = [
  "red",
  "amber",
  "emerald",
  "sky",
  "violet",
  "pink",
].map((name) => families.find((family) => family.name === name));

// Convert HSL to HEX
const hslToHex = (hue, saturation, light) => {
  const l = light / 100;
  const s = saturation / 100;
  const amplitude = s * Math.min(l, 1 - l);

  const channel = (offset) => {
    const position = (offset + hue / 30) % 12;

    const value =
      l -
      amplitude *
        Math.max(-1, Math.min(position - 3, 9 - position, 1));

    return Math.round(255 * value)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${channel(0)}${channel(8)}${channel(4)}`.toUpperCase();
};

// Render color palettes
const renderColors = () => {
  color.innerHTML = "";

  selectedFamilies.forEach((family) => {
    const colorButtons = shades
      .map((shade, index) => {
        const hex = hslToHex(
          family.hue,
          family.saturation,
          lightness[index]
        );

        return `
          <button
            type="button"
            data-hex="${hex}"
            aria-label="Copy ${family.name} ${shade}: ${hex}"
            class="group min-w-0 cursor-pointer rounded-xl text-center"
          >
            <span
              style="background-color: ${hex}"
              class="block h-16 rounded-xl transition group-hover:-translate-y-1 group-hover:shadow-lg"
            ></span>

            <span class="mt-2 block text-xs font-medium tabular-nums text-zinc-300">
              ${shade}
            </span>

            <span class="mt-1 block pb-1 font-mono text-[9px] text-zinc-400">
              ${hex}
            </span>
          </button>
        `;
      })
      .join("");

    const template = `
      <section>
        <h2 class="mb-3 text-sm font-semibold capitalize text-zinc-200">
          ${family.name}
        </h2>

        <div class="grid grid-cols-5 gap-2 sm:gap-3 lg:grid-cols-10">
          ${colorButtons}
        </div>
      </section>
    `;

    color.innerHTML += template;
  });
};

// Shuffle six unique color families
const shuffleColors = () => {
  const shuffled = [...families];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  selectedFamilies = shuffled.slice(0, 6);

  renderColors();
  statusElement.textContent = "New palettes generated.";
};

// Copy HEX to clipboard
const copyHex = async (hex) => {
  try {
    await navigator.clipboard.writeText(hex);
    statusElement.textContent = `Copied ${hex} to clipboard!`;
  } catch (error) {
    statusElement.textContent =
      "Copy failed. Use localhost or HTTPS.";
    console.error("Clipboard error:", error);
  }
};

// Shuffle button
shufflePalettes.addEventListener("click", shuffleColors);

// Event delegation for generated color buttons
color.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-hex]");

  if (!button || !color.contains(button)) return;

  copyHex(button.dataset.hex);
});

// Initial render
renderColors();
