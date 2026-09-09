// SORU JS

function Soru(soruMetni, cevapSecenekleri, dogruCevap) {
  this.soruMetni = soruMetni;
  this.cevapSecenekleri = cevapSecenekleri;
  this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function (cevap) {
  return cevap === this.dogruCevap;
};

const soruListesi = [
  new Soru(
    "1-Hangisi JavaScript paket yönetim uygulamasıdır?",
    { a: "Node.js", b: "TypeScript", c: "Nuhet", d: "Npm" },
    "d",
  ),
  new Soru(
    "2-Hangisi Frontend kapsamında değerlendirilmez?",
    { a: "css", b: "html", c: "js", d: "sql" },
    "d",
  ),
  new Soru(
    "3-Hangisi Backend kapsamında değerlendirilir?",
    { a: "Node.js", b: "Typescript", c: "angular", d: "react" },
    "a",
  ),
  new Soru(
    "4-Hangisi Javascript programlama dilini kullanmaz?",
    { a: "react", b: "angular", c: "vuejs", d: "asp.net" },
    "d",
  ),
];

// QUİZ JS

function Quiz(sorular) {
  this.soruIndex = 0;
  this.sorular = sorular;
  this.dogruCevapSayisi = 0;
}

Quiz.prototype.soruGetir = function () {
  return this.sorular[this.soruIndex];
};

// Uİ JS

function UI() {
  this.quiz_box = document.querySelector("#quiz-box");
  this.button_box = document.querySelector("#button-box");
  this.body = document.querySelector("#quiz-box #body");
  this.correctIcon = `<i class="bi bi-check-circle"></i>`;
  this.incorrectIcon = `<i class="bi bi-x-circle"></i>`;
  this.btnNext = document.querySelector(".btn-next");
  this.btnReplay = document.querySelector(".btn-replay");
  this.btnQuit = document.querySelector(".btn-quit");
  this.startButton = document.querySelector(".btn-start");
  this.score_box = document.querySelector("#score-box");
  this.timetext = document.querySelector(".time-text");
  this.timesecond = document.querySelector(".time-second");
  this.timeline = document.querySelector(".timeline");
}

UI.prototype.soruGoster = function (soru) {
  this.body.innerHTML = "";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("question-title");
  title.textContent = soru.soruMetni;

  const optionList = document.createElement("div");
  optionList.classList.add("option-list");

  for (let [key, value] of Object.entries(soru.cevapSecenekleri)) {
    const option = document.createElement("div");
    option.classList.add("option");
    option.addEventListener("click", optionSelected);

    const span = document.createElement("span");
    span.textContent = key + ") " + value;

    option.appendChild(span);
    optionList.appendChild(option);
  }
  cardBody.appendChild(title);
  cardBody.appendChild(optionList);

  this.body.appendChild(cardBody);
};

UI.prototype.disableAllOption = function () {
  const options = document.querySelectorAll(".option");
  for (let option of options) {
    option.classList.add("disabled");
  }
};

UI.prototype.soruSayisiGoster = function (soruSirasi, toplamSoru) {
  const etiket = `<span class="badge text-bg-danger">${soruSirasi} / ${toplamSoru}</span>`;
  document.querySelector(".question-index").innerHTML = etiket;
};

UI.prototype.scoreGoster = function (dogruCevapSayisi, toplamSoru) {
  const etiket = `Toplam ${toplamSoru} soruda ${dogruCevapSayisi} doğru cevap verdiniz.`;
  document.querySelector(".score-text").innerHTML = etiket;
};

// APP JS

const quiz = new Quiz(soruListesi);
const ui = new UI();

ui.btnNext.addEventListener("click", function () {
  if (quiz.sorular.length != quiz.soruIndex) {
    startTimer(10);
    startTimeLine();

    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btnNext.classList.remove("show");

    console.log(quiz);
  } else {
    ui.score_box.classList.add("active");
    ui.quiz_box.classList.remove("active");
    ui.scoreGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
  }
});

ui.startButton.addEventListener("click", function () {
  startTimer(10);
  startTimeLine();
  ui.quiz_box.classList.add("active");
  ui.button_box.classList.remove("active");
  ui.soruGoster(quiz.soruGetir());
  ui.soruSayisiGoster(quiz.soruIndex + 1, quiz.sorular.length);
  ui.btnNext.classList.remove("show");
});

function optionSelected(e) {
  clearInterval(counter);
  clearInterval(counterline);

  const cevap = e.target.textContent[0];
  const soru = quiz.soruGetir();

  let selectedElement = e.target;

  if (selectedElement.nodeName == "SPAN") {
    selectedElement = selectedElement.parentElement;
  }

  if (soru.cevabiKontrolEt(cevap)) {
    quiz.dogruCevapSayisi += 1;
    selectedElement.classList.add("correct");
    selectedElement.insertAdjacentHTML("beforeend", ui.correctIcon);
  } else {
    selectedElement.classList.add("incorrect");
    selectedElement.insertAdjacentHTML("beforeend", ui.incorrectIcon);
  }
  quiz.soruIndex += 1;
  ui.disableAllOption();
  ui.btnNext.classList.add("show");
}

ui.btnQuit.addEventListener("click", function () {
  window.location.reload();
});

ui.btnReplay.addEventListener("click", function (e) {
  quiz.soruIndex = 0;
  quiz.dogruCevapSayisi = 0;

  ui.startButton.click();
  ui.score_box.classList.remove("active");
});

let counter;

function startTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    ui.timesecond.textContent = time;
    time--;

    if (time < 0) {
      clearInterval(counter);
      ui.timetext.textContent = "Süre bitti.";

      ui.btnNext.classList.add("show");

      ui.disableAllOption();
      quiz.soruIndex += 1;
    }
  }
}

let counterline;
function startTimeLine() {
  let line_Width = 0;

  counterline = setInterval(timer, 20);

  function timer() {
    line_Width += 1;

    ui.timeline.style.width = line_Width + "px";

    if (line_Width > 549) {
      clearInterval(counterline);
    }
  }
}
