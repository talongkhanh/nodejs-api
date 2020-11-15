
const router = require('express').Router()

const userController = require('../controllers/user')

router.route('/')
    .get(userController.index)
    .post()

module.exports = router;