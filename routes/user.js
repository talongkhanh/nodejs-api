
const router = require('express-promise-router')()

const { validateParam, schemas } = require('../helpers/route')

const userController = require('../controllers/user')

router.route('/:userId/decks')
    .post(validateParam(schemas.idSchema, 'userId'), userController.storeDeck)
    .get(validateParam(schemas.idSchema, 'userId'), userController.showDeck)

router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), userController.show)
    .put(validateParam(schemas.idSchema, 'userId'), userController.update)
    .patch(validateParam(schemas.idSchema, 'userId'), userController.update)
    .delete(validateParam(schemas.idSchema, 'userId'), userController.destroy)

router.route('/')
    .get(userController.index)
    .post(userController.store)

module.exports = router;