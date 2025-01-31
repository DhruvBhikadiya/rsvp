const express = require('express');
const router = express.Router();
const SubmissionsController = require('../controllers/submissionController');
const { auth } = require('../middlewares/auth.js');

router.post('/createSubmission',auth, SubmissionsController.createSubmission);
router.get('/getAllSubmissions',auth, SubmissionsController.getAllSubmissions);
router.get('/getAllSubmissionsByPage',auth, SubmissionsController.getAllSubmissionsByPage);
router.post('/getAllSubmissionsByWeddingByPage',SubmissionsController.getAllSubmissionsByWeddingByPage);
router.put('/updateSubmission/:id',auth, SubmissionsController.updateSubmission);
router.delete('/deleteSubmission/:id',auth, SubmissionsController.deleteSubmission);

module.exports = router;