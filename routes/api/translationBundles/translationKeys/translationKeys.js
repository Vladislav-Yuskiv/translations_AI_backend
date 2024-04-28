const express = require('express');
const translationValueRouter = require('./translationValues/translationValues');


const ctrl = require('../../../../controllers/translationKeys');

const { authenticate } = require('../../../../middlewares');

const router = express.Router({mergeParams: true});

router.get('/', authenticate, ctrl.getTranslationKeys);

router.get('/info', authenticate, ctrl.getTranslationKeysInformation);

router.post('/', authenticate, ctrl.postTranslationKey);

router.delete('/:translationKeyId', authenticate, ctrl.deleteTranslationKey);

router.use('/values', translationValueRouter)

module.exports = router;
