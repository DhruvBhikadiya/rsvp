const jwt = require("jsonwebtoken");
const axios = require('axios');
const Admin = require('../models/adminModel');

exports.createAdmin = async (req, res) => {
    const ip = req.body.ip;
    try {
        if(ip){
            const IPData = await axios.get(`http://ip-api.com/json/${ip}`);
            const { lat, lon } = IPData.data;
        
            const result = await Admin.create(lat, lon, req.body,req.userDetails);
            res.status(201).json({ message: 'Admin created', user: result });
        }else{
            res.status(400).json({ error: 'Ip Required for Creating any Store Admin' });
        }
          
    } catch (err) {
        console.error('Error creating Admin:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllAdmin = async (req, res) => {
    try {
        const results = await Admin.getAll();
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching Admin:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllAdminByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Admin.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Admin:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateAdmin = async (req, res) => {
    const ip = req.body.ip;
    const id = req.params.id;
    try {
        if(ip){
            const IPData = await axios.get(`http://ip-api.com/json/${ip}`);
            const { lat, lon } = IPData.data;
        
            const results = await Admin.update(lat, lon, id, req.body,req.userDetails);
            res.status(200).json(results);
        }else{
            res.status(400).json({ error: 'Ip Required for Updating any Store Admin' });
        }
    } catch (err) {
        console.error('Error updating Admin:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        await Admin.delete(id,req.userDetails);
        res.status(200).json({ message: 'Admin deleted' });
    } catch (err) {
        console.error('Error deleting Admin:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.loginAdmin = async (req, res) => {
    const ip = req.body.ip;
    try {
        if(ip){
            const IPData = await axios.get(`http://ip-api.com/json/${ip}`);
            const { lat, lon } = IPData.data;
            
            const { email, password } = req.body;
    
            const AdminData = await Admin.findByEmail(lat, lon ,email , ip); 
            if (!AdminData || !AdminData.data) {
                return res.status(404).json({ error: 'Admin not found' });
            }
    
            if (password !== AdminData.data.password) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            
            let token;
            if(AdminData.data){
                token = jwt.sign({id : AdminData.data.id, type : 'Admin'}, process.env.JWT_KEY);
                await Admin.updateadminToken(AdminData.data.id, token);
            }
    
            res.status(200).json({
                message: 'Login successful',
                Admin: AdminData.data,
                token: token
            });
        }else{
            res.status(400).json({ error: 'Ip Required for Login to Store Admin' });
        }

    } catch (err) {
        console.error('Error logging in Admin:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};