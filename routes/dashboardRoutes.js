// backend/routes/dashboardRoutes.js
// Purpose: Dashboard routes (calculate, save, get plans)

import express from 'express'
import {
  calculatePlan,
  savePlan,
  getPlan,
  updatePlan,
  getAllPlans
} from '../controllers/dashboardController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// All routes are protected (require JWT)
router.post('/calculate-plan', auth, calculatePlan)
router.post('/save-plan', auth, savePlan)
router.get('/get-plan', auth, getPlan)
router.put('/update-plan', auth, updatePlan)
router.get('/all-plans', auth, getAllPlans)

export default router
