
const Joi = require('joi')

const validateParam = (schema, name) => {
    return (req, res, next) => {
        const result = schema.validate({ param: req.params[name] })
        if(result.error) {
            return res.status(400).json({ 
                ststus: 400,
                error: result.error,
            })
        }

        if(!req.value) req.value = {}
        if(!req.value.params) req.value.params = {}
        req.value.params[name] = req.params[name]

        next()
    }
}

const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body)
        if(result.error) {
            return res.status(400).json({ 
                ststus: 400,
                error: result.error,
            })
        }

        if(!req.value) req.value = {}
        if(!req.value.body) req.value.body = {}
        req.value.body = result.value
        next()
    }
}

const schemas = {
    idSchema: Joi.object({
        param: Joi.string().regex(/^[a-fA-f0-9]{24}$/).required()
    }),

    userSchema: Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
    }),

    userOptionSchema: Joi.object({
        firstName: Joi.string().min(2),
        lastName: Joi.string().min(2),
        email: Joi.string().email(),
    }),

    deckSchema: Joi.object({
        name: Joi.string().min(6).required(),
        description: Joi.string().min(10).required(),
    })
}


module.exports = {
    validateParam,
    validateBody,
    schemas,
}