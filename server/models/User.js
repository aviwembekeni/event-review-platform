const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin', 'event_creator'], 
    default: 'user' 
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  attendedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  createdEvents: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event',
    default: [] 
  }]
});

// Ensure `createdEvents` is only for event creators/admins
userSchema.pre('save', function(next) {
  if (this.role !== 'event_creator' && this.role !== 'admin') {
    this.createdEvents = undefined; // Remove createdEvents if not an event creator/admin
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
