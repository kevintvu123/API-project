const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const reqAuthorization = async (req, res, next) => { //middleware to authorize that review exists and user owns review
    const { reviewId } = req.params //assumes reviewId is parameter
    const { user } = req //assumes user was authenticated
    const userId = user.toJSON().id

    const findReview = await Review.findByPk(reviewId, { //finds review and returns the userId
        attributes: ['userId']
    })

    if (!findReview) {   //Error for non-existent spot
        const err = new Error("Review couldn't be found");
        err.status = 404
        return next(err);
    }

    const ownerId = findReview.toJSON().userId

    if (ownerId === userId) {
        return next()
    } else {    //Error for unauthorized user
        const err = Error("Review couldn't be found");
        err.status = 404
        return next(err);
    }
}

const reviewImageCounter = async (req, res, next) => { //middleware to count review images (necessary due to async behavior)
    const { reviewId } = req.params

    const countImages = await ReviewImage.count({
        where: {
            reviewId: reviewId
        }
    })

    if (countImages > 9) {
        const err = Error('Maximum number of images for this resource was reached')
        err.status = 403
        next(err)
    } else {
        next()
    }
}

//Add Image to Review 
router.post('/:reviewId/images', requireAuth, reqAuthorization, reviewImageCounter, async (req, res, next) => {
    const { reviewId } = req.params
    const { url } = req.body

    const newImage = await ReviewImage.create({
        reviewId: reviewId,
        url: url
    })

    res.json(newImage)
})

module.exports = router;