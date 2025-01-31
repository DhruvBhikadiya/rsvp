const Weddings = require('../models/weddingModel');

exports.createWedding = async (req, res) => {
  try {
    const result = await Weddings.create(req.body);
    res.status(201).json({ message: 'Wedding created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Wedding:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllWeddings = async (req, res) => {
  try {
    const results = await Weddings.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Weddings:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllWeddingsById = async (req, res) => {
  let id = req.params.id;
  try {
    const results = await Weddings.getById(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Weddings:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllWeddingsByPage = async (req, res) => {
  try {
    const { limit = 10, Wedding = 1, searchtxt = '' } = req.query;
    
    const results = await Weddings.getAllByPage(Number(limit), Number(Wedding), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalWeddings: Math.ceil(results.totalCount / limit),
      currentWedding: Wedding
    });
  } catch (err) {
    console.error('Error fetching Weddings:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateWedding = async (req, res) => {
  const id = req.params.id;
  try {
    await Weddings.update(id, req.body);
    res.status(200).json({ message: 'Wedding updated' });
  } catch (err) {
    console.error('Error updating Wedding:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteWedding = async (req, res) => {
  const id = req.params.id;
  try {
    await Weddings.delete(id);
    res.status(200).json({ message: 'Wedding deleted' });
  } catch (err) {
    console.error('Error deleting Wedding:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
