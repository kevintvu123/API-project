import { csrfFetch } from "./csrf";

//types
const GET_ALL_SPOTS = 'spots/getAllSpots'
const GET_SPOT_DETAILS = '/spots/getSpotDetails'
const GET_USER_SPOTS = 'spots/getUserSpots'
const CREATE_SPOT = 'spots/createSpot'
const EDIT_SPOT = 'spots/editSpot'
const DELETE_SPOT = 'spots/deleteSpot'

//action creators
const getAllSpots = (allSpots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: allSpots
    }
}

const getSpotDetails = (spotDetails) => {
    return {
        type: GET_SPOT_DETAILS,
        payload: spotDetails
    }
}

const getUserSpots = (userSpots) => {
    return {
        type: GET_USER_SPOTS,
        payload: userSpots
    }
}

const createSpot = (createdSpot) => {
    return {
        type: CREATE_SPOT,
        payload: createdSpot
    }
}

const editSpot = (editedSpot) => {
    return {
        type: EDIT_SPOT,
        payload: editedSpot
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        payload: spotId
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

export const getSpotDetailsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const spotDetails = await response.json();
        dispatch(getSpotDetails(spotDetails));
        return response;
    }
}

export const getUserSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')

    if (response.ok) {
        const userSpots = await response.json()
        dispatch(getUserSpots(userSpots));
        return response;
    }
    return response
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

export const editSpotThunk = (editedSpot, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        body: JSON.stringify(editedSpot)
    })

    if (response.ok) {
        const editedSpot = response.json()
        dispatch(editSpot(editedSpot))
        return editedSpot
    }
    return response
}

export const deleteSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(deleteSpot(spotId))
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
        case GET_SPOT_DETAILS:
            newState['spotDetails'] = action.payload
            return newState
        case GET_USER_SPOTS:
            newState['userSpots'] = action.payload
            return newState
        case CREATE_SPOT:
            const createdSpot = action.payload
            return createdSpot
        case EDIT_SPOT:
            const editedSpot = action.payload
            newState[editedSpot.id] = editedSpot
            return newState
        case DELETE_SPOT:
            const deletedSpotId = action.payload
            delete newState.userSpots[deletedSpotId]
            return newState
        default:
            return state;
    }
}

export default spotsReducer;