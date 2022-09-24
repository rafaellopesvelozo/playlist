const controls = document.querySelector("#controls");
const btnPlay = document.querySelector("#play-control");

let index = 0;
let currentMusic;
let isplay = false;

controls.addEventListener("click", function (ev) {
  const audios = [];
  let music = {};

  if (ev.target.id != "controls") {
    //posição das musicas
    const musics =
      ev.path[2].childNodes[3].childNodes[5].childNodes[1].childNodes[3]
        .childNodes;

    //percorrer cada musica
    musics.forEach(function (item) {
      if (item.nodeName != "#text") {
        //posição do nome da música
        music.name = item.childNodes[3].childNodes[0].data;

        //posição do artista da música
        music.artist = item.childNodes[5].childNodes[0].data;

        //posição do imagem da música
        music.image = item.childNodes[1].childNodes[0].currentSrc;

        //posição do audio da música
        music.audio = item.childNodes[7].childNodes[0];

        //add ao array
        audios.push(music);

        //preencher novamente a music na volta ( zerando)
        music = {};
      }
    });
  }

  function updateDataMusic() {
    //index é a primeira musica[posição 0]
    currentMusic = audios[index];

    document.querySelector("#currentImg").src = currentMusic.image;
    document.querySelector("#currentname").innerText = currentMusic.name;
    document.querySelector("#currentArtist").innerText = currentMusic.artist;

    //input do volume, em 100
    document.querySelector("#volume").value = currentMusic.audio.volume * 100;

    //progresso da musica
    const progressbar = document.querySelector("#progressbar");

    //duração atual da musica
    const textCurrentDuration = document.querySelector("#current-duration");

    //duração total da música
    const textTotalDuration = document.querySelector("#total-duration");

    //tamanho máximo da duração do audio atual
    progressbar.max = currentMusic.audio.duration;

    //função converter duração de segundos para minutos
    textTotalDuration.innerText = secondsToMinutes(currentMusic.audio.duration);

    //tempo atual da musica
    textCurrentDuration.innerText = secondsToMinutes(
      currentMusic.audio.currentTime
    );

    progressbar.valueAsNumber = currentMusic.audio.currentTime;
  }

  //BOTAO DE PLAY DA MÚSICA
  //só executa a função qd estiver em índice 0
  if (ev.target.id == "play-control") {
    if (index === 0) {
      updateDataMusic();
    }

    //se isplay for verdadeiro ( negando ele)
    if (!isplay) {
      //substituir botao play ao tocar música
      btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");

      //toca a música
      currentMusic.audio.play();
      isplay = true;
    } else {
      btnPlay.classList.replace("bi-pause-fill", "bi-play-fill");
      currentMusic.audio.pause();
      isplay = false;
    }
  }
});

//função da conversão
function secondsToMinutes(time) {
  //arredondar o valor
  const minutes = Math.floor(time / 60);

  //oq sobrar da divisao vai ser os segundos
  const seconds = Math.floor(time % 60);

  //slice para tirar os '0' da direita , esquerda. e traer apenas os numeros
  return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)} `;
}
