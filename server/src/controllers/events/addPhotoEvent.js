const {getPool} = require ('../../database/db');

const savePhoto = require ("../../helpers/savePhoto");

async function addPhotoEvent (req, res){
    try {
        const {idEvent} = req.params;
        const connect = await getPool();

        //console.log(req.files)
        //revisar savePhoto porque no vienen files
        
            if(req.files && Object.keys(req.files).length > 0){
                for(let photoData of Object.values(req.files)){
                    const photoName =  await savePhoto(photoData);
                    await connect.query(
                        `
                            INSERT INTO photos (photo, event_id)
                            VALUES (?,?)
                        `,
                        [photoName, idEvent]
                    )
                }
            }

            const [newPhotos] = await connect.query(
                `
                    SELECT photo AS photo_name, id AS photo_id
                    FROM photos
                    WHERE event_id = ?
                `,[idEvent]
            )

            if(!newPhotos.length){
                return res.status(400).send({
                    status: 'No guardada',
                    message: 'La imagen no ha podido almacenarse en la base de datos',
                });
            }

            return res.status(200).send({
                status: 'OK',
                message: 'La imagen se cargó correctamente',
                newPhotos: newPhotos
            });

    }catch(e){
        console.log(e);
    }
}
module.exports = addPhotoEvent;