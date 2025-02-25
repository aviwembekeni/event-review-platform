const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
  sentiment: { type: String }, // Positive, Negative, Neutral
});

module.exports = mongoose.model('Review', reviewSchema);