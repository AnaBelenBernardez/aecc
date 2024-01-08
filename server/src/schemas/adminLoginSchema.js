const Joi = require('joi');

const adminLoginSchema = Joi.object({
    name: Joi.string().max(40).required().messages({
        'string.empty': 'El nombre de usuario no puede estar vacío',
        'string.max': 'El nombre de usuario no puede tener más de 40 caracteres',
        'any.required': 'El nombre de usuario es obligatorio'
    }),
    pwd: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/).messages({
        'string.empty': 'La contraseña no puede estar vacía',
        'string.pattern.base': 'La contraseña debe tener entre 8 y 20 caracteres, contener una minúscula, una mayúscula, un número y un caracter especial.',
        'any.required': 'La contraseña es obligatoria'
    })
});

module.exports = adminLoginSchema;