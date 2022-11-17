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
        userId: 3,
        review: 'This was meh',
        stars: 1
      },
      {
        spotId: 1,
        userId: 2,
        review: 'It was aiight',
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Never again',
        stars: 2
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Found a cockroach',
        stars: 2
      },
      {
        spotId: 3,
        userId: 2,
        review: 'idk anymore',
        stars: 5
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
