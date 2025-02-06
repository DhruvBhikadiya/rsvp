const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController');

router.get('/superAdminDashboard', DashboardController.superadminDashboard);

module.exports = router;