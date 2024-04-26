const express = require('express');

const ctrl = require('../../../../../controllers/translationValues');

const { authenticate } = require('../../../../../middlewares');

const router = express.Router({mergeParams: true});

router.post('/', authenticate, ctrl.getTranslationValues);

router.post('/', authenticate, ctrl.postTranslationValue);

module.exports = router;
