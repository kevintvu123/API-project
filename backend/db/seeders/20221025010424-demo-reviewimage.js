'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: '1.url'
      },
      {
        reviewId: 2,
        url: '2.url'
      },
      {
        reviewId: 3,
        url: '3.url'
      },
      {
        reviewId: 4,
        url: '4.url'
      },
      {
        reviewId: 5,
        url: '5.url'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      url: { [Op.in]: ['1.url', '2.url', '3.url', '4.url', '5.url'] }
    }, {});
  }
};
