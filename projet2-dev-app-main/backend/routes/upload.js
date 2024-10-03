const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      if (file) {
        cb(null, file.originalname);
      } else {
        cb(new Error('File is undefined'), null);
      }
    }
  });
  
  
const upload = multer({ storage: storage });
  
router.post('/upload', upload.single('image'), (req, res) => {
    try {
        console.log(req.file);
      res.status(200).json({ filename: req.file.filename });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'error' });
    }
  });

  module.exports = router;