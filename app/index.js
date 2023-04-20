const dotenv = require("dotenv");
dotenv.config();

const session = require ('express-session');
const express = require("express");
const router = require("./routers/mainRouter");
const multer = require('multer');
const path = require('path');
const app = express();



app.set("view engine", "ejs");
app.set("views", "app/views");

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

app.use((req,_ , next) => {
  
  // transmit session's information to views
app.locals.session = req.session;

next();
});

const bodySanitizer = require('./middlewares/body-sanitizer');
app.use(bodySanitizer);

// to get the req.body
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./assets/public"));

// configuration of the storage of multer stockage and rename file
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'assets/public/uploads');
    },
    filename: function(req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, Date.now() + '-' + file.originalname.replace(extension, '') + extension);
    }
});

const upload = multer({ storage: storage });
app.use(upload.single('picture'));










app.use(router);



const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Listening at ${process.env.BASE_URL}:${port}`)});
