require('dotenv').config()
const express = require('express')
const cors = require('cors')
const configureDb = require('./config/db')
const { checkSchema } = require('express-validator')
const app = express()



app.use(express.json())
app.use(cors())
configureDb()

const usersController = require('./app/controllers/user-ctlr')
const { userRegistrationSchema, userLoginSchema } = require('./app/helpers/user-Validations')
const { authenticateUser } = require('./app/middlewares/authenticateUser')
const categoriesController = require('./app/controllers/categories-controller')
const categoryValidation = require('./app/helpers/category-validaions')
const pollsController = require('./app/controllers/polls-controller')
const pollValiadtions = require('./app/helpers/polls-validation')
const votesController = require('./app/controllers/votes-controller')
const voteValidationSchema = require('./app/helpers/vote-validations')

// user routes 
app.post('/api/users/register', checkSchema(userRegistrationSchema), usersController.register)
app.post('/api/users/login', checkSchema(userLoginSchema), usersController.login)
app.get('/api/users/account', authenticateUser, usersController.account)

// category routes
app.post('/api/categories/create', authenticateUser, checkSchema(categoryValidation), categoriesController.create)
app.get('/api/categories', categoriesController.list)

// polls routes 
app.get('/api/polls/activePolls', pollsController.activePolls)
app.post('/api/polls/create', authenticateUser, checkSchema(pollValiadtions), pollsController.create)
app.get('/api/polls/mypolls', authenticateUser, pollsController.myPolls)

// votes routes 
app.post('/api/polls/vote/:pollId', authenticateUser, checkSchema(voteValidationSchema), votesController.create)
app.get('/api/polls/category/:name', pollsController.categories)
app.get('/api/votes/myvotes', authenticateUser, votesController.myVotes)

app.listen(process.env.PORT, () => {
    console.log('server is running on port', process.env.PORT);
})
