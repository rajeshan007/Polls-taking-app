const Category = require('../models/category-model')
const { validationResult } = require('express-validator')

const categoriesController = {}

categoriesController.create = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const body = req.body
    const category = new Category(body)
    try {
        await category.save()
        res.status(200).json(category)
    } catch (e) {
        res.status(500).json({ errors: "something went wrong", e })

    }


}


categoriesController.list = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (e) {
        res.status(500).json({ errors: 'something went wrong' })
    }
}


module.exports = categoriesController