const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

/* GET users page. */
router.get('/', function (req, res) {
  res.send();
});

router.post('/', [
    check('name').not().isEmpty().isLength({min: 5}).withMessage('Name must have more than 5 characters'),
    check('classYear', 'Class Year should be a number').not().isEmpty().isInt(),
    check('weekday', 'Choose a weekday').optional().not().isIn(['Sunday', 'Saturday']),
    check('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
    check('password', 'Your password must be at least 5 characters').not().isEmpty().isLength({min: 5}),
  ],
  function (req, res) {
    const errors = validationResult(req);
    //console.log(req.body);
    console.log("Name = %s and email = %s", req.body.name, req.body.email);

    if (!errors.isEmpty()) {
      console.error("Error occurred ", JSON.stringify(errors));
      return res.status(422).jsonp(errors.array());
    } else {
      res.send({});
    }
  });

module.exports = router;
