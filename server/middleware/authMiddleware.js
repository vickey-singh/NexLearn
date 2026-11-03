
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// ======================================
// VERIFY AUTHENTICATION
// ======================================

const protect = async (req, res, next) => {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please log in.',
            })
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is missing in environment variables')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId)

        if (!user || !user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Your session is invalid or your account is inactive.',
            })
        }

        req.user = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        }

        next()
    } catch (error) {
        if (
            error.name === 'JsonWebTokenError' ||
            error.name === 'TokenExpiredError'
        ) {
            return res.status(401).json({
                success: false,
                message: 'Your session is invalid or has expired. Please log in again.',
            })
        }

        next(error)
    }
}

// ======================================
// AUTHORIZE USER ROLE
// ======================================

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required.',
            })
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to access this resource.',
            })
        }

        next()
    }
}

module.exports = {
    protect,
    authorize,
}
