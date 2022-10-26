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
        url: 'url 1',
        preview: true
      },
      {
        spotId: 2,
        url: 'url 2',
        preview: true
      },
      {
        spotId: 3,
        url: 'url 3',
        preview: false
      },
      {
        spotId: 4,
        url: 'url 4',
        preview: false
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
      url: { [Op.in]: ['url 1', 'url 2', 'url 3', 'url 4'] }
    }, {});
  }
};
