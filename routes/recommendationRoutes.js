// backend/routes/recommendationRoutes.js
// Purpose: Recommendation routes (stocks, mutual funds, gold, insurance)

import express from 'express'
import {
  getStockRecommendations,
  getMutualFundRecommendations,
  getSIPRecommendations,
  getGoldRecommendations,
  getInsuranceRecommendations
} from '../controllers/recommendationController.js';


import auth from '../middleware/auth.js'

const router = express.Router()

// All routes are protected (require JWT)
router.get('/stocks', auth, getStockRecommendations)
router.get('/mutual-funds', auth, getMutualFundRecommendations)
router.get('/sip', auth, getSIPRecommendations)
router.get('/gold', auth, getGoldRecommendations)
router.post('/insurance', auth, getInsuranceRecommendations)

export default router