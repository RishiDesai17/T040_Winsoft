const express = require('express');
const router = express.Router();
const DecryptionController = require('../controllers/decrypt');
const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, DecryptionController.decrypt)

router.get('/history', checkAuth, DecryptionController.get_history)

router.post('/history', checkAuth, DecryptionController.add)

module.exports = router