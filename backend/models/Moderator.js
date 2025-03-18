
const mongoose = require('mongoose');

const ModeratorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  hotelId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hotel',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  permissions: {
    canManageWorkers: {
      type: Boolean,
      default: true
    },
    canManageRooms: {
      type: Boolean,
      default: true
    },
    canViewBookings: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Moderator', ModeratorSchema);
