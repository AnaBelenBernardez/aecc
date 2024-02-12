const { getPool } = require("../../database/db");

const generateError = require("../../helpers/generateError");
const achievementSchema = require("../../schemas/achievementSchema");
const { photoSchema } = require("../../schemas/photoSchema");
const savePhoto = require("../../helpers/savePhoto");
const deletePhoto = require("../../helpers/deletePhoto");

async function editAchievement(req, res, next) {
  try {
    const { idAchievement } = req.params;
    const pool = await getPool();

    const icon = req.files?.icon;

    if (req.files) {
      if (req.files.length > 1) {
        return next(
          generateError("Sólo es posible anexar un icono por logro", 400)
        );
      }

      await photoSchema.validateAsync(icon);
    }

    const { error } = achievementSchema.validate(req.body);

    if (error) {
      return next(generateError(error.message, 400));
    }

    const { description, galician_description } = req.body;

    const [duplicateAchievement] = await pool.query(
      `
                SELECT *
                FROM achievements
                WHERE description = ?
            `,
      [description]
    );

    console.log(duplicateAchievement);

    if (
      duplicateAchievement.length &&
      duplicateAchievement[0].id !== parseInt(idAchievement)
    ) {
      return next(
        generateError(
          "Ya existe ese logro en la web, edítalo o elimínalo para evitar contenidos duplicados",
          400
        )
      );
    }

    if (icon) {
      const iconName = await savePhoto(icon, 500);
      await pool.query(
        `
                    UPDATE achievements 
                    SET icon = ?
                    WHERE id = ?
                `,
        [iconName, idAchievement]
      );

      deletePhoto(duplicateAchievement[0].icon);
    }

    const [editedAchievement] = await pool.query(
      `
                UPDATE achievements
                SET description = ?, galician_description = ?
                WHERE id = ?
            `,
      [description, galician_description, idAchievement]
    );

    const [updatedAchievement] = await pool.query(
      `
                SELECT *
                FROM achievements
                WHERE id = ?
            `,
      [idAchievement]
    );

    res.status(200).send({
      status: "OK",
      data: updatedAchievement,
      infoEdited: editedAchievement,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
}

module.exports = editAchievement;
