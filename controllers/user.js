
const index = (req, res) => {
    res.status(200).json({
        message: 'Get all user'
    })
}

module.exports = {
    index,
}