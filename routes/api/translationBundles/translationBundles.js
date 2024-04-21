const express = require('express');
const translationKeyRouter = require('./translationKeys/translationKeys');

const ctrl = require('../../../controllers/translationBundles');

const { authenticate } = require('../../../middlewares');

const router = express.Router({mergeParams: true});

router.get('/', authenticate, ctrl.getTranslationBundles);

router.post('/', authenticate, ctrl.postTranslationBundle);

router.get('/:translationBundleId', authenticate, ctrl.getTranslationBundleId);
router.put('/:translationBundleId', authenticate, ctrl.updateTranslationBundleId);
router.delete('/:translationBundleId', authenticate, ctrl.deleteTranslationBundleId);

router.get('/:translationBundleId/users', authenticate, ctrl.getUsersByBundleId)
router.delete('/:translationBundleId/:userId/:deleteUserInBundle', authenticate, ctrl.deleteUserInBundle)

router.use('/:translationBundleId/translationKeys', translationKeyRouter)

module.exports = router;
