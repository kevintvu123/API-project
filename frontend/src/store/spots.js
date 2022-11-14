import { csrfFetch } from "./csrf";

//types
const GET_ALL_SPOTS = 'spots/getAllSpots'

//action creators
const getAllSpots = (allSpots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: allSpots
    }
}

//thunks
export const getAllSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const allSpots = await response.json();
        dispatch(getAllSpots(allSpots));
        return response;
    }
}


const initialState = {}

const spotsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_SPOTS:
            const allSpots = {}
            const allSpotsArr = action.payload.Spots
            allSpotsArr.forEach(spot => allSpots[spot.id] = spot)
            newState['allSpots'] = { ...allSpots }
            return newState
        default:
            return state;
    }
}

export default spotsReducer;