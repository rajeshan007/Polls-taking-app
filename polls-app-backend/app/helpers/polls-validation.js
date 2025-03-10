const pollValiadtions = {
    question: {
        notEmpty: {
            errorMessage: 'question is required'
        }
    },
    createdDate: {
        isDate: {
            errorMessage: 'date should be valid',
            format: 'YYYY-MM-DD'
        },
        custom: {
            options: (value) => {
                //created date cannot be lesser than todays date
                const todays = new Date()
                const year = todays.getFullYear(), month = todays.getMonth() + 1, day = todays.getDate()
                if (new Date(value) < new Date(`${year}-${month}-${day}`)) {
                    throw new Error('created date cannot be lesser than todays date')
                } else {
                    return true
                }
            }
        }
    },
    endDate: {
        isDate: {
            errorMessage: 'date should be valid',
            format: 'YYYY-MM-DD'
        },
        custom: {
            options: (value, { req }) => {

                // end date cannot be less than created date 
                if (new Date(value) < new Date(req.body.createdDate)) {
                    throw new Error(' poll end date cannot be less than the created date  ')
                } else {
                    return true
                }
            }
        }
    },
    categoryId: {
        isMongoId: {
            errorMessage: 'should be a valid MongoDb Id '
        }
    },
    options: {
        isArray: {
            options: { min: 2 },
            errorMessage: 'there should be minium 2 options'
        },
        custom: {
            options: (value) => {
                // check if every option conatain option text using array every method
                const result = value.every(ele => {
                    return ele.optionText.trim().length > 0
                })
                if (!result) {
                    throw new Error('options cannot be empty')
                } else {
                    return true
                }
            }
        }
    }
}




module.exports = pollValiadtions