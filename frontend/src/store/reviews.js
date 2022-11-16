import { csrfFetch } from "./csrf";

//types
const GET_SPOT_REVIEWS = '/reviews/getSpotReviews'
const GET_USER_REVIEWS = '/reviews/getUserReviews'
const CREATE_SPOT_REVIEW = '/reviews/createSpotReview'
const DELETE_SPOT_REVIEW = '/reviews/deleteReview'

//action creators
const getSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        payload: reviews
    }
}

const getUserReviews = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        payload: reviews
    }
}

const createSpotReview = (review) => {
    return {
        type: CREATE_SPOT_REVIEW,
        payload: review
    }
}

const deleteSpotReview = (reviewId) => {
    return {
        type: DELETE_SPOT_REVIEW,
        payload: reviewId
    }
}

//thunks
export const getSpotReviewsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const spotReviews = await response.json();
        dispatch(getSpotReviews(spotReviews))
        return response;
    }
}

export const getUserReviewsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/reviews/current')

    if (response.ok) {
        const userReviews = await response.json()
        dispatch(getUserReviews(userReviews));
        return response;
    }
}

export const createSpotReviewThunk = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const createdReview = await response.json()

        dispatch(createSpotReview(createdReview))
        return response
    }
}

export const deleteSpotReviewThunk = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(deleteSpotReview(reviewId))
    }
}

const reviewsReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_SPOT_REVIEWS:
            const allReviews = {}
            const allReviewsArr = action.payload.Reviews
            allReviewsArr.forEach(review => allReviews[review.id] = review)
            newState['allReviews'] = { ...allReviews }
            return newState
        case GET_USER_REVIEWS:
            newState['userReviews'] = action.payload
            return newState
        case CREATE_SPOT_REVIEW:
            const createdReview = action.payload
            newState.allReviews[createdReview.id] = createdReview
            return createdReview
        case DELETE_SPOT_REVIEW:
            const deletedReviewId = action.payload
            delete newState.allReviews[deletedReviewId]
            return newState
        default:
            return state;
    }
}

export default reviewsReducer