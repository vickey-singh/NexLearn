
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')

const app = express()

// ======================================
// TRUST RENDER REVERSE PROXY
// ======================================

app.set('trust proxy', 1)

// ======================================
// SECURITY MIDDLEWARE
// ======================================

app.disable('x-powered-by')

app.use(helmet())

// ======================================
// CORS CONFIGURATION
// ======================================

app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    })
)

// ======================================
// BODY PARSER
// ======================================

app.use(express.json({ limit: '10kb' }))

app.use(
    express.urlencoded({
        extended: false,
        limit: '10kb',
    })
)

// ======================================
// COOKIE PARSER
// ======================================

app.use(cookieParser())

// ======================================
// AUTH ROUTES
// ======================================

app.use('/api/auth', authRoutes)

// ======================================
// HEALTH CHECK
// ======================================

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'NexLearn API is running',
    })
})

// ======================================
// SERVER CONFIGURATION
// ======================================

const PORT = process.env.PORT || 5000

// ======================================
// START SERVER
// ======================================

const startServer = async () => {
    try {
        await connectDB()

        app.listen(PORT, () => {
            console.log(`NexLearn server running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Server startup failed:', error.message)
        process.exit(1)
    }
}

startServer()
