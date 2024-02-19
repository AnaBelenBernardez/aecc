const express = require('express');

const bannersRouter = express.Router();


const authAdmin = require('../middlewares/authAdmin');
const bannerExists = require('../middlewares/bannerExists');

const deleteBannerPhoto = require('../controllers/banners/deleteBannerPhoto');
const getAllBanners = require('../controllers/banners/getAllBanners');
const addBanner = require('../controllers/banners/addBanner');
const editBanner = require('../controllers/banners/editBanner');
const deleteBanner = require('../controllers/banners/deleteBanner');
const getBanner = require('../controllers/banners/getBanner');


bannersRouter.get('/', getAllBanners);
bannersRouter.get('/:idBanner', bannerExists, getBanner);
bannersRouter.post('/admin/add', authAdmin, addBanner);
bannersRouter.put('/admin/edit/:idBanner', authAdmin, bannerExists, editBanner);
bannersRouter.delete('/admin/delete/:idBanner', authAdmin, bannerExists, deleteBanner);
bannersRouter.delete('/admin/:idBanner/delete/photo/:idPhoto', authAdmin, bannerExists, deleteBannerPhoto);


module.exports = bannersRouter;