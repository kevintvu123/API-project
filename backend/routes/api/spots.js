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

const validateReviewCreate = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isFloat({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
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
        const err = Error("Spot couldn't be found");
        err.status = 404
        return next(err);
    }
}

//Edit a Spot
router.put('/:spotId', requireAuth, reqAuthorization, validateSpotCreate, async (req, res) => {
    const { spotId } = req.params
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const findSpot = await Spot.findByPk(spotId)
    findSpot.set({
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
    await findSpot.save();

    res.json(findSpot)
})

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReviewCreate, async (req, res, next) => {
    const { spotId } = req.params;
    const { review, stars } = req.body
    const { user } = req;
    const userId = user.id

    //Error for non-existent spot
    const findSpot = await Spot.findByPk(spotId)
    if (!findSpot) {
        const err = Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }
    //Error for duplicate review
    const findReviewByOwner = await findSpot.getReviews({
        where: {
            userId: userId
        }
    })
    if (findReviewByOwner.length) {
        const err = Error('User already has a review for this spot')
        err.status = 403
        next(err)
    }

    const newReview = await Review.create({
        spotId: spotId,
        userId: userId,
        review: review,
        stars: stars
    })

    res.json(newReview)
})


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

//Get details of a Spot from id
router.get('/:spotId', async (req, res, next) => {
    const { spotId } = req.params

    //Spot Info
    const findCurrSpot = await Spot.findByPk(spotId)
    if (!findCurrSpot) {    //Couldn't find spot w/ specified id
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }
    const currSpot = findCurrSpot.toJSON()

    //Reviews info
    const totalReviews = await Review.count({
        where: {
            spotId: spotId
        }
    })

    const findAvgRating = await findCurrSpot.getReviews({  //aggregate function to find average of Stars column
        attributes: [
            [Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']
        ]
    })
    const avgRating = findAvgRating[0].toJSON().avgRating


    //Images info
    const findAllImages = await SpotImage.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'spotId']
        },
        where: {
            spotId: spotId
        }
    })
    const imageArr = []
    for (let i = 0; i < findAllImages.length; i++) {
        imageArr.push(findAllImages[i].toJSON())
    }

    //Owner info
    const findOwner = await findCurrSpot.getUser({
        attributes: {
            exclude: ['username']
        }
    })
    const owner = findOwner.toJSON()

    res.json({
        ...currSpot,
        numReviews: totalReviews,
        avgStarRating: avgRating,
        spotImages: imageArr,
        Owner: owner
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