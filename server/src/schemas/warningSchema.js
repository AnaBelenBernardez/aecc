const Joi = require('joi');

const warningSchema = Joi.object({
    title: Joi.string().min(5).max(300).required().messages({
        'string.empty': 'El nombre del patrocinador no puede estar vacío.',
        'string.min': 'El nombre del patrocinador debe tener más de 3 caracteres.',
        'string.max': 'El nombre del patrocinador no puede tener más de 40 caracteres.',
        'any.required': 'El nombre del patrocinador es obligatorio.'
    }),
    galician_title: Joi.string().min(5).max(300).required().messages({
        'string.empty': 'El nombre del patrocinador no puede estar vacío.',
        'string.min': 'El nombre del patrocinador debe tener más de 3 caracteres.',
        'string.max': 'El nombre del patrocinador no puede tener más de 40 caracteres.',
        'any.required': 'El nombre del patrocinador es obligatorio.'
    }),
    content: Joi.string().min(3).max(500).required().messages({
        'string.empty': 'La descripción es obligatoria',
        'string.min': 'La descripción del patrocinador tiene que tener más de 3 caracteres.',
        'string.max': 'La descripción no puede tener más de 500 caracteres.',
        'any.required': 'La descripción del patrocinador es obligatoria.'
    }),
    galician_content: Joi.string().min(3).max(500).required().messages({
        'string.empty': 'La descripción es obligatoria',
        'string.min': 'La descripción del patrocinador tiene que tener más de 3 caracteres.',
        'string.max': 'La descripción no puede tener más de 500 caracteres.',
        'any.required': 'La descripción del patrocinador es obligatoria.'
    }),
    warning_date: Joi.date().messages({
        'date.format': 'Debes introducir un dato con formato fecha (AAAA/MM/DD)'
    }),
    link: Joi.string().uri().messages({
        'string.min': 'El link del patrocinador debe tener más de 2 caracteres.',
        'string.max': 'El link del patrocinador no puede tener más de 500 caracteres.',
        'string.uri': 'El link del patrocinador debe ser una URL (https://www.ejemplo.com). Sólo válidas https, no http.'
    })
});

module.exports = warningSchema;