const Joi = require('joi');

const sponsorSchema = Joi.object({
    name: Joi.string().min(3).max(40).required().messages({
        'string.empty': 'El nombre del patrocinador no puede estar vacío.',
        'string.min': 'El nombre del patrocinador debe tener más de 3 caracteres.',
        'string.max': 'El nombre del patrocinador no puede tener más de 40 caracteres.',
        'any.required': 'El nombre del patrocinador es obligatorio.'
    }),
    galician_name: Joi.string().min(3).max(40).required().messages({
        'string.empty': 'El nombre del patrocinador en gallego no puede estar vacío.',
        'string.min': 'El nombre del patrocinador en gallego debe tener más de 3 caracteres.',
        'string.max': 'El nombre del patrocinador en gallego no puede tener más de 40 caracteres.',
        'any.required': 'El nombre del patrocinador en gallego es obligatorio.'
    }),
    description: Joi.string().min(3).max(500).required().messages({
        'string.empty': 'La descripción es obligatoria',
        'string.min': 'La descripción del patrocinador tiene que tener más de 3 caracteres.',
        'string.max': 'La descripción no puede tener más de 500 caracteres.',
        'any.required': 'La descripción del patrocinador es obligatoria.'
    }),
    galician_description: Joi.string().min(3).max(500).required().messages({
        'string.empty': 'La descripción en gallego es obligatoria',
        'string.min': 'La descripción del patrocinador en gallego tiene que tener más de 3 caracteres.',
        'string.max': 'La descripción en gallego no puede tener más de 500 caracteres.',
        'any.required': 'La descripción del patrocinador en gallego es obligatoria.'
    }),
    link: Joi.string().uri().messages({
        'string.min': 'El link del patrocinador debe tener más de 2 caracteres.',
        'string.max': 'El link del patrocinador no puede tener más de 500 caracteres.',
        'string.uri': 'El link del patrocinador debe ser una URL (https://www.ejemplo.com). Sólo válidas https, no http.'
    }),
    important: Joi.number().default(0),
});

module.exports = sponsorSchema;