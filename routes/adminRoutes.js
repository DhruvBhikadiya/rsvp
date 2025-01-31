const express = require('express');
const router = express.Router();
const AdminsController = require('../controllers/adminController.js');
const { auth } = require('../middlewares/auth.js');

router.post('/createAdmin',auth, AdminsController.createAdmin);
router.get('/getAllAdmins',auth, AdminsController.getAllAdmin);
router.get('/getAllAdminsByPage',auth, AdminsController.getAllAdminByPage);
router.post('/loginAdmin', AdminsController.loginAdmin);
router.put('/updateAdmin/:id',auth, AdminsController.updateAdmin);
router.delete('/deleteAdmin/:id',auth, AdminsController.deleteAdmin);

module.exports = router;