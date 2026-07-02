// backend/models/InvestmentPlan.js
// Purpose: Investment plan schema for storing user's investment data
import {mongoose} from "mongoose"
//const mongoose = require('mongoose')

const InvestmentPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
    unique:true
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0, 'Salary cannot be negative']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [18, 'Age must be at least 18'],
    max: [100, 'Age must be less than 100']
  },
  goal: {
    type: String,
    required: [true, 'Financial goal is required'],
    enum: ['Wealth Creation', 'Buy Home', 'Buy Car', 'Retirement Planning', 'Education Fund', 'Emergency Fund']
  },
  riskProfile: {
    type: String,
    required: [true, 'Risk profile is required'],
    enum: ['Conservative', 'Moderate', 'Aggressive'],
    default: 'Moderate'
  },
  investmentPercentage: {
    type: Number,
    required: [true, 'Investment percentage is required'],
    min: [5, 'Investment must be at least 5%'],
    max: [70, 'Investment cannot exceed 70%']
  },
  investmentAmount: {
    type: Number,
    required: true
  },
  allocations: {
    stocks: {
      amount: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 }
    },
    mutualFunds: {
      amount: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 }
    },
    sip: {
      amount: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 }
    },
    gold: {
      amount: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 }
    },
    insurance: {
      amount: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 }
    }
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

// Index for faster queries
InvestmentPlanSchema.index({ userId: 1, createdAt: -1 });

const InvestmentPlan = mongoose.model('InvestmentPlan', InvestmentPlanSchema)
export default InvestmentPlan
