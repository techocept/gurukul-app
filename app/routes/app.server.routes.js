const express = require('express');
const router=express.Router();

const { authenticate, register, getAll, getCurrent, getById, update, _delete } = require("../controllers/app.users.controller")


router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
// router.post('/otp', Otpsent);
// router.post('/otpVerify', otpVerification);

module.exports = router;