const Vote = require('../models/vote-model')
const voteValidationSchema = {
    option: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'option is required'
        },
        isMongoId: {
            errorMessage: 'should be a valid id'
        }
    },
    pollId: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'should be a valid id'
        },
        isMongoId: {
            errorMessage: 'shoule be a valid id'
        },

    },
    user: {
        custom: {
            options: async (value, { req }) => {
                const vote = await Vote.findOne({ user: req.user._id, poll: req.params.pollId })
                if (vote) {
                    throw new Error('you have already casted your vote')
                } else {
                    return true
                }
            }
        }
    }
}




module.exports = voteValidationSchema