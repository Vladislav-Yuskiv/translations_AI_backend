const express = require('express');
const ctrl = require('../../controllers/reffaral');

const router = express.Router();

router.post('/create', ctrl.referralCreate);
router.post('/signup', ctrl.referralSignup);

module.exports = router;
