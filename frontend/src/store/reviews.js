import { csrfFetch } from "./csrf";

//types
const GET_SPOT_REVIEWS = '/reviews/getSpotReviews'
const CREATE_SPOT_REVIEW = '/reviews/createSpotReview'

//action creators
const getSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        payload: reviews
    }
}

const createSpotReview = (review) => {
    return {
        type: CREATE_SPOT_REVIEW,
        payload: review
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

const reviewsReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_SPOT_REVIEWS:
            const allReviews = {}
            const allReviewsArr = action.payload.Reviews
            allReviewsArr.forEach(review => allReviews[review.id] = review)
            newState['allReviews'] = { ...allReviews }
            return newState
        case CREATE_SPOT_REVIEW:
            const createdReview = action.payload
            return createdReview
        default:
            return state;
    }
}

export default reviewsReducer