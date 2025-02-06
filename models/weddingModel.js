const db = require('../config/db');

const wedding = {
  create: async (data) => {
    const sql = 'INSERT INTO wedding (brideName, groomName, brideImage, brideImageId,groomImage,groomImageId,weddingCardUrl,itenaryUrl,weddingCardId,itenaryId,prewedding,weddingLogo,weddingLogoId, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.brideName, data.groomName, data.brideImage, data.brideImageId, data.groomImage, data.groomImageId, data.weddingCardUrl, data.itenaryUrl, data.weddingCardId, data.itenaryId, JSON.stringify(data.prewedding), data.weddingLogo, data.weddingLogoId]);
      
      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },
  
  getAll: async () => {
    try {

      const [results] = await db.execute(`
        SELECT * FROM wedding ORDER BY wedding.created_at DESC
      `);

      results.forEach(e => {
        e.prewedding = JSON.parse(e.prewedding);
      })
      
      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },
  
  getById: async (id) => {
    try {

      const [results] = await db.execute(`
        SELECT * FROM wedding WHERE id = ? ORDER BY wedding.created_at DESC
      `, [id]);
      
      results.forEach(e => {
        e.prewedding = JSON.parse(e.prewedding);
      })

      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },
  
  getAllByPage: async (limit, pageNo, searchtxt) => {
    try {
      const offset = (pageNo - 1) * limit;
  
      let query = `
        SELECT * FROM wedding
      `;
      let queryParams = [];
  
      if (searchtxt) {
        const columns = ['brideName','groomName'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      query += ' ORDER BY wedding.created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const [results] = await db.execute(query, queryParams);
  
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM wedding');
      const totalCount = totalCountResults[0].totalCount;
  
      results.forEach(e => {
        e.prewedding = JSON.parse(e.prewedding);
      })

      return {
        status: 'success',
        data: results,
        totalCount: totalCount
      };
    } catch (err) {
      throw err;
    }
  },  


  update: async (id, data) => {
    const sql = 'UPDATE wedding SET brideName = ?, groomName = ?, brideImage = ?, brideImageId = ?, groomImage = ?, groomImageId = ?, weddingCardUrl = ?, itenaryUrl = ?, weddingCardId = ?, itenaryId = ?, prewedding = ?, weddingLogo = ?, weddingLogoId = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.brideName, data.groomName, data.brideImage, data.brideImageId, data.groomImage, data.groomImageId, data.weddingCardUrl, data.itenaryUrl, data.weddingCardId, data.itenaryId, JSON.stringify(data.prewedding), data.weddingLogo, data.weddingLogoId, id]);
      
      let dataJson = {
        status: 'success',
        data: results
    }
      return dataJson;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const [results] = await db.execute('DELETE FROM wedding WHERE id = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = wedding;