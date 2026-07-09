import mongoose from 'mongoose';

const trafficLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  source_ip: { type: String, required: true },
  destination_ip: { type: String, required: true },
  bytes_sent: { type: Number, required: true },
  bytes_received: { type: Number, required: true },
  
  // Trường mới cho Nhóm 1 (Pie Chart & Advanced Analysis)
  protocol: { type: String, enum: ['TCP', 'UDP', 'HTTP', 'HTTPS', 'ICMP'], required: true },
  port: { type: Number, required: true }
});

const TrafficLog = mongoose.model('TrafficLog', trafficLogSchema);

export default TrafficLog;
