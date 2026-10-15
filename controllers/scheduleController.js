const Schedule = require('../models/Schedule');

// 1. Create a Feeding Schedule
exports.createSchedule = async (req, res) => {
  try {
    const { userId, feedingTime, durationSeconds } = req.body;

    const activeScheduleCount = await Schedule.countDocuments({ isActive: true }); 
    
    // Batasi maksimal 3 jadwal aktif 
    if (activeScheduleCount >= 3) { 
      return res.status(400).json({ 
        success: false, 
        message: 'Batas maksimal 3 jadwal aktif telah tercapai. Hapus jadwal lama terlebih dahulu.' 
      }); 
    }

    const newSchedule = new Schedule({
      userId,
      feedingTime,
      durationSeconds
    });

    await newSchedule.save();
    res.status(201).json({ success: true, message: 'Schedule created', data: newSchedule });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Get All Active Schedules
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find({ isActive: true }).sort({ feedingTime: 1 });
    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. Toggle or Delete Schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    await Schedule.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Schedule deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};