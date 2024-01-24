const Joi = require('joi');

const changePwdSchema = Joi.object({
    oldPwd: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/).messages({
        'string.empty': 'Debe introducir su contraseña actual para poder realizar este cambio',
        'string.pattern.base': 'La contraseña debe tener entre 8 y 20 caracteres, contener una minúscula, una mayúscula, un número y un caracter especial.',
        'any.required': 'La contraseña actual es obligatoria'
    }),
    newPwd: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/).messages({
        'string.empty': 'La nueva contraseña no puede estar vacía',
        'string.pattern.base': 'La nueva contraseña debe tener entre 8 y 20 caracteres, contener una minúscula, una mayúscula, un número y un caracter especial.',
        'any.required': 'La nueva contraseña es obligatoria'
    })
});

module.exports = changePwdSchema;