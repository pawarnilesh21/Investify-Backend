// backend/models/Goal.js
// Purpose: User's financial goals schema
import mongoose from "mongoose"
//const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Goal title is required'],
    trim: true
  },
  targetAmount: {
    type: Number,
    required: [true, 'Target amount is required'],
    min: [0, 'Target amount cannot be negative']
  },
  currentAmount: {
    type: Number,
    default: 0,
    min: [0, 'Current amount cannot be negative']
  },
  timeline: {
    type: Number, // in years
    required: [true, 'Timeline is required'],
    min: [1, 'Timeline must be at least 1 year']
  },
  monthlySIP: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ['Home', 'Car', 'Education', 'Retirement', 'Emergency Fund', 'Other'],
    default: 'Other'
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Paused'],
    default: 'Active'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Calculate progress percentage before saving
GoalSchema.pre('save', function(next) {
  if (this.targetAmount > 0) {
    this.progress = Math.min(100, (this.currentAmount / this.targetAmount) * 100)
  }
  this.updatedAt = Date.now();
  next();
})

const Goal=mongoose.model("Goal",GoalSchema)

export default Goal

