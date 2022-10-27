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

    const findReviewImage = await ReviewImage.findByPk(imageId)

    if (!findReviewImage) { //checks if the review image exists
        const err = Error("Review Image couldn't be found")
        err.status = 404
        return next(err)
    }

    const findReview = await findReviewImage.getReview()

    if (findReview.userId !== user.id) { //Checks authorization of review
        const err = Error("Forbidden")
        err.status = 403
        return next(err)
    }

    await findReviewImage.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router; 