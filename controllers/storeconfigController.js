const Storeconfigs = require('../models/storeconfigModel');

exports.createStoreconfig = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Storeconfigs.create(id , req.body, req.userDetails);
        res.status(201).json({ message: 'Storeconfig created', id: result.insertId });
    } catch (err) {
        console.error('Error creating Storeconfig:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getStoreconfigByStoreId = async (req, res) => {
    const storeId = req.params.storeId;
    try {
        const results = await Storeconfigs.getByStoreId(storeId);
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Storeconfigs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllStoreconfigs = async (req, res) => {
    try {
        const results = await Storeconfigs.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Storeconfigs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateStoreconfig = async (req, res) => {
    const id = req.params.id;
    try {
        await Storeconfigs.update(id, req.body,req.userDetails);
        res.status(200).json({ message: 'Storeconfig updated' });
    } catch (err) {
        console.error('Error updating Storeconfig:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteStoreconfig = async (req, res) => {
    const id = req.params.id;
    try {
        await Storeconfigs.delete(id);
        res.status(200).json({ message: 'Storeconfig deleted' });
    } catch (err) {
        console.error('Error deleting Storeconfig:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};