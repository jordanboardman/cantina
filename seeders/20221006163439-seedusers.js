'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'user1',
        password: 'goodpassword',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user2',
        password: 'canthackme',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user3',
        password: 'imcool',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user4',
        password: 'mybirthday',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user5',
        password: 'drowssap',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};
