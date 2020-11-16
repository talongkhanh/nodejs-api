
const router = require('express-promise-router')()

const userController = require('../controllers/user')

router.route('/:userId/decks')
    .post(userController.storeDeck)
    .get(userController.showDeck)

router.route('/:userId')
    .get(userController.show)
    .put(userController.update)
    .patch(userController.update)
    .delete(userController.destroy)

router.route('/')
    .get(userController.index)
    .post(userController.store)

module.exports = router;