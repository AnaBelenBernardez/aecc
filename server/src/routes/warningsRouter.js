const express = require('express');

const warningsRouter = express.Router();

const authAdmin = require('../middlewares/authAdmin');
const warningExists = require('../middlewares/warningExists');

/* const getAllSponsors = require('../controllers/sponsors/getAllSponsors');
const getSponsor = require('../controllers/sponsors/getSponsor');
const addSponsor = require('../controllers/sponsors/addSponsor');
const editSponsor = require('../controllers/sponsors/editSponsor');
const deleteSponsor = require('../controllers/sponsors/deleteSponsor');

sponsorsRouter.get('/', getAllSponsors);
sponsorsRouter.get('/:idSponsor', sponsorExists, getSponsor);
sponsorsRouter.post('/admin/add', authAdmin, addSponsor);
sponsorsRouter.put('/admin/edit/:idSponsor', authAdmin, sponsorExists, editSponsor);
sponsorsRouter.delete('/admin/delete/:idSponsor', authAdmin, sponsorExists, deleteSponsor); */


module.exports = warningsRouter;