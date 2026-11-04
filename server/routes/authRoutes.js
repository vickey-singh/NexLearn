
const express = require('express')
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit')

const User = require('../models/User')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// ======================================
// LOGIN RATE LIMIT
// ======================================

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many login attempts. Please try again later.',
    },
})

// ======================================
// COOKIE OPTIONS
// ======================================

const getCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite:
        process.env.NODE_ENV === 'production'
            ? 'none'
            : 'lax',
    path: '/',
    maxAge: 8 * 60 * 60 * 1000,
})

// ======================================
// LOGIN
// POST /api/auth/login
// ======================================

router.post('/login', loginLimiter, async (req, res, next) => {
    try {
        const { email, password, role } = req.body

        if (
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            typeof role !== 'string'
        ) {
            return res.status(400).json({
                success: false,
                message: 'Email, password and role are required.',
            })
        }

        const normalizedEmail = email.trim().toLowerCase()
        const normalizedRole = role.trim().toLowerCase()

        if (
            !normalizedEmail ||
            !password ||
            !['admin', 'teacher', 'student'].includes(normalizedRole)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please provide valid login details.',
            })
        }

        const user = await User.findOne({
            email: normalizedEmail,
            role: normalizedRole,
        }).select('+password')

        // ======================================
        // INVALID USER CHECK
        // ======================================

        if (!user || !user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            })
        }

        // ======================================
        // PASSWORD VERIFICATION
        // ======================================

        const passwordMatches = await user.comparePassword(password)

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            })
        }

        // ======================================
        // JWT SECRET CHECK
        // ======================================

        if (!process.env.JWT_SECRET) {
            throw new Error(
                'JWT_SECRET is missing from environment variables'
            )
        }

        // ======================================
        // GENERATE JWT TOKEN
        // ======================================

        const token = jwt.sign(
            {
                userId: user._id.toString(),
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '8h',
                issuer: 'nexlearn-api',
                audience: 'nexlearn-client',
            }
        )

        // ======================================
        // SET AUTHENTICATION COOKIE
        // ======================================

        res.cookie('token', token, getCookieOptions())

        return res.status(200).json({
            success: true,
            message: 'Login successful.',
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
        })

    } catch (error) {
        next(error)
    }
})

// ======================================
// CURRENT USER
// GET /api/auth/me
// ======================================

router.get('/me', protect, (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    })
})

// ======================================
// LOGOUT
// POST /api/auth/logout
// ======================================

router.post('/logout', (req, res) => {

    // Clear cookie using the same attributes
    // used when setting the authentication cookie.

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:
            process.env.NODE_ENV === 'production'
                ? 'none'
                : 'lax',
        path: '/',
    })

    res.status(200).json({
        success: true,
        message: 'Logged out successfully.',
    })
})

module.exports = router
