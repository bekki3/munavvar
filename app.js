// server.js
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/videos/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}.mp4`);
    }
  });
  const upload = multer({ storage });
  
  // ...

  
// const upload = multer({ dest: 'videos/' });
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
// Set EJS as templating engine
app.set("view engine", "ejs");


app.get('/', (req, res)=> {
    res.render('index');
});

app.get('/upload', (req, res)=> {
    res.render('plus');
})

app.post('/upload', upload.single('video'), (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server started on port 3000'));
