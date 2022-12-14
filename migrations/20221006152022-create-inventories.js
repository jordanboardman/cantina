'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      username: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      day: {
        type: Sequelize.INTEGER
      },
      veax: {
        type: Sequelize.INTEGER
      },
      mozuc: {
        type: Sequelize.INTEGER
      },
      zeyoc: {
        type: Sequelize.INTEGER
      },
      gloop: {
        type: Sequelize.INTEGER
      },
      spanu: {
        type: Sequelize.INTEGER
      },
      credits: {
        type: Sequelize.INTEGER
      },
      weather: {
        type: Sequelize.STRING
      },
      popularity: {
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
    await queryInterface.dropTable('inventories');
  }
};