const db = require('../config/db');

const storeconfig = {
    create: async (storeId, data, userDetails) => {
        const sql = 'INSERT INTO storeconfig (storeId, storeName, logo, mobile, email, address, currencySymbol, checkoutText, addtocartText, instagramURL, facebookURL, twitterURL, youtubeURL, enableCheckout, enableCustomerRegister, loginRequireForCheckout, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, NOW(), NOW())';
        try {
            const [results] = await db.execute(sql, [Number(storeId), data.storeName, data.logo, data.mobile, data.email, data.address, data.currencySymbol, data.checkoutText, data.addtocartText, data.instagramURL, data.facebookURL, data.twitterURL, data.youtubeURL, data.enableCheckout, data.enableCustomerRegister, data.loginRequireForCheckout]);
            
            if(userDetails?.type == 'Administrator User'){
                await db.execute('INSERT INTO logs (title, created_at) VALUES (?, NOW())', [`Store Configuration Created By ${userDetails?.data[0].name}`]);
              }else{
                await db.execute('INSERT INTO storelogs (title, storeId, created_at) VALUES (?,?, NOW())', [`Store Configuration Created By ${userDetails?.data[0].name}`, userDetails.data[0].storeId]);
              }

            let dataJSON = {
                status: 'success',
                data: results
            }

            return dataJSON;
        } catch (err) {
            throw err; // Propagate the error to be handled later
        }
    },

    getAll: async () => {
        try {
            const [results] = await db.execute(`SELECT * FROM storeconfig ORDER BY created_at DESC`);

            let dataJSON = {
                status: 'success',
                data: results
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    getByStoreId: async (StoreId) => {
        try {
            const [results] = await db.execute(`SELECT * FROM storeconfig WHERE storeId = ? ORDER BY created_at DESC`, [StoreId]);

            let dataJSON = {
                status: 'success',
                data: results
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    update: async (storeId, data,userDetails) => {
        const sqlUpdate = 'UPDATE storeconfig SET storeId = ?, storeName = ?, logo = ?, mobile = ?, email = ?, address = ?, currencySymbol = ?, checkoutText = ?, addtocartText = ?, instagramURL = ?, facebookURL = ?, twitterURL = ?, youtubeURL = ?, enableCheckout = ?, enableCustomerRegister = ?, loginRequireForCheckout = ?, updated_at = NOW() WHERE storeId = ?';
        try {
            const [results] = await db.execute(sqlUpdate, [ Number(storeId), data.storeName, data.logo, data.mobile, data.email, data.address, data.currencySymbol, data.checkoutText, data.addtocartText, data.instagramURL, data.facebookURL, data.twitterURL, data.youtubeURL, data.enableCheckout, data.enableCustomerRegister, data.loginRequireForCheckout, storeId]);
            
            if(userDetails?.type == 'Administrator User'){
              await db.execute('INSERT INTO logs (title, created_at) VALUES (?, NOW())', [`Store Configuration Updated By ${userDetails?.data[0].name}`]);
            }else{
              await db.execute('INSERT INTO storelogs (title, storeId, created_at) VALUES (?,?, NOW())', [`Store Configuration Updated By ${userDetails?.data[0].name}`, userDetails.data[0].storeId]);
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

    delete: async (id) => {
        try {
            const [results] = await db.execute('DELETE FROM storeconfig WHERE id = ?', [id]);
            return results;
        } catch (err) {
            throw err;
        }
    },  
};

module.exports = storeconfig;