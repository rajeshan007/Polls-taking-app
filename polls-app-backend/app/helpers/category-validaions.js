
const Category = require('../models/category-model')
const nameSchema = {
    notEmpty: {
        errorMessage: 'name is required'
    },
    custom: {
        options: async (value) => {
            const category = await Category.findOne({ name: { '$regex': value, $options: 'i' } })
            if (!category) {
                return true
            } else {
                throw new Error('category name is already present')
            }

        }
    }
}


const categoryValidation = {
    name: nameSchema
}

module.exports = categoryValidation

