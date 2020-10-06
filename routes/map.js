const express = require('express');
const router = express.Router();
const MapController = require('../controllers/map');

router.post('/get-desired-location', MapController.get_desired_location)

router.get('/', MapController.get_map)

router.post('/', MapController.create_map)

router.get('/single/:map_id', MapController.single_map)

module.exports = router