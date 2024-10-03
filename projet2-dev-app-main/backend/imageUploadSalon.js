const express = require('express');
const router = express.Router();
const multer = require('multer');

const imageUploadPath = './uploaded_files/salon';
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, imageUploadPath)
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
  }
})
const imageUpload = multer({storage: storage})

router.post('/image-upload-salon', imageUpload.array("my-image-file"), (req, res) => {
      console.log('POST request received to /image-upload.')
      console.log('Axios POST body: ', req.body);
    
      const uploadedFileName = req.files[0].filename;
      res.send(uploadedFileName);
    })


module.exports = router;