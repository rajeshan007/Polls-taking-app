const mongoose = require('mongoose')
const { Schema, model } = mongoose

const pollSchema = new Schema({
    question: String,
    options: [
        { optionText: String }
    ],
    createdDate: Date,
    endDate: Date,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Poll = model('Poll', pollSchema)

module.exports = Poll