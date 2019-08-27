const router = require('express').Router()

const {login, register} =  require('../controllers/userController')

// Registration Route
// localhost:4000/api/users/register
router.post('/register', register)

// Login router

router.post('/login', login)

module.exports = router