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
}, { 
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      if (ret.logType === 'TELEMETRY') {
        delete ret.triggerSource;
        delete ret.durationSeconds;
      } else if (ret.logType === 'FEEDING_EVENT') {
        delete ret.distanceCm;
        delete ret.remainingPct;
      }
      return ret;
    }
  }
 });

module.exports = mongoose.model('Log', logSchema);