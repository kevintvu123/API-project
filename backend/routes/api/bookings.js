const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { application } = require('express');
const e = require('express');

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

router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { bookingId } = req.params
    const { user } = req
    const { startDate, endDate } = req.body

    const startDateFormatted = new Date(startDate)
    const endDateFormatted = new Date(endDate)

    if (startDateFormatted > endDateFormatted) {
        const err = Error("Validation error")
        err.status = 400
        err.errors = {
            endDate: "endDate cannot come before startDate"
        }
        return next(err)
    }

    const findBooking = await Booking.findByPk(bookingId)

    if (!findBooking) {
        const err = Error("Booking couldn't be found")
        err.status = 404
        return next(err)
    }

    if (findBooking.userId !== user.id) {
        const err = Error("Booking couldn't be found")
        err.status = 404
        return next(err)
    }

    if (findBooking.endDate < new Date) {
        const err = Error("Past bookings can't be modified")
        err.status = 403
        return next(err)
    }


    if (findBooking.endDate === endDateFormatted && findBooking.startDate === startDateFormatted) {
        const err = Error("Sorry, this spot is already booked for the specified dates")
        err.status = 403
        err.errors = {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking"
        }
        return next(err)
    } else if (findBooking.endDate === endDateFormatted) {
        const err = Error("Sorry, this spot is already booked for the specified dates")
        err.status = 403
        err.errors = {
            endDate: "End date conflicts with an existing booking",
        }
        return next(err)
    } else if (findBooking.startDate === startDateFormatted) {
        const err = Error("Sorry, this spot is already booked for the specified dates")
        err.status = 403
        err.errors = {
            startDate: "Start date conflicts with an existing booking",
        }
        return next(err)
    }

    findBooking.set({
        startDate: startDate,
        endDate: endDate
    })
    await findBooking.save()

    res.json(findBooking)
})


module.exports = router;