var express = require('express');
var router = express.Router();
var multer = require('multer')
var upload = multer({dest: './public/data/uploads/'})
var readXlsxFile = require('xlsx');
var fs = require('fs');
var {promisify} = require('util')
var unlinkAsync = promisify(fs.unlink)

// The uploading will be completed once the middleware returns, i.e. once this route is hit.
router.post('/', upload.single('orders_request'), function (req, res) {
  // req.file is the name of your file in the form above, here 'orders_request'
  console.log("req.file ==> ", req.file);

  var workbook = readXlsxFile.readFile(req.file.path);
  let ordersSheetName = workbook.SheetNames[0];
  var worksheet = workbook.Sheets[ordersSheetName];
  let json = readXlsxFile.utils.sheet_to_json(worksheet);
  console.log("json ", json);
  res.json(json);
});

module.exports = router;
