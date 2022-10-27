const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, Sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpotCreate = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latititude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name is required')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const reqAuthorization = async (req, res, next) => { //middleware to authorize that spot exists and user owns spot
    const { spotId } = req.params //assumes spotId is parameter
    const { user } = req //assumes user was authenticated
    const userId = user.toJSON().id

    const findSpot = await Spot.findByPk(spotId, { //finds spot and returns the ownerId
        attributes: ['ownerId']
    })

    if (!findSpot) {   //Error for non-existent spot
        const err = new Error("Spot couldn't be found");
        err.status = 404
        return next(err);
    }

    const ownerId = findSpot.toJSON().ownerId

    if (ownerId === userId) {
        return next()
    } else {    //Error for unauthorized user
        const err = new Error("Spot couldn't be found");
        err.status = 404
        return next(err);
    }
}



//Add an Image to a Spot based on Spot id
router.post('/:spotId/images', requireAuth, reqAuthorization, async (req, res) => {
    const { spotId } = req.params
    const { url, preview } = req.body

    const newSpotImage = await SpotImage.create({
        spotId: spotId,
        url: url,
        preview: preview
    })

    const newSpotImageDetails = newSpotImage.toJSON()

    res.json({
        id: newSpotImageDetails.id,
        url: newSpotImageDetails.url,
        preview: newSpotImageDetails.preview
    })
})

//Create a spot
router.post('/', requireAuth, validateSpotCreate, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const { user } = req

    const userId = user.dataValues.id

    const newSpot = await Spot.create({
        ownerId: userId,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })

    res.status(201).json(newSpot)
})

//Get all Spots owned by the Current User
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const { user } = req

    const allSpotsByUser = await Spot.findAll({
        where: {
            ownerId: user.dataValues.id //grabbing Users id from the authentication middleware in req
        }
    })

    const payload = [];
    for (let i = 0; i < allSpotsByUser.length; i++) {
        const spot = allSpotsByUser[i]

        const review = await spot.getReviews({  //aggregate function to find average of Stars column
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']
            ]
        })
        const avgRating = review[0].toJSON().avgRating //keying to grab the value

        let spotImage = await SpotImage.findOne({      //finds the first image that has a truthy preview
            where: {
                preview: true,
                spotId: spot.id
            }
        })

        spotImage ? spotImage = spotImage.url : null

        const spotData = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: avgRating,
            previewImage: spotImage
        }
        payload.push(spotData)

    }
    res.json({
        Spots: payload
    })
})

//Get All Spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll()

    const payload = [];
    for (let i = 0; i < allSpots.length; i++) { //lazy loading to avoid conflicts w/ Postgres
        const spot = allSpots[i]

        const review = await spot.getReviews({  //aggregate function to find average of Stars column
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']
            ]
        })

        const avgRating = review[0].toJSON().avgRating //keying to grab the value

        let spotImage = await SpotImage.findOne({      //finds the first image that has a truthy preview
            where: {
                preview: true,
                spotId: spot.id
            }
        })

        spotImage ? spotImage = spotImage.url : null

        const spotData = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: avgRating,
            previewImage: spotImage
        }
        payload.push(spotData)
    }
    res.json({
        Spots: payload
    })
})


module.exports = router;