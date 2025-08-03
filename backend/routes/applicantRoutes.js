const express = require('express');
const router = express.Router();
const { createApplicant, getApplicants } = require('../controllers/applicantControllers');
const { loginAdmin, verifyToken } = require('../controllers/adminControllers');

router.post('/applicants', createApplicant);
router.get('/applicants', verifyToken, getApplicants);
router.post('/admin/login', loginAdmin);

module.exports = router;
