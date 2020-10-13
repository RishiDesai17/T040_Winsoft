const express = require('express');
const router = express.Router();
const MapController = require('../controllers/map');
const checkAuth = require('../middleware/check-auth');

router.post('/get-desired-location', checkAuth, MapController.get_desired_location)

router.get('/', checkAuth, MapController.get_map)

router.post('/', checkAuth, MapController.create_map)

router.get('/single/:map_id', checkAuth, MapController.single_map)

module.exports = router