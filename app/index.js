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

let sess = {
  store: new (require('connect-pg-simple')(session)),
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure:process.env.NODE_ENV === 'production' ? true : false,

    httpOnly: true,
      // 1 hour duration
    maxAge: 1000 * 60 * 60 * 1,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',

  },
proxy:true
}


app.use(session(sess));

app.use((req,_ , next) => {
  // transmit session's information to all views
app.locals.session = req.session;
app.locals.flash = req.session.flash;
if (req.session && req.session.flash) {
  delete req.session.flash;
}
next();
});

const bodySanitizer = require('./middlewares/body-sanitizer');

app.use(bodySanitizer);

// to get the req.body
app.use(express.urlencoded({ extended: true }));


app.use(express.static("./assets"));

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

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    // verify type of file
    const filetypes = /png|jpg|jpeg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      cb(null, true); 
    } else {
      cb('Erreur : Seuls les fichiers PNG, JPG et JPEG sont autorisés.');
    }
  }
});
app.use(upload.single('picture'));


app.use(router);



const port = process.env.PORT || 5000;
app.listen(port, () => { console.log(`Listening at ${process.env.BASE_URL}:${port}`)});
