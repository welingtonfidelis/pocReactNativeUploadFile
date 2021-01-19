const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/multipart-upload', upload.single('file'), (req, res) => {
  
  console.log('->', req.file);
  res.end('OK');
});

app.listen(3001, () => {
  console.log('Working on port 3001');
});