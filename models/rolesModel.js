const db = require('../config/db');

const Roles = {
  create: async (data,userDetails) => {
    const sql = 'INSERT INTO roles (roleName, created_at, updated_at) VALUES (?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.roleName]);
      
      if(userDetails?.type == 'Administrator User'){
        await db.execute('INSERT INTO logs (title, created_at) VALUES (?, NOW())', [`Role Created By ${userDetails?.data[0].name}`]);
      }else{
        await db.execute('INSERT INTO storelogs (title, storeId, created_at) VALUES (?,?, NOW())', [`Role Created By ${userDetails?.data[0].name}`, userDetails.data[0].storeId]);
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
      const [results] = await db.execute('SELECT * FROM roles ORDER BY created_at DESC');
      
      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },  

  update: async (id, data,userDetails) => {
    const sql = 'UPDATE roles SET roleName = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.roleName, id]);
      
      if(userDetails?.type == 'Administrator User'){
        await db.execute('INSERT INTO logs (title, created_at) VALUES (?, NOW())', [`Role Updated By ${userDetails?.data[0].name}`]);
      }else{
        await db.execute('INSERT INTO storelogs (title, storeId, created_at) VALUES (?,?, NOW())', [`Role Updated By ${userDetails?.data[0].name}`, userDetails.data[0].storeId]);
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
      const [results] = await db.execute('DELETE FROM roles WHERE id = ?', [id]);
      
      if(userDetails?.type == 'Administrator User'){
        await db.execute('INSERT INTO logs (title, created_at) VALUES (?, NOW())', [`Role Deleted By ${userDetails?.data[0].name}`]);
      }else{
        await db.execute('INSERT INTO storelogs (title, storeId, created_at) VALUES (?,?, NOW())', [`Role Deleted By ${userDetails?.data[0].name}`, userDetails.data[0].storeId]);
      }
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = Roles;
