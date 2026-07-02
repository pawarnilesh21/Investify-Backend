// backend/middleware/auth.js
// Purpose: JWT authentication middleware to protect routes
import jwt from "jsonwebtoken"
//const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'No token provided. Authorization denied.' 
      })
    }

    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({ 
        error: 'No token provided. Authorization denied.' 
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Add user info to request object
    req.user = {
      id: decoded.id,
      email: decoded.email
    }

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired. Please login again.' 
      })
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Invalid token. Authorization denied.' 
      })
    }
    return res.status(500).json({ 
      error: 'Server error during authentication.' 
    })
  }
}

export default auth
