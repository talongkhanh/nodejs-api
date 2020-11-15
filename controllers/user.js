
const User = require('../models/User')

const index = async (req, res, next) => {
    const users = await User.find({})
    return res.status(200).json(users)
}

const create = async (req, res, next) => {
    const newUser = await User.create(req.body)
    return res.status(201).json(newUser)
}

module.exports = {
    index,
    create,
}