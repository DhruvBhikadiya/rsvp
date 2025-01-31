const db = require('../config/db');

const submission = {
  create: async (data) => {
    const sql = 'INSERT INTO submission (marriageId, fullName, relationWith, relationTitle, city, arrivalDate, dipartureDate, familyMembers, mobile, email, docImage, docImageId, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.marriageId, data.fullName, data.relationWith, data.relationTitle, data.city, data.arrivalDate, data.dipartureDate, data.familyMembers, data.mobile, data.email, data.docImage, data.docImageId]);
      
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
        SELECT * FROM submission ORDER BY submission.created_at DESC
      `);
      
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
        SELECT * FROM submission
      `;
      let queryParams = [];
  
      if (searchtxt) {
        const columns = ['fullName','relationWith','relationTitle','city','mobile','email'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      query += ' ORDER BY submission.created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const [results] = await db.execute(query, queryParams);
  
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM submission');
      const totalCount = totalCountResults[0].totalCount;
  
      return {
        status: 'success',
        data: results,
        totalCount: totalCount
      };
    } catch (err) {
      throw err;
    }
  },  

  getAllSubmissionsByWeddingByPage: async (limit, pageNo, searchtxt, id) => {
    try {
      const offset = (pageNo - 1) * limit;
  
      let query = `
        SELECT * FROM submission WHERE marriageId = ?
      `;
      let queryParams = [];
      queryParams.push(id);
  
      if (searchtxt) {
        const columns = ['fullName','relationWith','relationTitle','city','mobile','email'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      query += ' ORDER BY submission.created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
  
      const [results] = await db.execute(query, queryParams);
  
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM submission');
      const totalCount = totalCountResults[0].totalCount;
  
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
    const sql = 'UPDATE submission SET marriageId = ?, fullName = ?, relationWith = ?, relationTitle = ?, city = ?, arrivalDate = ?, dipartureDate = ?, familyMembers = ?, mobile = ?, email = ?, docImage = ?, docImageId = ?, updated_at = NOW() WHERE pageId = ?';
    try {
      const [results] = await db.execute(sql, [data.marriageId, data.fullName, data.relationWith, data.relationTitle, data.city, data.arrivalDate, data.dipartureDate, data.familyMembers, data.mobile, data.email, data.docImage, data.docImageId, id]);
      
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
      const [results] = await db.execute('DELETE FROM submission WHERE pageId = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = submission;