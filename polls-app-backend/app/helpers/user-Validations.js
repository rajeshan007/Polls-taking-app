
const User = require('../models/user-model')
const usernameSchema = {
    notEmpty: {
        errorMessage: 'username is required'
    }
}

const emailSchema = {
    notEmpty: {
        errorMessage: 'email is required',
    },
    isEmail: {
        errorMessage: 'Invalid email'
    },
    custom: {
        options: async (value) => {
            const user = await User.findOne({ email: value })
            // if user email is already present throw error
            if (user) {
                throw new Error('email is already registered')
            } else {
                return true
            }
        }
    }
}

const passwordSchema = {
    notEmpty: {
        errorMessage: 'password is required'
    },
    isLength: {
        errorMessage: 'password should between 8 to 128 characters',
        options: { min: 3, max: 128 }
    }
}


const userRegistrationSchema = {
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema
}


const loginEmailSchema = {
    notEmpty: {
        errorMessage: 'email is required'
    },
    isEmail: {
        errorMessage: 'invalid email'
    }
}

const userLoginSchema = {
    email: loginEmailSchema,
    password: passwordSchema
}


module.exports = {
    userRegistrationSchema,
    userLoginSchema
}


