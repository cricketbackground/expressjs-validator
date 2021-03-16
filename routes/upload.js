const express = require('express');
const router = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fields: 1, fileSize: 10 * 1024 * 1024, files: 1, parts: 2,
  },
});
const XLSX = require('xlsx');

// The uploading will be completed once the middleware returns, i.e. once this route is hit.
router.post('/', upload.single('orders_request'), function (req, res) {
  var workbook = XLSX.read(req.file.buffer);
  let ordersSheetName = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[ordersSheetName];
  let json = XLSX.utils.sheet_to_json(worksheet);
  console.log("json ", json);
  if (json.length === 0) {
    res.json({
      message: "file is empty!"
    });
  } else {
    res.json(json);
  }
});

module.exports = router;
