const Poll = require('../models/poll-model')
const User = require('../models/user-model')
const Category = require('../models/category-model')
const { validationResult } = require('express-validator')
const pollsController = {}


pollsController.create = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const body = req.body
    const poll = new Poll(body)
    poll.creator = req.user._id


    try {
        await poll.save()
        // find the user by using id and then push 
        await User.findOneAndUpdate({ _id: poll.creator }, { $push: { pollsCreated: poll._id } })
        res.json(poll)

    } catch (e) {
        res.status(500).json({ errors: 'something went wrong' })
    }

}

pollsController.myPolls = async (req, res) => {

    try {
        const myPolls = await Poll.find({ creator: req.user._id }).populate('categoryId').populate('creator', ['username', '_id'])
        res.json(myPolls)

    } catch (e) {
        res.json(e)
    }
}

pollsController.activePolls = async (req, res) => {
    // find the polls in which end date is greater than or equal to todays date
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    try {
        const polls = await Poll.find({ endDate: { $gte: new Date() } }).populate('categoryId').populate('creator', ['username', '_id'])
        res.json(polls)
    } catch (e) {
        res.status(500).json(e)
    }
}

pollsController.categories = async (req, res) => {
    const name = req.params.name
    try {
        const category = await Category.findOne({ name: name })
        if (category) {
            const poll = await Poll.find({ categoryId: category._id })
            res.json(poll)
        } else {
            res.status(404).json({ errors: 'category not found' })
        }
    } catch (e) {
        res.status(500).json(e)
    }


}



module.exports = pollsController