const dotenv = require("dotenv");
dotenv.config();

const session = require ('express-session');
const express = require("express");

const router = require("./routers/mainRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", "app/views");

// to get the req.body
app.use(express.urlencoded({ extended: true }));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        // false because not https
        secure: false,
        // 24 hours duration
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use((req, res, next) => {
    // transmet les infos de session aux vues
  app.locals.session = req.session;
 
  next();
});



app.use(router);

app.use(express.static("../assets/public"));

const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Listening at ${process.env.BASE_URL}:${port}`)});