const express = require('express');
const translationValueRouter = require('./translationValues/translationValues');


const ctrl = require('../../../../controllers/translationKeys');

const { authenticate } = require('../../../../middlewares');

const router = express.Router({mergeParams: true});

router.get('/', authenticate, ctrl.getTranslationKeys);

router.post('/', authenticate, ctrl.postTranslationKey);

router.use('/:translationKeyId/translationValues', translationValueRouter)

module.exports = router;
