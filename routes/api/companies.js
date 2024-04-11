const express = require('express');

const ctrl = require('../../controllers/companies');

const { authenticate } = require('../../middlewares');

const router = express.Router();

// router.get('/', authenticate, ctrl.getCompanies);

// router.post('/', authenticate, ctrl.createCompany);

// router.get('/:companyId', authenticate, ctrl.getCompanyById);

// router.put('/:companyId', authenticate, ctrl.updateCompany);

// router.delete('/:companyId', authenticate, ctrl.deleteCompany);

module.exports = router;
