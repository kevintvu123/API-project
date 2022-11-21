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
        userId: 2,
        review: 'Really enjoyed this spot!',
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Thought it was cool',
        stars: 4
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Would pay again',
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: "Wouldn't pay again",
        stars: 1
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Cool place',
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'idk anymore',
        stars: 2
      },
      {
        spotId: 4,
        userId: 4,
        review: 'Terrible place!',
        stars: 1
      },
      {
        spotId: 5,
        userId: 4,
        review: 'Meh',
        stars: 3
      },
      {
        spotId: 5,
        userId: 1,
        review: 'Decent place',
        stars: 2
      },
      {
        spotId: 6,
        userId: 2,
        review: "It's aiight",
        stars: 3
      },
      {
        spotId: 7,
        userId: 5,
        review: "Never coming back",
        stars: 1
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
