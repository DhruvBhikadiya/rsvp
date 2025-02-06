const db = require('../config/db');

const Dashboard = {
  superadminDashboard: async () => {
    try {
      const [weddings] = await db.execute(`SELECT COUNT(*) AS row_count FROM wedding`);
      const [admins] = await db.execute(`SELECT COUNT(*) AS row_count FROM admin`);
      
      let dashboardJson = [
        {
          totalWeddings: weddings[0].row_count,
          totalAdmins: admins[0].row_count,
        }
      ]

      let dataJSON = {
        status: 'success',
        data: dashboardJson
      };
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = Dashboard;