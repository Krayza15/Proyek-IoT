const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  logType: { 
    type: String, 
    required: true, 
    enum: ['TELEMETRY', 'FEEDING_EVENT'] // Simplified categories
  },
  timestamp: { type: Date, default: Date.now },
  
  // Ultrasonic Sensor Metrics
  distanceCm: Number,
  remainingPct: Number,

  // Actuator Trigger Metrics
  triggerSource: { 
    type: String, 
    enum: ['SCHEDULED', 'MANUAL'], 
    default: 'SCHEDULED' 
  },
  durationSeconds: Number
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);