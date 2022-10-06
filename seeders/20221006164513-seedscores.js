'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('scores', [
      {
        username: 'user1',
        points: 354,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user2',
        points: 651,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user3',
        points: 981,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user4',
        points: 435,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user5',
        points: 126,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('scores', null, {});
  }
};
