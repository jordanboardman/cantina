'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('drinks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      username: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      vemo: {
        type: Sequelize.INTEGER
      },
      vemoprice: {
        type: Sequelize.INTEGER
      },
      moze: {
        type: Sequelize.INTEGER
      },
      mozeprice: {
        type: Sequelize.INTEGER
      },
      veze: {
        type: Sequelize.INTEGER
      },
      vezeprice: {
        type: Sequelize.INTEGER
      },
      vemospanu: {
        type: Sequelize.INTEGER
      },
      vemospanuprice: {
        type: Sequelize.INTEGER
      },
      mozespanu: {
        type: Sequelize.INTEGER
      },
      mozespanuprice: {
        type: Sequelize.INTEGER
      },
      vezespanu: {
        type: Sequelize.INTEGER
      },
      vezespanuprice: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('drinks');
  }
};