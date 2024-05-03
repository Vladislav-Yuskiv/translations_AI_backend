const express = require('express');
const translationKeyRouter = require('./translationKeys/translationKeys');

const ctrl = require('../../../controllers/translationBundles');

const { authenticate } = require('../../../middlewares');

const router = express.Router({mergeParams: true});

router.use('/:translationBundleId/translationKeys', translationKeyRouter)

router.get('/', authenticate, ctrl.getTranslationBundles);

router.post('/', authenticate, ctrl.postTranslationBundle);

router.get('/:translationBundleId', authenticate, ctrl.getTranslationBundleId);
router.get('/:translationBundleId/download', authenticate, ctrl.getTranslationBundleDownloadInfo);
router.get('/:translationBundleId/:language/search', authenticate, ctrl.getInfoBySearch);
router.put('/:translationBundleId', authenticate, ctrl.updateTranslationBundleId);
router.delete('/:translationBundleId', authenticate, ctrl.deleteTranslationBundleId);

router.delete('/:translationBundleId/:language', authenticate, ctrl.deleteLanguageFromBundle);

router.get('/:translationBundleId/checkTranslation', authenticate, ctrl.checkBundleTranslation);
router.get('/:translationBundleId/users', authenticate, ctrl.getUsersByBundleId)
router.delete('/:translationBundleId/:userId/:deleteUserInBundle', authenticate, ctrl.deleteUserInBundle)

router.post('/:translationBundleId/addLanguage', authenticate, ctrl.addNewLanguage);



module.exports = router;
