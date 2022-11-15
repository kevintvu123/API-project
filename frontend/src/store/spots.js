import { csrfFetch } from "./csrf";

//types
const GET_ALL_SPOTS = 'spots/getAllSpots'
const CREATE_SPOT = 'spots/createSpot'

//action creators
const getAllSpots = (allSpots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: allSpots
    }
}

const createSpot = (createdSpot) => {
    return {
        type: CREATE_SPOT,
        payload: createdSpot
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

export const createSpotThunk = (spot) => async dispatch => {
    const { address, city, state, country, lat, lng, name, description, price, previewImage } = spot
    const response = await csrfFetch('/api/spots', {
        method: "POST",
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }),
    });

    if (response.ok) {
        const createdSpot = await response.json()

        const imageResponse = await csrfFetch(`/api/spots/${createdSpot.id}/images`, {
            method: "POST",
            body: JSON.stringify({
                url: previewImage,
                preview: true
            })
        })

        if (imageResponse.ok) {
            createdSpot.previewImage = imageResponse.url
            dispatch(createSpot(createdSpot))
            return createdSpot
        }
    }
    return response
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
        case CREATE_SPOT:
            const createdSpot = action.payload
            newState.allSpots[createdSpot.id] = createdSpot
            return newState
        default:
            return state;
    }
}

export default spotsReducer;