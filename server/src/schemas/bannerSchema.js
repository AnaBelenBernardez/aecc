const Joi = require('joi');

const bannerSchema = Joi.object({
    title: Joi.string().min(2).max(300).required().messages({
        'string.empty': 'Tienes que escribir el título del banner.',
        'string.min': 'El título del banner debe tener mínimo 2 caracteres.',
        'string.max': 'El título del banner no puede tener más de 300 caracteres.',
        'any.required': 'El título del banner es obligatorio.'
    }),
    galician_title: Joi.string().min(2).max(300).required().messages({
        'string.empty': 'Tienes que escribir el título del banner en gallego.',
        'string.min': 'El título del banner en gallego debe tener mínimo 2 caracteres.',
        'string.max': 'El título del banner en gallego no puede tener más de 300 caracteres.',
        'any.required': 'El título del banner en gallego es obligatorio.'
    }),
    subtitle: Joi.string().min(2).max(500).required().messages({
        'string.empty': 'El subtítulo del banner es obligatorio.',
        'string.min': 'El subtítulo del banner debe tener mínimo 2 caracteres.',
        'string.max': 'El subtítulo del banner no puede tener más de 500 caracteres.',
        'any.required': 'El subtítulo del banner es obligatorio.'
    }),
    galician_subtitle: Joi.string().min(2).max(500).required().messages({
        'string.empty': 'El subtítulo del banner en gallego es obligatorio.',
        'string.min': 'El subtítulo del banner en gallego debe tener mínimo 2 caracteres.',
        'string.max': 'El subtítulo del banner en gallego no puede tener más de 500 caracteres.',
        'any.required': 'El subtítulo del banner en gallego es obligatorio.'
    }),
    button_text: Joi.string().min(2).max(50).required().messages({
        'string.empty': 'El texto del botón del banner es obligatorio.',
        'string.min': 'El texto del botón del banner debe tener mínimo 2 caracteres.',
        'string.max': 'El texto del botón del banner no puede tener más de 50 caracteres.',
        'any.required': 'El texto del botón del banner es obligatorio.'
    }),
    galician_button_text: Joi.string().min(2).max(50).required().messages({
        'string.empty': 'El texto del botón del banner en gallego es obligatorio.',
        'string.min': 'El texto del botón del banner en gallego debe tener mínimo 2 caracteres.',
        'string.max': 'El texto del botón del banner en gallego no puede tener más de 50 caracteres.',
        'any.required': 'El texto del botón del banner en gallego es obligatorio.'
    }),
    button_link: Joi.string().min(2).max(300).required().messages({
        'any.required': 'El enlace del botón del banner es obligatorio.',
        'string.empty': 'El enlace del botón del banner no puede estar vacío.',
        'string.min': 'El enlace del botón del banner debe tener más de 2 caracteres.',
        'string.max': 'El enlace del botón del banner no puede tener más de 300 caracteres.'
    })
});

module.exports = bannerSchema;
