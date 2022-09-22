require("dotenv").config();
const express = require("express");
const connectToDb = require("./database/db");
const path = require("path");

//usar esse models o criar rota create
const Music = require("./models/Music");
const app = express();
const port = process.env.PORT || 3000;

//variável p usar no editar musica
let music = null;
//motor q mostrara as telas para cliente é 'ejs
app.set("view engine", "ejs");

//onde ficara arquivos estaticos, html, js, image, etc..
//dirname, pasta raiz de qlquer ambiente q estiver
//path é junção entre pasta principal e a public
app.use(express.static(path.join(__dirname, "public")));

//p receber dados do formulario no arquivo html e enviar p servidor
//persistencia de dados no mongoose
app.use(express.urlencoded());

connectToDb();

app.get("/", async (req, res) => {
  //trazer do banco de dados mongodb um array de objetos
  const playList = await Music.find();

  //enviar esses objetos para a tela
  res.render("index", { playList });
});

//rota p enviar usuário para admin
app.get("/admin", async (req, res) => {
  const playList = await Music.find();

  //renderizar playList e music (music sempre null qd recarregar pagina)
  res.render("admin", { playList, music: null });
});


//rota de cadastro
app.post("/create", async (req, res) => {
  //receber oq vier do body da requisição
  const music = req.body;

  //criar a partir de music, em models
  await Music.create(music);
  res.redirect("/");
});


//rota editar musica
//by primeiro endereço
//id para receber pror parametro na rota um item aleatório
app.get("/by/:id", async (req, res) => {

  //peguei o id do parâmetros
  const { id } = req.params;

  //variavel criada acima como null 
  // pesquisar id no banco de dados e colocar n variavel 'music
  music = await Music.findById({_id: id})

  //coloco aki, dou find all e renderizo novamente
  //passando playlist e music
  const playList = await Music.find();
  //renderizar playList e music
  res.render("admin", { playList, music });
});


//rota update musica
app.post('/update/:id', async (req, res)=>{
    //trazer do body
    const newMusic = req.body

    //update no id q vier de req.params
    //e editar colocando a nova musica 'newMusic'
    await Music.updateOne({_id: req.params.id}, newMusic)


    
    // redirecionar para admin
    // e depois fecha o modal como "null"
    res.redirect('/admin')
})
app.listen(port, () =>
  console.log(`servidor executado em http://localhost:${port}`)
);
