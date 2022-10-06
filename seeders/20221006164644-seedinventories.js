'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('inventories', [
      {
        username: 'user1',
        day: 3,
        veax: 54,
        mozuc: 23,
        zeyoc: 132,
        gloop: 987,
        spanu: 345,
        credits: 453464,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user2',
        day: 7,
        veax: 65,
        mozuc: 35,
        zeyoc: 8912,
        gloop: 65432,
        spanu: 74684,
        credits: 651,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user3',
        day: 1,
        veax: 515,
        mozuc: 723,
        zeyoc: 35,
        gloop: 65189,
        spanu: 4321,
        credits: 56165235,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user4',
        day: 4,
        veax: 981,
        mozuc: 81231,
        zeyoc: 34,
        gloop: 2,
        spanu: 651,
        credits: 564,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user5',
        day: 2,
        veax: 591,
        mozuc: 324,
        zeyoc: 47351,
        gloop: 5618,
        spanu: 54351,
        credits: 65198,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('inventories', null, {});
  }
};
