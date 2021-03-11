const {
    add_category_controller,get_category_controller
} = require('../controllers/categoryController')
const {
    admin_authentication
} = require('../middleware/authentication')
const requireLogin = require('../middleware/requireLogin')


const router = require('express').Router()






router.post('/add-category', requireLogin, admin_authentication, add_category_controller)
router.get('/get-category', requireLogin, admin_authentication, get_category_controller)


module.exports = router