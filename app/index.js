const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const router = require("./routers/mainRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", "app/views");

// Permet de récupérer les données d'un formulaire simple
// nous donne la variable request.body
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(express.static("../assets/public"));

const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Listening at ${process.env.BASE_URL}:${port}`)});