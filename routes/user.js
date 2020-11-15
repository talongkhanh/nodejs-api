
const router = require('express-promise-router')()

const userController = require('../controllers/user')

router.route('/')
    .get(userController.index)
    .post(userController.create)

module.exports = router;