const Joi = require('joi');

const achievementSchema = Joi.object({
    description: Joi.string().min(3).max(200).required().messages({
        'string.empty': 'La descripción es obligatoria',
        'string.min': 'La descripción del logro tiene que tener más de 3 caracteres.',
        'string.max': 'La descripción no puede tener más de 200 caracteres.',
        'any.required': 'La descripción del logro es obligatoria.'
    }),
    galician_description: Joi.string().min(3).max(200).required().messages({
        'string.empty': 'La descripción en gallego es obligatoria',
        'string.min': 'La descripción del logro en gallego tiene que tener más de 3 caracteres.',
        'string.max': 'La descripción en gallego no puede tener más de 200 caracteres.',
        'any.required': 'La descripción del logro en gallego es obligatoria.'
    })
});

module.exports = achievementSchema;