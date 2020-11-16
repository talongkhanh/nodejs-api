
const User = require('../models/User')
const Deck = require('../models/Deck')

const storeDeck = async (req, res, next) => {
    const { userId } = req.value.params
    const user = await User.findById(userId)

    if (user) {
        const newDeck = new Deck(req.value.body)
        
        newDeck.owner = user._id
        await newDeck.save()
        user.decks.push(newDeck._id)
        await user.save()

        return res.status(201).json(newDeck)
    } else {
        return res.status(404).json({
            error: {
                ststus: 404,
                message: 'User does not exists.'
            }
        })
    }
    
}

const showDeck = async (req, res, next) => {
    const { userId } = req.value.params
    const user = await User.findById(userId).populate('decks')

    if (user) {
        return res.status(200).json(user.decks)
    } else {
        return res.status(404).json({
            error: {
                ststus: 404,
                message: 'User does not exists.'
            }
        })
    }
}

const index = async (req, res, next) => {
    const users = await User.find({})
    return res.status(200).json(users)
}

const store = async (req, res, next) => {
    const newUser = await User.create(req.value.body)
    return res.status(201).json(newUser)
}

const show = async (req, res, next) => {
    const { userId } = req.value.params
    const user = await User.findById(userId)

    if (user) {
        return res.status(200).json(user)
    } else {
        return res.status(404).json({
            error: {
                ststus: 404,
                message: 'User does not exists.'
            }
        })
    }
}

const update = async (req, res, next) => {
    const { userId } = req.value.params
    const user = await User.findById(userId)

    if (user) {
        const newUser = req.value.body
        await user.updateOne(newUser)
        return res.status(200).json({success: true})
    } else {
        return res.status(404).json({
            error: {
                ststus: 404,
                message: 'User does not exists.'
            }
        })
    }   
}

const destroy = async (req, res, next) => {
    const { userId } = req.value.params
    const user = await User.findById(userId)

    if (user) {
        await User.findOneAndDelete(userId)
        return res.status(200).json({success: true})
    } else {
        return res.status(404).json({
            error: {
                ststus: 404,
                message: 'User does not exists.'
            }
        })
    }
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy,
    storeDeck,
    showDeck,
}