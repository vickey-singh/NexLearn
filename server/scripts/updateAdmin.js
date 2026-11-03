
require('dotenv').config()

const mongoose = require('mongoose')
const connectDB = require('../config/db')
const User = require('../models/User')

const updateAdmin = async () => {
    try {
        const {
            ADMIN_CURRENT_EMAIL,
            ADMIN_NAME,
            ADMIN_EMAIL,
            ADMIN_PASSWORD,
        } = process.env

        if (
            !ADMIN_CURRENT_EMAIL ||
            !ADMIN_EMAIL ||
            !ADMIN_PASSWORD
        ) {
            throw new Error(
                'ADMIN_CURRENT_EMAIL, ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env'
            )
        }

        if (ADMIN_PASSWORD.length < 8) {
            throw new Error(
                'Admin password must be at least 8 characters long'
            )
        }

        await connectDB()

        const currentEmail =
            ADMIN_CURRENT_EMAIL.trim().toLowerCase()

        const newEmail =
            ADMIN_EMAIL.trim().toLowerCase()

        // Find existing admin account
        const admin = await User.findOne({
            email: currentEmail,
            role: 'admin',
        })

        if (!admin) {
            throw new Error(
                'Existing admin account not found. No changes made.'
            )
        }

        // Check whether the new email belongs to another account
        const emailExists = await User.findOne({
            email: newEmail,
            _id: { $ne: admin._id },
        })

        if (emailExists) {
            throw new Error(
                'New email already belongs to another account. No changes made.'
            )
        }

        // Update existing admin
        if (ADMIN_NAME && ADMIN_NAME.trim()) {
            admin.name = ADMIN_NAME.trim()
        }

        admin.email = newEmail
        admin.password = ADMIN_PASSWORD

        // Existing role and account status remain unchanged.
        // User.js pre-save middleware automatically hashes password.
        await admin.save()

        console.log('--------------------------------')
        console.log('Admin account updated successfully.')
        console.log(`New Admin Email: ${admin.email}`)
        console.log(`Admin Role: ${admin.role}`)
        console.log(`Account Active: ${admin.isActive}`)
        console.log('Password updated and securely hashed.')
        console.log('--------------------------------')

    } catch (error) {
        console.error('Admin update failed:', error.message)
        process.exitCode = 1
    } finally {
        await mongoose.disconnect()
    }
}

updateAdmin()
