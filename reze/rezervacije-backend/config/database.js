const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rezervacije', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
