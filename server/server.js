
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')

const app = express()

app.disable('x-powered-by')

app.use(helmet())

app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    })
)

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false, limit: '10kb' }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'NexLearn API is running',
    })
})

const PORT = process.env.PORT || 5000

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
