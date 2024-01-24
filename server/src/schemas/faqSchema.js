const Joi = require('joi')

const faqSchema = Joi.object({
    question: Joi.string().min(5).max(300).required().messages({
        'string.empty': 'Es obligatorio introducir la pregunta.',
        'string.min': 'La pregunta debe tener mínimo 5 caracteres.',
        'string.max': 'La pregunta no puede tener más de 300 caracteres.',
        'any.required': 'La pregunta es obligatoria.'
    }),
    galician_question: Joi.string().min(5).max(300).required().messages({
        'string.empty': 'Es obligatorio introducir la pregunta en gallego.',
        'string.min': 'La pregunta en gallego debe tener mínimo 5 caracteres.',
        'string.max': 'La pregunta en gallego no puede tener más de 300 caracteres.',
        'any.required': 'La pregunta en gallego es obligatoria.'
    }),
    answer: Joi.string().min(5).max(300).required().messages({
        'string.empty': 'Es obligatorio introducir la respuesta.',
        'string.min': 'La respuesta debe tener mínimo 5 caracteres.',
        'string.max': 'La respuesta no puede tener más de 300 caracteres.',
        'any.required': 'La respuesta es obligatoria.'
    }),
    galician_answer: Joi.string().min(5).max(300).required().messages({
        'string.empty': 'Es obligatorio introducir la respuesta en gallego.',
        'string.min': 'La respuesta en gallego debe tener mínimo 5 caracteres.',
        'string.max': 'La respuesta en gallego no puede tener más de 300 caracteres.',
        'any.required': 'La respuesta en gallego es obligatoria.'
    })
});

module.exports = faqSchema;