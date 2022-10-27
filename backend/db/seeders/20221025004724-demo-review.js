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
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: 'review for spot 1',
        stars: 1
      },
      {
        spotId: 1,
        userId: 2,
        review: 'review for spot 1',
        stars: 2
      },
      {
        spotId: 2,
        userId: 2,
        review: 'review for spot 2',
        stars: 2
      },
      {
        spotId: 3,
        userId: 3,
        review: 'review for spot 3',
        stars: 3
      },
      {
        spotId: 3,
        userId: 4,
        review: 'review for spot 3',
        stars: 4
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
      review: { [Op.in]: ['review for spot 1', 'review for spot 2', 'review for spot 3'] }
    }, {});
  }
};
