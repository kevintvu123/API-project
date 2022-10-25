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
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: 'address 1',
        city: 'city 1',
        state: 'state 1',
        country: 'country 1',
        lat: 1.1,
        lng: 1.1,
        name: 'spot 1',
        description: 'desc 1',
        price: 1.1
      },
      {
        ownerId: 2,
        address: 'address 2',
        city: 'city 2',
        state: 'state 2',
        country: 'country 2',
        lat: 2.2,
        lng: 2.2,
        name: 'spot 2',
        description: 'desc 2',
        price: 2.2
      },
      {
        ownerId: 3,
        address: 'address 3',
        city: 'city 3',
        state: 'state 3',
        country: 'country 3',
        lat: 3.3,
        lng: 3.3,
        name: 'spot 3',
        description: 'desc 3',
        price: 3.3
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
    return queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ['spot 1', 'spot 2', 'spot 3'] }
    }, {});
  }
};
