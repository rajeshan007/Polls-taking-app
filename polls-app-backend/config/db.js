require('dotenv').config()
const mongoose = require('mongoose')


const configureDb = async () => {
    try {
        const db = await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
        console.log('connected to db', process.env.DB_NAME);
    } catch (e) {
        console.log('error connecting to db', e);
    }
}


module.exports = configureDb
