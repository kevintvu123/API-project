const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { application } = require('express');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { user } = req
    const { imageId } = req.params

    const findSpotImage = await SpotImage.findByPk(imageId)

    if (!findSpotImage) { //checks if the spot image exists
        const err = Error("Spot Image couldn't be found")
        err.status = 404
        return next(err)
    }

    const findSpot = await findSpotImage.getSpot()

    if (findSpot.ownerId !== user.id) { //Checks authorization of spot
        const err = Error("Forbidden")
        err.status = 403
        return next(err)
    }

    await findSpotImage.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router;