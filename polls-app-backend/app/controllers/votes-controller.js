const Vote = require('../models/vote-model')
const Poll = require("../models/poll-model")
const votesController = {}
const { validationResult } = require('express-validator')


votesController.create = async (req, res) => {
    const body = req.body
    const pollId = req.params.pollId.trim()

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const vote = new Vote(body)
    vote.user = req.user._id
    vote.poll = pollId.trim()
    try {
        await vote.save()
        res.json(vote)
    } catch (e) {
        res.status(500).json(e)
    }
}


votesController.myVotes = async (req, res) => {
    try {
        const votes = await Vote.find({ user: req.user._id })
        res.json(votes)
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports = votesController