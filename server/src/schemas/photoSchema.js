const Joi = require('joi');
const generateError = require('../helpers/generateError');

const photoSchema = Joi.object({
  name: Joi.string().required(),
  data: Joi.any().required(),
  size: Joi.number().required(),
  encoding: Joi.string(),
  tempFilePath: Joi.any(),
  truncated: Joi.boolean(),
  mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png', 'image/webp').required().error(() => generateError('El formato de la foto debe ser JPEG, PNG, WEBP o JPG', 400)),
  md5: Joi.string(),
  mv: Joi.func()
}).messages({

});

const arrayPhotoSchema = Joi.array().items(photoSchema);

module.exports = { photoSchema, arrayPhotoSchema };
