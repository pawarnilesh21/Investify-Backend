// backend/routes/authRoutes.js
// Purpose: Authentication routes (signup, login)

import { Router } from 'express'
const router = Router()
import { signup, login, getCurrentUser } from '../controllers/authController.js'
import auth from '../middleware/auth.js'

// Public routes
router.post('/signup', signup)
router.post('/login', login)

// Protected route
router.get('/me', auth, getCurrentUser)

export default router
