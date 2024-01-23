const Joi = require('joi');

const experienceSchema = Joi.object({
  name: Joi.string().min(3).max(40).required().messages({
    'string.empty': 'El nombre de la experiencia no puede estar vacío.',
    'string.min': 'El nombre de la experiencia debe tener más de 3 caracteres.',
    'string.max': 'El nombre de la experiencia no puede tener más de 40 caracteres.',
    'any.required': 'El nombre de la experiencia es obligatorio.'
  }),
  content: Joi.string().min(3).max(500).required().messages({
    'string.empty': 'La descripción es obligatoria',
    'string.min': 'La descripción de la experiencia tiene que tener más de 3 caracteres.',
    'string.max': 'La descripción no puede tener más de 500 caracteres.',
    'any.required': 'La descripción de la experiencia es obligatoria.'
  }),
  galician_content: Joi.string().min(3).max(500).required().messages({
    'string.empty': 'La descripción es obligatoria',
    'string.min': 'La descripción de la experiencia tiene que tener más de 3 caracteres.',
    'string.max': 'La descripción no puede tener más de 500 caracteres.',
    'any.required': 'La descripción de la experiencia es obligatoria.'
  })
});

module.exports = experienceSchema