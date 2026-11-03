
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            maxlength: 254,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please enter a valid email address',
            ],
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },

        role: {
            type: String,
            enum: ['admin', 'teacher', 'student'],
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

// Hash password before saving a new password.
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return
    }

    this.password = await bcrypt.hash(this.password, 8)
})

// Compare submitted password with the stored hash.
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
