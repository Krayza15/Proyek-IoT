const Log = require('../models/Log');

// 1. Log Distance Sensor Reading (Food Level)
exports.createTelemetryLog = async (req, res) => {
  try {
    const { distanceCm, remainingPct } = req.body;

    const newLog = new Log({
      logType: 'TELEMETRY',
      distanceCm,
      remainingPct
    });

    await newLog.save();
    res.status(201).json({ success: true, message: 'Telemetry logged', data: newLog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Log Automated or Manual Feeding Event
exports.createFeedingLog = async (req, res) => {
  try {
    const { triggerSource, durationSeconds } = req.body;

    const newLog = new Log({
      logType: 'FEEDING_EVENT',
      triggerSource,
      durationSeconds
    });

    await newLog.save();
    res.status(201).json({ success: true, message: 'Feeding event logged', data: newLog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. Get Feeder History
exports.getLogs = async (req, res) => {
  try {
    const { type, limit = 20 } = req.query;
    const filter = type ? { logType: type } : {};

    const logs = await Log.find(filter)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.status(200).json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};