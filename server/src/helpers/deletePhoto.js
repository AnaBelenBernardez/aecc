const fs = require('fs/promises');
const path = require('path');

async function deletePhoto (photo){
    
    const dir = process.env.UPLOADS_DIR;

    const photoPath = path.join(__dirname,'../',dir,photo);

    await fs.unlink(photoPath);
};

module.exports = deletePhoto;