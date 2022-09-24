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

    //monitorar a tempo atual da musica
    currentMusic.audio.ontimeupdate = function () {
      //tempo atual da musica
      textCurrentDuration.innerText = secondsToMinutes(
        currentMusic.audio.currentTime
      );

      progressbar.valueAsNumber = currentMusic.audio.currentTime;
    };
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
    musicEnded()
  }

  //botao de mute
  if (ev.target.id == "vol-icon") {
    //se tiver true, quero que fique false ao click
    currentMusic.audio.muted = !currentMusic.audio.muted;
    if (currentMusic.audio.muted) {
      ev.target.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
    } else {
      ev.target.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
    }
    musicEnded()
  }

  //aumentar e diminuir volume 'range'
  if (ev.target.id == "volume") {
    currentMusic.audio.volume = ev.target.valueAsNumber / 100;
    musicEnded()
  }

  //aumentar e diminuir progresso da música ao arrastar/clicar
  if (ev.target.id == "progressbar") {
    currentMusic.audio.currentTime = ev.target.valueAsNumber;
    musicEnded()
  }

  //botao next control
  if (ev.target.id == "next-control") {
    index++;

    //se atimgoi máximo da lista
    if (index == audios.length) {
      index = 0;
    }
    currentMusic.audio.pause();
    updateDataMusic();
    currentMusic.audio.play();
    btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
    musicEnded();
  }

  //botao prev control
  if (ev.target.id == "prev-control") {
    index--;

    if (index == -1) {
      index = audios.length - 1;
    }
    currentMusic.audio.pause();
    updateDataMusic();
    currentMusic.audio.play();
    btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
    musicEnded();
  }


  //verificar se a musica acabou
  //se acabou, passa para a próxima musica
  //adicionar essa funçáo em todos os if, 
  function musicEnded() {
    currentMusic.audio.addEventListener("ended", function () {
      //se audio acabar, próxima musica
      index++;

      //se atimgoi máximo da lista, volta p primeira
      if (index == audios.length) {
        index = 0;
      }
      currentMusic.audio.pause();
      updateDataMusic();
      currentMusic.audio.play();
      btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
    });
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
