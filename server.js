// backend/server.js
// Purpose: Main entry point - Express server setup

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/db.js'
import errorHandler from './middleware/errorHandler.js'
//import errorHandler from './middleware/errorHandler.js'

// Routes
import authRoutes from './routes/authRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import recommendationRoutes from './routes/recommendationRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()

// Connect to MongoDB
await connectDB()

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://investiify.netlify.app/'],
 credentials: true
}))

//app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging (development only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
  })
}

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/recommendations', recommendationRoutes)
app.use('/api/user', userRoutes)

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Investify API Running! 🚀',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      dashboard: '/api/dashboard',
      recommendations: '/api/recommendations',
      user: '/api/user'
    }
  })
})

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path
  })
})

// Error handling middleware (must be last)
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 API: http://localhost:${PORT}`)
})

