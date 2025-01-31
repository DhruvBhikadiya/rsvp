const db = require('../config/db');

const siteconfig = {
    create: async (data) => {
        const sql = 'INSERT INTO siteconfig (siteName, logo, version, prvBaseUrl, instagramURL, facebookURL, twitterURL, linkedInURL, youtubeURL, mobile, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
        try {
            const [results] = await db.execute(sql, [data.siteName, data.logo, data.version, data.prvBaseUrl, data.instagramURL, data.facebookURL, data.twitterURL,data.linkedInURL, data.youtubeURL, data.mobile,data.email]);

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
            const [results] = await db.execute(`SELECT * FROM siteconfig ORDER BY created_at DESC`);

            let dataJSON = {
                status: 'success',
                data: results
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    update: async (id, data,userDetails) => {
        const sqlUpdate = 'UPDATE siteconfig SET siteName = ?, logo = ?, version = ?, instagramURL = ?, prvBaseUrl = ?, facebookURL = ?, twitterURL = ?, linkedInURL = ?, youtubeURL = ?, mobile = ?, email = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sqlUpdate, [data.siteName, data.logo, data.version, data.instagramURL, data.prvBaseUrl, data.facebookURL, data.twitterURL, data.linkedInURL, data.youtubeURL, String(data.mobile), data.email, id]);
            
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
            const [results] = await db.execute('DELETE FROM siteconfig WHERE id = ?', [id]);
            return results;
        } catch (err) {
            throw err;
        }
    },  
};

module.exports = siteconfig;