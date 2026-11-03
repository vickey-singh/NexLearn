
require('dotenv').config()

const mongoose = require('mongoose')
const connectDB = require('../config/db')
const User = require('../models/User')

const createAdmin = async () => {
    try {
        const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env

        if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
            throw new Error(
                'ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env'
            )
        }

        if (ADMIN_PASSWORD.length < 8) {
            throw new Error(
                'Admin password must be at least 8 characters long'
            )
        }

        await connectDB()

        const email = ADMIN_EMAIL.trim().toLowerCase()

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            throw new Error(
                'This email already exists. No account was created or modified.'
            )
        }

        const admin = await User.create({
            name: ADMIN_NAME.trim(),
            email,
            password: ADMIN_PASSWORD,
            role: 'admin',
            isActive: true,
        })

        console.log('Initial Admin account created successfully.')
        console.log(`Admin email: ${admin.email}`)
    } catch (error) {
        console.error('Admin setup failed:', error.message)
        process.exitCode = 1
    } finally {
        await mongoose.disconnect()
    }
}

createAdmin()
