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
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: '1.url',
        preview: true
      },
      {
        spotId: 2,
        url: '2.url',
        preview: true
      },
      {
        spotId: 3,
        url: '3.url',
        preview: false
      },
      {
        spotId: 4,
        url: '4.url',
        preview: false
      },
      {
        spotId: 5,
        url: '5.url',
        preview: true
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
    return queryInterface.bulkDelete('SpotImages', {
      url: { [Op.in]: ['1.url', '2.url', '3.url', '4.url', '5.url'] }
    }, {});
  }
};
