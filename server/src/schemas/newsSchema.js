const Joi = require('joi');

const newsSchema = Joi.object({
  title: Joi.string().min(2).max(300).required().messages({
    'string.empty': 'Tienes que escribir el título de la noticia.',
    'string.min': 'El título de la noticia debe tener mínimo 2 caracteres.',
    'string.max': 'El título de la noticia no puede tener más de 300 caracteres.',
    'any.required': 'El título de la noticia es obligatorio.'
  }),
  galician_title: Joi.string().min(2).max(300).required().messages({
    'string.empty': 'Tienes que escribir el título de la noticia.',
    'string.min': 'El título de la noticia debe tener mínimo 2 caracteres.',
    'string.max': 'El título de la noticia no puede tener más de 300 caracteres.',
    'any.required': 'El título de la noticia es obligatorio.'
  }),
  content: Joi.string().min(2).max(1500).required().messages({
    'string.empty': 'El contenido de la noticia es obligatorio.',
    'string.min': 'El contenido de la noticia debe tener mínimo 2 caracteres.',
    'string.max': 'El contenido de la noticia no puede tener más de 1500 caracteres.',
    'any.required': 'El contenido de la noticia es obligatorio.'
  }),
  galician_content: Joi.string().min(2).max(1500).required().messages({
    'string.empty': 'El contenido de la noticia es obligatorio.',
    'string.min': 'El contenido de la noticia debe tener mínimo 2 caracteres.',
    'string.max': 'El contenido de la noticia no puede tener más de 1500 caracteres.',
    'any.required': 'El contenido de la noticia es obligatorio.'
  }),

  news_date: Joi.date().messages({
    'date.format': 'La fecha de la noticia debe ser una fecha (AAAA-MM-DD)'
  }),

  link: Joi.string().uri().required().messages({
    'any.required': 'El link de la noticia es obligatorio.',
    'string.empty': 'El link de la noticia no puede estar vacío.',
    'string.min': 'El link de la noticia debe tener más de 2 caracteres.',
    'string.max': 'El link de la noticia no puede tener más de 500 caracteres.',
    'string.uri': 'El link de la noticia debe ser una URL (https://www.ejemplo.com). Sólo válidas https, no http.'
  })
});

module.exports = newsSchema;