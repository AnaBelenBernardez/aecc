const Joi = require('joi')

const eventSchema = Joi.object({
    title: Joi.string().min(2).max(100).required().messages({
        'string.empty': 'Tienes que escribir el nombre del evento.',
        'string.min': 'El nombre del evento debe tener mínimo 2 caracteres.',
        'string.max': 'El nombre del evento no puede tener más de 100 caracteres.',
        'any.required': 'El nombre del evento es obligatorio.'
    }),
    content: Joi.string().min(2).max(5000).required().messages({
        'string.empty': 'La descripción es obligatoria',
        'string.min': 'La descripción del evento tiene que tener mínimo 2 caracteres.',
        'string.max': 'La descripción no puede tener más de 5000 caracteres.',
        'any.required': 'La descripción del evento es obligatoria.'
    }),
    location: Joi.string().valid('Abegondo', 'Ames', 'Aranga', 'Ares', 'Arteixo', 'Arzúa', 'Baña, A', 'Bergondo', 'Betanzos', 'Boimorto', 'Boiro', 'Boqueixón', 'Brion', 'Cabana de Bergantiños', 'Cabanas', 'Camariñas', 'Cambre', 'Capela, A', 'Carballo', 'Cariño', 'Carnote', 'Cedeira', 'Cerceda', 'Cerdido', 'Cesuras', 'Corcubión', 'Coristanco', 'Coruña, A', 'Culleredo', 'Curtis', 'Dodro', 'Dumbria', 'Ferrol', 'Fisterra', 'Frades', 'Irixoa', 'Laracha, A', 'Laxe', 'Lousame', 'Malpica de Bergantiños', 'Mañón', 'Mazaricos', 'Melide', 'Mesía', 'Moeche', 'Monfero', 'Mugardos', 'Muros', 'Muxía', 'Narón', 'Neda', 'Negreira', 'Noia', 'Oleiros', 'Ordes', 'Oroso', 'Ortigueira', 'Outes', 'Oza dos Ríos', 'Padrón', 'Pedrouzo, O', 'Ponteceso', 'Pontedeume', 'Pontes de García Rodríguez', 'Poyo, O', 'Ribeira', 'Rois', 'Sada', 'San Sadurniño', 'Santa Comba', 'Santiago de Compostela', 'Santiso', 'Sobrado', 'Somozas, As', 'Teo', 'Toques', 'Tordoia', 'Touro', 'Trazo', 'Val do Dubra', 'Valdoviño', 'Vedra', 'Vilarmaior', 'Vilasantar', 'Vimianzo', 'Zas').required().messages({
        'string.empty': 'La localización del evento no puede estar vacía.',
        'any.required': 'La localización del evento es obligatorio.',
        'any.only': 'La localización debe ser un municipio de A Coruña'
    }),
    event_type: Joi.string().valid('Carrera', 'Andaina', 'Travesía a nado', 'Pádel', 'Ruta en bicicleta', 'Otros').required().messages({
      'string.empty': 'El tipo del evento no puede estar vacío.',
      'any.required': 'El tipo del evento es obligatorio.',
      'any.only': 'El tipo del evento deber ser uno de los siguientes [Andaina, Carrera, Pádel, Ruta en bicicleta, Travesía a nado, Otros]'
  }),
  date_start: Joi.date().required().messages({
    'any.required': 'La fecha de inicio del evento es obligatoria.',
    'string.empty': 'La fecha de inicio del evento no puede estar vacía.',
    'date.format': 'La fecha de inicio del evento debe ser una fecha (AAAA-MM-DD)'
  }),
  date_end: Joi.date().required().messages({
    'any.required': 'La fecha de finalización del evento es obligatoria.',
    'string.empty': 'La fecha de finalización del evento no puede estar vacía.',
    'date.format': 'La fecha de finalización del evento debe ser una fecha (AAAA-MM-DD)'
  }),
  link: Joi.string().uri().required().messages({
      'any.required': 'El link del evento es obligatorio.',
      'string.empty': 'El link del evento no puede estar vacío.',
      'string.min': 'El link del evento debe tener más de 2 caracteres.',
      'string.max': 'El link del evento no puede tener más de 500 caracteres.',
      'string.uri': 'El link del evento debe ser una URL (https://www.ejemplo.com). Sólo válidas https, no http.'
  })
});

module.exports = eventSchema;