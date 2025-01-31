const db = require('../config/db');

const logs = {
    getAll: async () => {
        try {
            const [results] = await db.execute(`SELECT * FROM logs ORDER BY created_at DESC`);

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
      
          let query = 'SELECT * FROM logs';
          let queryParams = [];
      
          if (searchtxt) {
            const columns = ['title'];
            const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
            query += ` WHERE ${searchConditions}`;
            queryParams = columns.map(() => `%${searchtxt}%`);
          }
      
          query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
          queryParams.push(limit, offset);
      
          const [results] = await db.execute(query, queryParams);
      
          const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM logs');
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
};

module.exports = logs;