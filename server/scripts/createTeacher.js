
require('dotenv').config()

const mongoose = require('mongoose')
const connectDB = require('../config/db')
const User = require('../models/User')

// ======================================
// CREATE DEMO TEACHER
// ======================================

const createTeacher = async () => {
  try {
    // Connect MongoDB
    await connectDB()

    const name = process.env.TEACHER_NAME
    const email = process.env.TEACHER_EMAIL
    const password = process.env.TEACHER_PASSWORD

    // Validate environment variables
    if (!name || !email || !password) {
      throw new Error(
        'Please provide TEACHER_NAME, TEACHER_EMAIL and TEACHER_PASSWORD in .env'
      )
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long.')
    }

    const normalizedEmail = email.trim().toLowerCase()

    // Check existing account
    const existingTeacher = await User.findOne({
      email: normalizedEmail,
    })

    if (existingTeacher) {
      console.log('An account with this email already exists.')
      console.log('Email:', normalizedEmail)
      console.log('Existing role:', existingTeacher.role)

      return
    }

    // Create teacher account
    const teacher = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: 'teacher',
      isActive: true,
    })

    console.log('\n================================')
    console.log('DEMO TEACHER CREATED SUCCESSFULLY')
    console.log('================================')
    console.log('Name:', teacher.name)
    console.log('Email:', teacher.email)
    console.log('Role:', teacher.role)
    console.log('Status: Active')
    console.log('================================\n')

  } catch (error) {
    console.error('Teacher creation failed:', error.message)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

createTeacher()
