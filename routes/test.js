const express = require('express');

const router = express.Router();

function test(req,res){

  res.status(200).json({
    message: `Connected successfully`,
  });

}

router.get('/',test);

module.exports = router;
