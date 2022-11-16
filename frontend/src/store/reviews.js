import { csrfFetch } from "./csrf";

//types
const GET_SPOT_REVIEWS = '/reviews/getSpotReviews'

//action creators
const getSpotReviews = (reviews) => {
    return {
        type: GET_SPOT_REVIEWS,
        payload: reviews
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

const reviewsReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_SPOT_REVIEWS:
            const allReviews = {}
            const allReviewsArr = action.payload.Reviews
            allReviewsArr.forEach(review => allReviews[review.id] = review)
            newState['allReviews'] = { ...allReviews }
            return newState
        default:
            return state;
    }
}

export default reviewsReducer