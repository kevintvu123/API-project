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
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: "2022-11-19",
        endDate: "2022-11-20"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2022-11-19",
        endDate: "2022-11-20"
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2022-11-19",
        endDate: "2022-11-20"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "2022-11-19",
        endDate: "2022-11-20"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-11-19",
        endDate: "2023-11-20"
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
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
