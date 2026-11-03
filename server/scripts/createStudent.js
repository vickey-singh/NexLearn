require('dotenv').config()

const mongoose = require('mongoose')
const connectDB = require('../config/db')
const User = require('../models/User')

const createStudent = async () => {
    try {
        const {
            STUDENT_NAME,
            STUDENT_EMAIL,
            STUDENT_PASSWORD,
        } = process.env

        if (
            !STUDENT_NAME ||
            !STUDENT_EMAIL ||
            !STUDENT_PASSWORD
        ) {
            throw new Error(
                'STUDENT_NAME, STUDENT_EMAIL and STUDENT_PASSWORD must be set in .env'
            )
        }

        if (STUDENT_PASSWORD.length < 8) {
            throw new Error(
                'Student password must be at least 8 characters long'
            )
        }

        await connectDB()

        const email = STUDENT_EMAIL.trim().toLowerCase()

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            throw new Error(
                'This email already exists. No account was created.'
            )
        }

        const student = await User.create({
            name: STUDENT_NAME.trim(),
            email,
            password: STUDENT_PASSWORD,
            role: 'student',
            isActive: true,
        })

        console.log('--------------------------------')
        console.log('Demo Student account created successfully.')
        console.log(`Student Name: ${student.name}`)
        console.log(`Student Email: ${student.email}`)
        console.log(`Student Role: ${student.role}`)
        console.log('Password securely hashed.')
        console.log('--------------------------------')

    } catch (error) {
        console.error('Student setup failed:', error.message)
        process.exitCode = 1
    } finally {
        await mongoose.disconnect()
    }
}

createStudent()