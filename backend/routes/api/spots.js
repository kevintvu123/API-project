const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking, sequelize, Sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op, json } = require("sequelize")

const router = express.Router();

const validateSpotCreate = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required')
        .isLength({ max: 100 })
        .withMessage('Please enter less than 100 characters for address'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required')
        .isLength({ max: 100 })
        .withMessage('Please enter less than 100 characters for city'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required')
        .isLength({ max: 100 })
        .withMessage('Please enter less than 100 characters for state'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required')
        .isLength({ max: 100 })
        .withMessage('Please enter less than 100 characters for country'),
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
        .withMessage('Please enter a name that is less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required')
        .isLength({ max: 250 })
        .withMessage('Please enter a description that is less than 250 characters'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReviewCreate = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required')
        .isLength({ max: 250 })
        .withMessage('Please enter a review that is less than 250 characters'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1-5'),
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
        const err = Error("Forbidden");
        err.status = 403
        return next(err);
    }
}

const reqAuthBookingNotBelong = async (req, res, next) => {
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

    if (ownerId !== userId) {
        return next()
    } else {    //Error for unauthorized user
        const err = Error("An owner cannot book their own spot");
        err.status = 404
        return next(err);
    }
}

//Delete a Spot
router.delete('/:spotId', requireAuth, reqAuthorization, async (req, res, next) => {
    const { spotId } = req.params

    const findSpot = await Spot.findByPk(spotId)
    await findSpot.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

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

//Create a Booking for a spot based on spotId
router.post('/:spotId/bookings', requireAuth, reqAuthBookingNotBelong, async (req, res, next) => {
    const { spotId } = req.params
    const { startDate, endDate } = req.body
    const { user } = req
    const userId = user.id

    const startDateFormatted = new Date(startDate)
    const endDateFormatted = new Date(endDate)

    if (startDateFormatted > endDateFormatted) {
        const err = Error('Validation error')
        err.status = 400
        err.errors = {
            endDate: "endDate cannot come before startDate"
        }
        return next(err)
    }

    const { Op, json } = require("sequelize")
    const findBooking = await Booking.findOne({
        where: {
            [Op.or]: [
                { startDate: startDateFormatted },
                { endDate: endDateFormatted }
            ]
        }
    })
    if (findBooking) {
        const err = Error("Sorry, this spot is already booked for the specified dates")
        err.status = 403
        err.errors = {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking"
        }
        return next(err)
    }


    const newBooking = await Booking.create({
        spotId: spotId,
        userId: userId,
        startDate: startDate,
        endDate: endDate
    })


    res.json(newBooking)
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
        err.errors = ["User already has a review for this spot"];
        err.status = 403
        return next(err)
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
            ownerId: user.id //grabbing Users id from the authentication middleware in req
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


//Get all Bookings by a Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { spotId } = req.params
    const { user } = req
    const userId = user.id

    const findBookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    })

    const payloadOwner = []
    const payloadNotOwner = []

    for (let i = 0; i < findBookings.length; i++) {
        const booking = findBookings[i]

        const user = await booking.getUser({
            attributes: {
                exclude: ['username']
            }
        })

        const bookingDataOwner = {
            User: user,
            id: booking.id,
            spotId: booking.spotId,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        }
        payloadOwner.push(bookingDataOwner)

        const bookingDataNotOwner = {
            spotId: booking.spotId,
            startDate: booking.startDate,
            endDate: booking.endDate
        }
        payloadNotOwner.push(bookingDataNotOwner)
    }

    const findSpot = await Spot.findByPk(spotId, {
        attributes: {
            include: ['ownerId']
        }
    })

    if (!findSpot) {
        const err = Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }

    const ownerId = findSpot.toJSON().ownerId

    if (ownerId !== userId) {
        res.json({ Bookings: payloadNotOwner })
    } else {
        res.json({ Bookings: payloadOwner })
    }
})

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    const { spotId } = req.params

    const findSpot = await Spot.findByPk(spotId)
    if (!findSpot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }

    const findReviews = await Review.findAll({
        where: {
            spotId: spotId
        }
    })

    const payload = []
    for (let i = 0; i < findReviews.length; i++) {
        const review = findReviews[i]

        const user = await review.getUser({
            attributes: {
                exclude: ['username']
            }
        })

        const reviewImages = await review.getReviewImages({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'reviewId']
            }
        })

        const reviewData = {
            id: review.id,
            userId: review.userId,
            spotId: review.spotId,
            review: review.review,
            stars: review.stars,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            User: user,
            ReviewImages: reviewImages

        }
        payload.push(reviewData)
    }

    res.json({
        Reviews: payload
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
        SpotImages: imageArr,
        Owner: owner
    })
})

//Get All Spots
router.get('/', async (req, res, next) => {
    //Add Query Filters
    let query = {
        where: {},
        include: []
    };

    //Validating Errors
    let errors = {} //Object that holds possible parameter errors
    if (req.query.page) {
        if (parseInt(req.query.page) < 1) {
            errors.page = "Page must be greater than or equal to 1"
        }
        if (parseInt(req.query.page) > 10) {
            req.query.page = 10
        }
    }


    if (req.query.size) {
        if (parseInt(req.query.size) < 1) {
            errors.size = "Size must be greater than or equal to 1"
        }
        if (parseInt(req.query.size) > 20) {
            req.query.size = 20
        }
    }


    if (req.query.maxLat) {
        if (isNaN(parseInt(req.query.maxLat))) {
            errors.maxLat = "Maximum latitude is invalid"
        } else {
            query.where.lat = {
                [Op.lte]: req.query.maxLat
            }
        }
    }

    if (req.query.minLat) {
        if (isNaN(parseInt(req.query.minLat))) {
            errors.minLat = "Minimum latitude is invalid"
        } else {
            query.where.lat = {
                [Op.gte]: req.query.minLat
            }
        }
    }

    if (req.query.maxLng) {
        if (isNaN(parseInt(req.query.maxLng))) {
            errors.maxLng = "Maximum longitude is invalid"
        } else {
            query.where.lng = {
                [Op.lte]: req.query.maxLng
            }
        }
    }

    if (req.query.minLng) {
        if (isNaN(parseInt(req.query.minLng))) {
            errors.minLng = "Minimum longitude is invalid"
        } else {
            query.where.lng = {
                [Op.gte]: req.query.minLng
            }
        }
    }

    if (req.query.maxPrice) {
        if (isNaN(parseInt(req.query.maxPrice)) || parseInt(req.query.maxPrice) < 0) {
            errors.maxPrice = "Maximum price must be greater than or equal to 0"
        } else {
            query.where.price = {
                [Op.lte]: req.query.maxPrice
            }
        }
    }

    if (req.query.minPrice) {
        if (isNaN(parseInt(req.query.minPrice)) || parseInt(req.query.minPrice) < 0) {
            errors.minPrice = "Minimum price must be greater than or equal to 0"
        } else {
            query.where.price = {
                [Op.gte]: req.query.minPrice
            }
        }
    }

    //If any error keys were created, return Error
    if (Object.keys(errors).length !== 0) {
        const err = new Error("Validation Error")
        err.status = 400
        err.errors = errors
        return next(err)
    }

    //Setting up Limit and Offset Calculations
    const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    const size = req.query.size === undefined ? 20 : parseInt(req.query.size);
    if (page >= 1 && size >= 1) {
        query.limit = size;
        query.offset = size * (page - 1);
    }

    const allSpots = await Spot.findAll(query) //Apply Query to search

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
        Spots: payload,
        page: page,
        size: size
    })
})


module.exports = router;