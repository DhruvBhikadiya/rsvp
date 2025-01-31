const express = require('express');
const router = express.Router();
const storeconfigsController = require('../controllers/storeconfigController');
const { auth } = require('../middlewares/auth.js');

router.post('/createstoreconfig/:id',auth, storeconfigsController.createStoreconfig);
router.get('/getAllStoreconfigs', storeconfigsController.getAllStoreconfigs);
router.get('/getStoreconfigByStoreId/:storeId', storeconfigsController.getStoreconfigByStoreId);
router.put('/updatestoreconfig/:id',auth, storeconfigsController.updateStoreconfig);
router.delete('/deletestoreconfig/:id',auth, storeconfigsController.deleteStoreconfig);

module.exports = router;