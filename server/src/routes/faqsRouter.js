const express = require('express');

const faqsRouter = express.Router();

const authAdmin = require('../middlewares/authAdmin');
const faqExists = require('../middlewares/faqExists');

const getAllFaqs = require('../controllers/faqs/getAllFaqs');
const addFaq = require('../controllers/faqs/addFaq');
const editFaq = require('../controllers/faqs/editFaq');
const deleteFaq = require('../controllers/faqs/deleteFaq');
const getFaq = require('../controllers/faqs/getFaq');

faqsRouter.get('/', getAllFaqs);
faqsRouter.get('/:idFaq', faqExists, getFaq);
faqsRouter.post('/admin/add', authAdmin, addFaq);
faqsRouter.put('/admin/edit/:idFaq', authAdmin, faqExists, editFaq);
faqsRouter.delete('/admin/delete/:idFaq', authAdmin, faqExists, deleteFaq);


module.exports = faqsRouter;