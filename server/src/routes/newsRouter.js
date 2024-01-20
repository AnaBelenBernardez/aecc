const express = require('express');

const newsRouter = express.Router();


const authAdmin = require('../middlewares/authAdmin');
const newsExists = require('../middlewares/newsExists');

const deleteNewsPhoto = require('../controllers/news/deleteNewsPhoto');
const getAllNews = require('../controllers/news/getAllNews');
const addNews = require('../controllers/news/addNews');
const editNews = require('../controllers/news/editNews');
const deleteNews = require('../controllers/news/deleteNews');
const getNews = require('../controllers/news/getNews');


newsRouter.get('/', getAllNews);
newsRouter.get('/:idNews', newsExists, getNews);
newsRouter.post('/admin/add', authAdmin, addNews);
newsRouter.put('/admin/edit/:idNews', authAdmin, newsExists, editNews);
newsRouter.delete('/admin/delete/:idNews', authAdmin, newsExists, deleteNews);
newsRouter.delete('/admin/:idNews/delete/photo/:idPhoto', authAdmin, newsExists, deleteNewsPhoto);


module.exports = newsRouter;