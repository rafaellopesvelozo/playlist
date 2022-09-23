const controls = document.querySelector("#controls");

let index = 0;
let currentMusci;
let isplay = false;

controls.addEventListener("click", function (ev) {
  const audios = [];
  let music = {};

  if(ev.target.id != 'controls'){
    //posição das musicas
    const musics =
    ev.path[2].childNodes[3].childNodes[5].childNodes[1].childNodes[3].childNodes;

    //percorrer cada musica
    musics.forEach(function (item) {
    if (item.nodeName != "#text") {
      //posição do nome da música
      music.nome = item.childNodes[3].childNodes[0].data;

      //posição do artista da música
      music.artista = item.childNodes[5].childNodes[0].data;

      //posição do imagem da música
      music.imagem = item.childNodes[1].childNodes[0].currentSrc;

      //posição do audio da música
      music.audio = item.childNodes[7].childNodes[0];

      //add ao array
      audios.push(music);

      //preencher novamente a music na volta ( zerando)
      music = {};
    }
  });
  }
  
  console.log(audios)
});
