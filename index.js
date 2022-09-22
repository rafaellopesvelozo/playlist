require("dotenv").config();
const express = require("express");
const connectToDb = require("./database/db");
const path = require("path");

//usar esse models o criar rota create
const Music = require("./models/Music");
const app = express();
const port = process.env.PORT || 3000;

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
app.get("/admin", (req, res) => {
  res.render("admin");
});

//rota de cadastro
app.post("/create", async (req, res) => {
  //receber oq vier do body da requisição
  const music = req.body;

  //criar a partir de music, em models
  await Music.create(music);
  res.redirect("/");
});
app.listen(port, () =>
  console.log(`servidor executado em http://localhost:${port}`)
);
