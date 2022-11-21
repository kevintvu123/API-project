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
        address: '18 Gramercy Park',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: 1.1,
        lng: 1.1,
        name: 'New York Penthouse',
        description: 'This glorious 4-bedroom 6,329 square foot duplex penthouse on Gramercy Park',
        price: 1500
      },
      {
        ownerId: 1,
        address: '23 E 22nd St',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: 1.2,
        lng: 1.2,
        name: 'New York Condo',
        description: 'Crowning One Madison from the 58th to the 60th floors, the Triplex Penthouse boasts nearly 7,000 square feet of open interior space',
        price: 1000
      },
      {
        ownerId: 2,
        address: '2660 Connecticut Ave NW',
        city: 'Washington',
        state: 'DC',
        country: 'United States',
        lat: 2.2,
        lng: 2.2,
        name: 'DC Condo',
        description: 'Amazing Condo with stunning skyline views of DC.',
        price: 900
      },
      {
        ownerId: 2,
        address: '3323 R St NW',
        city: 'Washington',
        state: 'DC',
        country: 'United States',
        lat: 2.2,
        lng: 2.2,
        name: 'DC Townhouse',
        description: 'EXCEPTIONAL OPPORTUNITY to own this classic Georgetown residence, one of the most spectacularly designed homes in the city.',
        price: 850
      },
      {
        ownerId: 3,
        address: '1200 Crystal Dr',
        city: 'Arlington',
        state: 'Virginia',
        country: 'United States',
        lat: 3.3,
        lng: 3.3,
        name: 'Virginia Penthouse w/ Panoramic Views',
        description: 'Welcome to 1200 Crystal Dr Penthouse 18, one of the region most spectacular residences.',
        price: 800
      },
      {
        ownerId: 3,
        address: '4620 26th St N',
        city: 'Arlington',
        state: 'Virginia',
        country: 'United States',
        lat: 3.3,
        lng: 3.3,
        name: '7 Bedroom Virginia Home',
        description: 'The flawless finishes are matched only by the prestigious and highly sought-after location within the Donaldson Run subdivision in North Arlington.',
        price: 800
      },
      {
        ownerId: 4,
        address: '2455 S Ocean Blvd',
        city: 'Highland Beach',
        state: 'Florida',
        country: 'United States',
        lat: 4.4,
        lng: 4.4,
        name: 'Florida Beach Home',
        description: 'Featuring modern French-Eclectic architecture,  transitional interiors by Marc-Michaels, and fortress-like construction by Mark Timothy Luxury Homes.',
        price: 750
      },
      {
        ownerId: 4,
        address: '30 Palm Ave',
        city: 'Miami Beach',
        state: 'Florida',
        country: 'United States',
        lat: 4.4,
        lng: 4.4,
        name: 'Miami Beach Home',
        description: 'This modern 2-story estate on guard-gated Palm Island was magnificently redesigned and sits on a manicured 32,000 SF lot',
        price: 800
      },
      {
        ownerId: 5,
        address: '15325 Masonwood Dr',
        city: 'Gaithersburg',
        state: 'Maryland',
        country: 'United States',
        lat: 4.4,
        lng: 4.4,
        name: 'Maryland Home',
        description: 'Magnificent, private, gated, country club-style living on 34+ acres.',
        price: 650
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
