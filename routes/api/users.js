const express = require('express');
const ctrl = require('../../controllers/users');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/:userId', authenticate, ctrl.getUserById);
router.patch('/changePassword',authenticate, ctrl.changePassword)
router.put('/:userId', authenticate, ctrl.updateUser);

module.exports = router;
