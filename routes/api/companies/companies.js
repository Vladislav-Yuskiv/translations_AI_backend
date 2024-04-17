const express = require('express');
const translationKeyRouter = require('./translationKeys/translationKeys');

const ctrl = require('../../../controllers/companies');

const { authenticate } = require('../../../middlewares');

const router = express.Router({mergeParams: true});

router.get('/', authenticate, ctrl.getCompanies);

router.post('/', authenticate, ctrl.postCompany);

router.get('/:companyId', authenticate, ctrl.getCompanyById);

// router.put('/:companyId', authenticate, ctrl.updateCompany);

// router.delete('/:companyId', authenticate, ctrl.deleteCompany);

router.use('/:companyId/translationKeys', translationKeyRouter)

module.exports = router;
