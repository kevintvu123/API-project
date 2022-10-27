const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req

    const allBookingsByUser = await Booking.findAll({
        where: {
            userId: user.id
        }
    })

    const payload = [];
    for (let i = 0; i < allBookingsByUser.length; i++) {
        const booking = allBookingsByUser[i]

        const spot = await booking.getSpot({
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            }
        })

        let spotImage = await SpotImage.findOne({      //finds the first image that has a truthy preview
            where: {
                preview: true,
                spotId: spot.id
            }
        })

        spotImage ? spotImage = spotImage.url : null

        spot.dataValues.previewImage = spotImage

        const bookingData = {
            id: booking.id,
            spotId: booking.spotId,
            Spot: spot,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        }
        payload.push(bookingData)
    }
    res.json({
        Bookings: payload
    })
})






module.exports = router;