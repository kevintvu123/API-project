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
        url: 'url 1'
      },
      {
        reviewId: 2,
        url: 'url 2'
      },
      {
        reviewId: 3,
        url: 'url 3'
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
      url: { [Op.in]: ['url 1', 'url 2', 'url 3'] }
    }, {});
  }
};
