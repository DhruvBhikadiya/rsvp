const Submissions = require('../models/submissionModel');

exports.createSubmission = async (req, res) => {
  try {
    const result = await Submissions.create(req.body);
    res.status(201).json({ message: 'Submission created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Submission:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllSubmissions = async (req, res) => {
  try {
    const results = await Submissions.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Submissions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllSubmissionsByPage = async (req, res) => {
  try {
    const { limit = 10, Submission = 1, searchtxt = '' } = req.query;
    
    const results = await Submissions.getAllByPage(Number(limit), Number(Submission), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalSubmissions: Math.ceil(results.totalCount / limit),
      currentSubmission: Submission
    });
  } catch (err) {
    console.error('Error fetching Submissions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllSubmissionsByWeddingByPage = async (req, res) => {
    let id = req.body.id;
  try {
    const { limit = 10, Submission = 1, searchtxt = '' } = req.query;
    
    const results = await Submissions.getAllSubmissionsByWeddingByPage(Number(limit), Number(Submission), searchtxt, id);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalSubmissions: Math.ceil(results.totalCount / limit),
      currentSubmission: Submission
    });
  } catch (err) {
    console.error('Error fetching Submissions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateSubmission = async (req, res) => {
  const id = req.params.id;
  try {
    await Submissions.update(id, req.body);
    res.status(200).json({ message: 'Submission updated' });
  } catch (err) {
    console.error('Error updating Submission:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteSubmission = async (req, res) => {
  const id = req.params.id;
  try {
    await Submissions.delete(id);
    res.status(200).json({ message: 'Submission deleted' });
  } catch (err) {
    console.error('Error deleting Submission:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
