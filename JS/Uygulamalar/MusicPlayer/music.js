// CLASSES

class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }

  getName() {
    return this.title + " - " + this.singer;
  }
}

const musicList = [
  new Music("Boşver", "Nilüfer", "1.jpeg", "1.mp3"),
  new Music("Bu Da Geçer mi Sevgilim", "Yalın", "2.jpeg", "2.mp3"),
  new Music("Aramızda Uçurumlar", "Suat Suna", "3.jpeg", "3.mp3"),
];

// MusicPlayer.js

class MusicPlayer {
  constructor(musicList) {
    this.musicList = musicList;
    this.index = 0;
  }
  getMusic() {
    return this.musicList[this.index];
  }
  next() {
    if (this.index + 1 < this.musicList.length) {
      this.index++;
    } else {
      this.index = 0;
    }
  }
  previous() {
    if (this.index != 0) {
      this.index--;
    } else {
      this.index = this.musicList.length - 1;
    }
  }
}

// app.js
const container = document.querySelector(".container");
const image = document.querySelector("#music-img");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");

const player = new MusicPlayer(musicList);

window.addEventListener("load", function () {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayNow();
});

function displayMusic(music) {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
}

play.addEventListener("click", function () {
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", function () {
  prevMusic();
});
next.addEventListener("click", function () {
  nextMusic();
});

function pauseMusic() {
  container.classList.remove("playing");
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
}

function playMusic() {
  container.classList.add("playing");
  play.querySelector("i").classList = "fa-solid fa-pause";
  audio.play();
}

function prevMusic() {
  player.previous();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayNow();
}
function nextMusic() {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayNow();
}

audio.addEventListener("loadedmetadata", function () {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", function () {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});

function calculateTime(totalSecond) {
  const dakika = Math.floor(totalSecond / 60);
  const saniye = Math.floor(totalSecond % 60);
  const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
  const sonuc = `${dakika}:${guncellenenSaniye}`;
  return sonuc;
}

let muteState = "non-muted";
volume.addEventListener("click", function () {
  if (muteState == "non-muted") {
    audio.muted = true;
    muteState = "muted";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    muteState = "non-muted";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});

volumeBar.addEventListener("input", function (e) {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    muteState = "muted";
    audio.muted = true;
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    muteState = "non-muted";
    audio.muted = false;
    volume.classList = "fa-solid fa-volume-high";
  }
});

progressBar.addEventListener("input", function () {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

function displayMusicList(list) {
  for (let i = 0; i < list.length; i++) {
    let li = `<li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                    <span>${list[i].getName()}</span>
                    <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                    <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
                </li>`;

    ul.insertAdjacentHTML("beforeend", li);

    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);

    liAudioTag.addEventListener("loadeddata", function () {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
}

function selectedMusic(li) {
  player.index = li.getAttribute("li-index");
  displayMusic(player.getMusic());
  playMusic();
  isPlayNow();
}

function isPlayNow() {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }

    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
}

audio.addEventListener("ended", function () {
  nextMusic();
});
