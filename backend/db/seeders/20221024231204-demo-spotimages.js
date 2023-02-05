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
        spotId: 3,
        url: 'https://photos.zillowstatic.com/fp/2282bbfcbf2c59d86da6259fedf68031-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://photos.zillowstatic.com/fp/62fd94d7778fc137502d22678454ca6d-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://photos.zillowstatic.com/fp/5eda2632e2d579110aa89f651571c574-cc_ft_1536.webp',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://photos.zillowstatic.com/fp/5e7fe201d1eeea56099a9ac39996cb3c-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://photos.zillowstatic.com/fp/e0746a737777cc237f7cfb31c371bcfd-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://photos.zillowstatic.com/fp/cdd379557b5bf7c4fb76d449afd5fe9d-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://photos.zillowstatic.com/fp/0944ca676196dbe5ef290781f59afcec-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://photos.zillowstatic.com/fp/ed2926fc7b1230147ed3543b8e69c094-cc_ft_1536.webp',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://photos.zillowstatic.com/fp/16e2eaa72c05a7b28ef227a33b1e55e6-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://photos.zillowstatic.com/fp/db1b14e0016c6fefed19e27d7d500c23-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://photos.zillowstatic.com/fp/58e6171d73a1183b4a3040113301b867-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://photos.zillowstatic.com/fp/28e3cffbe78914998d44bbea6175a2d3-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://photos.zillowstatic.com/fp/aa01baa5c7684082f997362e6cb50933-cc_ft_1536.webp',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://photos.zillowstatic.com/fp/5426ffb3e86aa9584e13c24cb7c65e8d-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://photos.zillowstatic.com/fp/ee9ac8e858e901654ecbf771d714cd01-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://photos.zillowstatic.com/fp/ba8298ed3b65352ec2f8dde28da36ef5-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://photos.zillowstatic.com/fp/5c859a82b2f08371714a3fab90572b90-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://photos.zillowstatic.com/fp/03b0450dd23289acf2687fa4fae37cb6-cc_ft_1536.webp',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://photos.zillowstatic.com/fp/3782e8300ab68bea0cdf8aa4904094fe-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://photos.zillowstatic.com/fp/64ea62ad0c10ac410f2b83dbc4c94ec1-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://photos.zillowstatic.com/fp/7b3d4e0364bb3e83f55b1b9a2e48724d-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://photos.zillowstatic.com/fp/fb73fc8ffc24704938be84a8ce2fa775-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://photos.zillowstatic.com/fp/81a8b107c0d0c3cbcf4ed78ae66b00b2-cc_ft_1536.webp',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://photos.zillowstatic.com/fp/383a7ca0592e0af197318a0d6ea83461-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://photos.zillowstatic.com/fp/de40977cd2c1d9f6419e019ff6bd0f39-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://photos.zillowstatic.com/fp/23e79142a039a0223cc585503f43e901-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://photos.zillowstatic.com/fp/2b2004c9f686d98ceb0bedf2c78e3e55-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://photos.zillowstatic.com/fp/0958d2240734eeca981d604792ea01b0-cc_ft_384.webp',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://photos.zillowstatic.com/fp/23bf0ed0664c125108623f22af00de6c-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://photos.zillowstatic.com/fp/4023d6b0de1fc8116e9aecb3d0f73dc4-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://photos.zillowstatic.com/fp/f09bf37571e17439c6681621bcc959ee-uncropped_scaled_within_1344_1008.webp',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://photos.zillowstatic.com/fp/c4a46609b98ff3df01dff8d4e170b1f0-uncropped_scaled_within_1344_1008.webp',
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
      url: { [Op.in]: ['1.url', '2.url', '3.url', '4.url', '5.url'] }
    }, {});
  }
};
