const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.post('/telemetry', logController.createTelemetryLog);
router.post('/feeding-event', logController.createFeedingLog);
router.get('/', logController.getLogs);

module.exports = router;