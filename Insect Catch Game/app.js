const screens = document.querySelectorAll(".screen");
const insect_catch_btn = document.querySelectorAll(".choose-insect-btn");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const start_btn = document.getElementById("start-btn");
const message = document.getElementById("message");
const game_container = document.getElementById("game-container");
let score = 0;
let second = 0;
let selected_insect = {};

start_btn.addEventListener("click", () => screens[0].classList.add("up"));

insect_catch_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");

    selected_insect = { src, alt };

    screens[1].classList.add("up");
    setTimeout(createInsect, 1000);
    startGame();
  });
});

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(second / 60);
  let s = second % 60;

  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;

  timeEl.innerHTML = `Time : ${m}:${s}`;
  second++;
}
function createInsect() {
  const insect = document.createElement("div");
  insect.classList.add("insect");
  const { x, y } = createRandomPlace();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `<img src="${selected_insect.src}" alt="${
    selected_insect.alt
  }" style="transform: rotate(${Math.random() * 360}deg)" />`;

  insect.addEventListener("click", catchInsect);
  game_container.appendChild(insect);
}

function createRandomPlace() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;

  return { x, y };
}

function catchInsect() {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove(), 2000);
  addInsect();
}

function addInsect() {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}
function increaseScore() {
  score++;
  if (score > 19) {
    message.classList.add("visible");
  }

  scoreEl.innerHTML = `Score : ${score}`;
}
