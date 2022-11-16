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
        city: 'Manhattan',
        state: 'New York',
        country: 'USA',
        lat: 1.1,
        lng: 1.1,
        name: 'Loft in Downtown Manhattan',
        description: 'desc 1',
        price: 489
      },
      {
        ownerId: 1,
        address: 'address 1.2',
        city: 'Midtown Manhattan',
        state: 'New York',
        country: 'USA',
        lat: 1.2,
        lng: 1.2,
        name: 'Luxury Apartment',
        description: 'desc 1.2',
        price: 586
      },
      {
        ownerId: 2,
        address: 'address 2',
        city: 'Downtown Manhattan',
        state: 'New York',
        country: 'USA',
        lat: 2.2,
        lng: 2.2,
        name: 'Luxury Apartment',
        description: 'desc 2',
        price: 898
      },
      {
        ownerId: 3,
        address: 'address 3',
        city: 'Soho',
        state: 'New York',
        country: 'USA',
        lat: 3.3,
        lng: 3.3,
        name: 'Hotel Room',
        description: 'desc 3',
        price: 650
      },
      {
        ownerId: 4,
        address: 'address 4',
        city: 'Soho',
        state: 'New York',
        country: 'USA',
        lat: 4.4,
        lng: 4.4,
        name: 'Condo in Soho',
        description: 'desc 4',
        price: 1170
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
      name: { [Op.in]: ['spot 1', 'spot 1.2', 'spot 2', 'spot 3', 'spot 4'] }
    }, {});
  }
};
