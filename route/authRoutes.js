const {
    registerController,
    loginController
} = require('../controllers/authController')
const loginValidator = require('../middleware/loginValidator')
const registerValidation = require('../middleware/registerValidation')
const requireLogin = require('../middleware/requireLogin')
const {
    login_validator
} = require('../middleware/loginValidator')
const {
    register_validator
} = require('../middleware/registerValidation')

const router = require('express').Router()




router.post('/register', registerValidation, register_validator, registerController)


router.post('/login', loginValidator, login_validator, loginController)

router.get('/hello', requireLogin, (req, res) => {

    res.send('hello')
})


module.exports = router