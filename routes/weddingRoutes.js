const express = require('express');
const router = express.Router();
const WeddingsController = require('../controllers/weddingController');
const { auth } = require('../middlewares/auth.js');

router.post('/createWedding',auth, WeddingsController.createWedding);
router.get('/getAllWeddings',auth, WeddingsController.getAllWeddings);
router.get('/getAllWeddingsByPage',auth, WeddingsController.getAllWeddingsByPage);
router.get('/getAllWeddingsById/:id', WeddingsController.getAllWeddingsById);
router.put('/updateWedding/:id',auth, WeddingsController.updateWedding);
router.delete('/deleteWedding/:id',auth, WeddingsController.deleteWedding);

module.exports = router;