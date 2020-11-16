
const User = require('../models/User')
const Deck = require('../models/Deck')

const storeDeck = async (req, res, next) => {
    const { userId } = req.params
    const newDeck = new Deck(req.body)
    const user = await User.findById(userId)

    newDeck.owner = user._id
    await newDeck.save()
    user.decks.push(newDeck._id)
    await user.save()

    return res.status(201).json(newDeck)
}

const showDeck = async (req, res, next) => {
    const { userId } = req.params
    const user = await User.findById(userId).populate('decks')
    return res.status(200).json(user.decks)
}

const index = async (req, res, next) => {
    const users = await User.find({})
    return res.status(200).json(users)
}

const store = async (req, res, next) => {
    const newUser = await User.create(req.body)
    return res.status(201).json(newUser)
}

const show = async (req, res, next) => {
    const { userId } = req.params
    const user = await User.findById(userId)
    return res.status(200).json(user)
}

const update = async (req, res, next) => {
    const { userId } = req.params
    const newUser = req.body
    await User.findByIdAndUpdate(userId, newUser)
    return res.status(200).json({success: true})
}

const destroy = async (req, res, next) => {
    const { userId } = req.params
    await User.findOneAndDelete(userId)
    return res.status(200).json({success: true})
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