// backend/controllers/dashboardController.js
// Purpose: Handle dashboard operations (calculate, save, get plans)
//{ create, findOne, findOneAndUpdate, find }
import InvestmentPlan from '../models/InvestmentPlan.js'
import  calculateAllocation  from '../utils/calculateAllocation.js'
import financialRules from '../utils/financialRules.js'

const {getSuggestedInvestmentPercentage}=financialRules

// Calculate investment plan
export async function calculatePlan(req, res) {
  try {
    const { salary, age, goal, riskProfile, investmentPercentage } = req.body

    // Validation
    if (!salary || !age || !goal || !riskProfile || !investmentPercentage) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      })
    }

    if (salary < 0) {
      return res.status(400).json({ 
        error: 'Salary cannot be negative' 
      })
    }

    if (age < 18 || age > 100) {
      return res.status(400).json({ 
        error: 'Age must be between 18 and 100' 
      })
    }

    if (investmentPercentage < 5 || investmentPercentage > 70) {
      return res.status(400).json({ 
        error: 'Investment percentage must be between 5% and 70%' 
      })
    }

    // Calculate investment amount
    const investmentAmount = Math.round((salary * investmentPercentage) / 100)

    // Calculate allocations based on risk profile
    const allocations = calculateAllocation(investmentAmount, riskProfile)

    // Get suggested percentage
    const suggestedPercentage = getSuggestedInvestmentPercentage(salary, age)

    // Return calculation results
    res.status(200).json({
      message: 'Plan calculated successfully',
      investmentAmount,
      allocations,
      suggestedPercentage,
      calculation: {
        salary,
        age,
        goal,
        riskProfile,
        investmentPercentage
      }
    })

  } catch (error) {
    console.error('Calculate plan error:', error);
    res.status(500).json({ 
      error: error.message || 'Server error during calculation' 
    })
  }
}

// Save investment plan
export async function savePlan(req, res) {
  try {
    const userId = req.user.id;
    const { salary, age, goal, riskProfile, investmentPercentage, allocations } = req.body

     // Validation
    if (!salary || !age || !goal || !riskProfile || !investmentPercentage || !allocations) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      })
    }
    
    //check if the plan is already Exist
    const existingPlan = await InvestmentPlan.findOne({ userId });
    if (existingPlan) {
      return res.status(409).json({
        error: "Investment plan already exists. Please update it instead."
      });
    }

    // Calculate investment amount
    const investmentAmount = Math.round((salary * investmentPercentage) / 100)

    // Create new plan
    const plan = await InvestmentPlan.create({
      userId,
      salary,
      age,
      goal,
      riskProfile,
      investmentPercentage,
      investmentAmount,
      allocations
    })

    res.status(201).json({
      message: 'Plan saved successfully',
      plan
    })

  } catch (error) {
    console.error('Save plan error:', error);
    res.status(500).json({ 
      error: error.message || 'Server error while saving plan' 
    })
  }
}

// Get user's saved plan
export async function getPlan(req, res) {
  try {
    const userId = req.user.id;

    // Find the most recent plan for this user
    const plan = await InvestmentPlan.findOne({ userId })
      .sort({ createdAt: -1 }) // Get latest plan
      .lean()

    if (!plan) {
      return res.status(200).json({ 
        message: 'No plan found',
        plan: null 
      })
    }

    res.status(200).json({
      message: 'Plan retrieved successfully',
      plan
    })

  } catch (error) {
    console.error('Get plan error:', error);
    res.status(500).json({ 
      error: error.message || 'Server error while fetching plan' 
    })
  }
}

// Update existing plan
export async function updatePlan(req, res) {
  try {
    const userId = req.user.id;
    const { salary, age, goal, riskProfile, investmentPercentage, allocations } = req.body

    // Validation
    if (!salary || !age || !goal || !riskProfile || !investmentPercentage) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      })
    }

    // Calculate investment amount
    const investmentAmount = Math.round((salary * investmentPercentage) / 100)

    // Find and update the most recent plan
    const plan = await InvestmentPlan.findOneAndUpdate(
      { userId },
      {
        salary,
        age,
        goal,
        riskProfile,
        investmentPercentage,
        investmentAmount,
        allocations,
        updatedAt: Date.now()
      },
      { 
        new: true, // Return updated document
        sort: { createdAt: -1 } // Update most recent
      }
    )

    if (!plan) {
      return res.status(404).json({ 
        error: 'No plan found to update' 
      })
    }

    res.status(200).json({
      message: 'Plan updated successfully',
      plan
    })

  } catch (error) {
    console.error('Update plan error:', error);
    res.status(500).json({ 
      error: error.message || 'Server error while updating plan' 
    })
  }
}

// Get all plans for user (history)
export async function getAllPlans(req, res) {
  try {
    const userId = req.user.id;

    const plans = await InvestmentPlan.find({ userId })
      .sort({ createdAt: -1 })
      .lean()

    res.status(200).json({
      message: 'Plans retrieved successfully',
      count: plans.length,
      plans
    })

  } catch (error) {
    console.error('Get all plans error:', error)
    res.status(500).json({ 
      error: error.message || 'Server error while fetching plans' 
    })
  }
}