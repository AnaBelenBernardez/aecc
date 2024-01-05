const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');
/* const generateError = require('../helpers/generateError'); */
require('dotenv').config();

async function savePhoto (photo, width) {

  //revisar path 
  const uploadsPath = path.resolve(__dirname, '../', process.env.UPLOADS_DIR);

  try {
    await fs.access(uploadsPath);
  } catch {
    await fs.mkdir(uploadsPath);
  }

  try {
    const image = sharp(photo.data);
    image.resize(width);

    const imageName = uuid.v4() + path.extname(photo.name);

    const imagePath = path.join(uploadsPath, imageName);

    await image.toFile(imagePath);

    return imageName;
  } catch (error) {
    throw new Error(error.message)/* generateError(error, 500); */
  }
}

module.exports = savePhoto;