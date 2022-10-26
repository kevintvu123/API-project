const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, sequelize, Sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Get all Spots owned by the Current User
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const { user } = req

    const allSpotsByUser = await Spot.findAll({
        where: {
            ownerId: user.dataValues.id
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
        const avgRating = review[0].dataValues.avgRating //keying to grab the value

        const spotImage = await spot.getSpotImages()
        const url = spotImage[0].dataValues.url

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
            previewImage: url
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
        const avgRating = review[0].dataValues.avgRating //keying to grab the value

        const spotImage = await spot.getSpotImages()

        const url = spotImage[0].dataValues.url

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
            previewImage: url
        }
        payload.push(spotData)
    }
    res.json({
        Spots: payload
    })
})


module.exports = router;