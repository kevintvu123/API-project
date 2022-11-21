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
        url: 'https://photos.zillowstatic.com/fp/9b9209488071f0aa528c4c3b703b3b28-cc_ft_1536.webp',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://photos.zillowstatic.com/fp/b35b9a7b1bac48f69a82953d200088aa-cc_ft_384.webp',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://photos.zillowstatic.com/fp/b1e03cd0122eb81da46770170ea7d2c2-cc_ft_384.webp',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://photos.zillowstatic.com/fp/4e1e22f849264f2d1b3445e1ea618dc3-cc_ft_384.webp',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://photos.zillowstatic.com/fp/29ebdab93f3c511e5e601d3995186414-cc_ft_384.webp',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://photos.zillowstatic.com/fp/7e4d23096b385e85e0d84c2bf4d3d982-cc_ft_1536.webp',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://photos.zillowstatic.com/fp/b06d46b4c460eb23056314eaa1faa58a-cc_ft_384.webp',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://photos.zillowstatic.com/fp/8f56576fe7561bc7206d1d8026aa0434-cc_ft_384.webp',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://photos.zillowstatic.com/fp/25781ebf80845c3774f893829fbfe1fb-cc_ft_384.webp',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://photos.zillowstatic.com/fp/3823ce43cecf03a2934369ab587d14ef-cc_ft_384.webp',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://photos.zillowstatic.com/fp/5990d7dc98970d47a854e1597d9704ea-cc_ft_1536.webp',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://photos.zillowstatic.com/fp/033e252c2e598bd96e4f1499898c60a2-cc_ft_384.webp',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://photos.zillowstatic.com/fp/3f3fc59b1c23792bcd3a75c28b61b734-cc_ft_384.webp',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://photos.zillowstatic.com/fp/5eda2632e2d579110aa89f651571c574-cc_ft_1536.webp',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://photos.zillowstatic.com/fp/ed2926fc7b1230147ed3543b8e69c094-cc_ft_1536.webp',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://photos.zillowstatic.com/fp/aa01baa5c7684082f997362e6cb50933-cc_ft_1536.webp',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://photos.zillowstatic.com/fp/03b0450dd23289acf2687fa4fae37cb6-cc_ft_1536.webp',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://photos.zillowstatic.com/fp/81a8b107c0d0c3cbcf4ed78ae66b00b2-cc_ft_1536.webp',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://photos.zillowstatic.com/fp/0958d2240734eeca981d604792ea01b0-cc_ft_384.webp',
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
