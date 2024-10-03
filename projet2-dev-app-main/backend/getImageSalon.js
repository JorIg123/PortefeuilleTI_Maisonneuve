const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/fileSalon/:nom', (req, res) => {
  const { nom } = req.params
  console.log(req.params);

  const filePath = path.join(__dirname, `./uploaded_files/salon/${nom}`);
  
  res.sendFile(filePath);
});


module.exports = router;