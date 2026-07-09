import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  alert_type: { type: String, required: true },
  severity: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
  message: { type: String, required: true },
  source_ip: { type: String, required: true },
  
  // Các trường mới cho Nhóm 2 (Ops)
  status: { type: String, enum: ['New', 'In Progress', 'Resolved', 'False Positive'], default: 'New' },
  incident_group_id: { type: String, default: null },
  audit_logs: [{
    action: String,
    timestamp: { type: Date, default: Date.now },
    user: { type: String, default: 'System' }
  }],

  // Trường mới cho Nhóm 1 (Attack Map)
  geo_location: {
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
    country: { type: String, required: false }
  }
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;
