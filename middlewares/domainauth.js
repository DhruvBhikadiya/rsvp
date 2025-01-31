const db = require('../config/db'); // Your database connection

const domainAuth = async (req, res, next) => {
  try {
    const host = req.headers.host; // Get the domain from the request header    

    if (!host) {
      return res.status(400).json({ error: 'No host header provided.' });
    }

    // Check if the domain exists in the custom_domains table
    const query = `
      SELECT s.*
      FROM custom_domains cd
      JOIN stores s ON cd.store_id = s.id
      WHERE cd.domain = ?
      `;
    //   AND cd.verified = TRUE
    const [results] = await db.execute(query, [host]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Domain not found' });
    }

    req.store = results[0]; // Attach the store data to the request
    next();
  } catch (err) {
    console.error('Error in domainAuth middleware:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = domainAuth;