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

    if (countImages >= 10) {
        const err = Error('Maximum number of images for this resource was reached')
        err.status = 403
        return next(err)
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

    const newImageDetails = newImage.toJSON()

    res.json({
        id: newImageDetails.id,
        url: url
    })
})

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const userId = user.id

    const findReviews = await Review.findAll({
        where: {
            userId: userId
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

        const spot = await review.getSpot({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
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
            review: review.stars,
            review: review.createdAt,
            review: review.updatedAt,
            User: user,
            Spot: spot,
            ReviewImages: reviewImages
        }
        payload.push(reviewData)

    }

    res.json({
        Reviews: payload
    })
})

module.exports = router;