const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const User = require('../models/user-model')
const { validationResult } = require('express-validator')

const usersController = {}

usersController.register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const body = _.pick(req.body, ['username', 'email', 'password'])
        const user = new User(body)
        const salt = await bcryptjs.genSalt()
        const hashedPassword = await bcryptjs.hash(user.password, salt)
        user.password = hashedPassword
        await user.save()
        res.status(200).json({ message: 'user registerd sucessfully', user: user })



    } catch (e) {
        res.status(400).json({ message: 'register failed', e })
    }
}

usersController.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    try {
        const body = _.pick(req.body, ['email', 'password'])
        const user = await User.findOne({ email: body.email })
        if (user) {
            const result = await bcryptjs.compare(body.password, user.password)
            if (result) {
                const tokenData = {
                    _id: user._id
                }
                const token = await jwt.sign(tokenData, process.env.JWT_SECRET)
                res.status(200).json({ message: 'user login sucessfully', token: token })
            } else {
                res.status(400).json({ errors: [{ msg: 'invalid email/password' }] })
            }
        } else {
            res.status(400).json({ errors: [{ msg: 'invalid email/password' }] })
        }

    } catch (e) {
        res.status(400).json(e)
    }
}

usersController.account = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json({ errors: 'user not found' })
    }
}



module.exports = usersController