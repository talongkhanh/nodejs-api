
const Joi = require('joi')

const validateParam = (schema, name) => {
    return (req, res, next) => {
        const result = schema.validate({ param: req.params[name] })
        if(result.error) {
            return res.status(400).json({ 
                ststus: 400,
                error: 'Bad Request',
            })
        }

        if(!req.value) req.value = {}
        if(!req.value.params) req.value.params = {}
        req.value.params[name] = req.params[name]

        next()
    }
}

const schemas = {
    idSchema: Joi.object({
        param: Joi.string().regex(/^[a-fA-f0-9]{24}$/).required()
    })
}


module.exports = {
    validateParam,
    schemas,
}