
const router = require('express-promise-router')()

const { validateBody, validateParam, schemas } = require('../helpers/route')

const userController = require('../controllers/user')

router.route('/:userId/decks')
    .post(
        validateParam(schemas.idSchema, 'userId'), 
        validateBody(schemas.deckSchema), 
        userController.storeDeck
    )
    .get(
        validateParam(schemas.idSchema, 'userId'), 
        userController.showDeck
    )

router.route('/:userId')
    .get(
        validateParam(schemas.idSchema, 'userId'), 
        userController.show
    )
    .put(
        validateParam(schemas.idSchema, 'userId'), 
        validateBody(schemas.userSchema), 
        userController.update
    )
    .patch(
        validateParam(schemas.idSchema, 'userId'), 
        validateBody(schemas.userOptionSchema), 
        userController.update
    )
    .delete(
        validateParam(schemas.idSchema, 'userId'), 
        userController.destroy
    )

router.route('/')
    .get(userController.index)
    .post(
        validateBody(schemas.userSchema), 
        userController.store
    )

module.exports = router;