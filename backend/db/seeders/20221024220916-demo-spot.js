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
        address: '213 Josh Tree',
        city: 'Joshua Tree',
        state: 'California',
        country: 'United States',
        lat: 1.1,
        lng: 1.1,
        name: 'Remote Dessert Bubble Dome',
        description: 'Unique desert bubble is located in a private 30 acres lot! ~13 miles from Joshua Tree National Park in Joshua Tree, California!',
        price: 742
      },
      {
        ownerId: 1,
        address: 'Treehouse address',
        city: 'Topanga',
        state: 'California',
        country: 'United States',
        lat: 1.2,
        lng: 1.2,
        name: 'Treehouse',
        description: 'The house sits beautifully in the canyon, its organic feel and yet modern design transcends the idea of California living by blending indoor/outdoor through massive windows, incredible ceiling heights and stunning views. ',
        price: 818
      },
      {
        ownerId: 2,
        address: 'New York Apartment',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: 2.2,
        lng: 2.2,
        name: 'Luxury Apartment',
        description: 'Amazing apartment with stunning skyline views to manhattan.',
        price: 898
      },
      {
        ownerId: 3,
        address: 'Atlantic City, New Jersey',
        city: 'Atlantic City',
        state: 'New Jersey',
        country: 'United States',
        lat: 3.3,
        lng: 3.3,
        name: 'Corner Beach House',
        description: 'Make your trip to Atlantic City SPECIAL! Welcome to our custom built “Corner Beach House” for some of the BEST Ocean and Inlet views available in Atlantic City. ',
        price: 784
      },
      {
        ownerId: 4,
        address: 'Fredericksburg, Texas',
        city: 'Fredericksburg',
        state: 'Texas',
        country: 'United States',
        lat: 4.4,
        lng: 4.4,
        name: 'Luxury Tree House',
        description: 'Nestled into live oak trees that gently sway in the breeze, under dark skies with bright stars, and curated to both inspire joy and create presence.',
        price: 758
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
