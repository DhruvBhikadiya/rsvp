const db = require('../config/db');

const pagescategory = {
  create: async (data,userDetails) => {
    const sql = 'INSERT INTO pagescategory (name, displayOrder, created_at, updated_at) VALUES (?,?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.name , data.displayOrder]);
      
      if(userDetails?.type == 'Administrator User'){
        await db.execute('INSERT INTO logs (title, created_at) VALUES (?, NOW())', [`Page Category Created By ${userDetails?.data[0].name}`]);
      }else{
        await db.execute('INSERT INTO storelogs (title, storeId, created_at) VALUES (?,?, NOW())', [`Page Category Created By ${userDetails?.data[0].name}`, userDetails.data[0].storeId]);
      }

      
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
      const [results] = await db.execute(`SELECT * FROM pagescategory ORDER BY created_at DESC`);
      let dataJSON = {
        status: 'success',
        data: results
      };
      
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

    
  getAllByPage: async (limit, pageNo, searchtxt) => {
      try {
        const offset = (pageNo - 1) * limit;
    
        let query = 'SELECT * FROM pagescategory';
        let queryParams = [];
    
        if (searchtxt) {
          const columns = ['name'];
          const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
          query += ` WHERE ${searchConditions}`;
          queryParams = columns.map(() => `%${searchtxt}%`);
        }
    
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);
    
        const [results] = await db.execute(query, queryParams);
    
        const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM pagescategory');
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


  update: async (id, data,userDetails) => {
    const sql = 'UPDATE pagescategory SET name = ?, displayOrder = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.name, data.displayOrder, id]);
      
      if(userDetails?.type == 'Administrator User'){
        await db.execute('INSERT INTO logs (title, created_at) VALUES (?, NOW())', [`Page Category Updated By ${userDetails?.data[0].name}`]);
      }else{
        await db.execute('INSERT INTO storelogs (title, storeId, created_at) VALUES (?,?, NOW())', [`Page Category Updated By ${userDetails?.data[0].name}`, userDetails.data[0].storeId]);
      }

      
      let dataJson = {
        status: 'success',
        data: results
    }
      return dataJson;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id,userDetails) => {
    try {
      const [results] = await db.execute('DELETE FROM pagescategory WHERE id = ?', [id]);
      
      if(userDetails?.type == 'Administrator User'){
        await db.execute('INSERT INTO logs (title, created_at) VALUES (?, NOW())', [`Page Category Deleted By ${userDetails?.data[0].name}`]);
      }else{
        await db.execute('INSERT INTO storelogs (title, storeId, created_at) VALUES (?,?, NOW())', [`Page Category Deleted By ${userDetails?.data[0].name}`, userDetails.data[0].storeId]);
      }

      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = pagescategory;
