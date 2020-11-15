
const User = require('../models/User')

const index = async (req, res, next) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }

}

const create = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    index,
    create,
}