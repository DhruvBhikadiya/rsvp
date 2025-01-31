const db = require('../config/db');

const files = {
    createFormUpload: async (data,userDetails) => {
        const sql = 'INSERT INTO files (url, directory, storeId, created_at) VALUES (?, ?, ?, NOW())';
        try {
            let results;
            results = await db.execute(sql, [data.url, data.directory, 0]);
            
            let dataJSON = {
                status: 'success',
                data: results
            }

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    getFilesByPath: async (path, userDetails) => {
        try {
            let storeId;
            if(userDetails?.type == 'Administrator User'){
                storeId = 0;
            }else{
                storeId = userDetails.data[0].storeId;
            }

            const [results] = await db.execute(`SELECT * FROM files WHERE files.directory = ? ORDER BY created_at DESC`, [path]);
    
            if (results.length === 0) {
                return {
                    status: 'error',
                    message: 'File not found'
                };
            }
    
            const [countResult] = await db.execute(`SELECT COUNT(*) AS totalCount FROM files WHERE storeId = ?`, [storeId]);
            
            return {
                status: 'success',
                data: results,
                totalCount: countResult[0].totalCount
            };
        } catch (err) {
            throw err;
        }
    }    
}

module.exports = files;