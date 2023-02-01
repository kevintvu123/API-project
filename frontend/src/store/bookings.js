import { csrfFetch } from "./csrf";

//types 
const GET_USER_BOOKINGS = '/bookings/getUserBookings'

//action creators
const getUserBookings = (bookings) => {
    return {
        type: GET_USER_BOOKINGS,
        payload: bookings
    }
}

//thunks
export const getUserBookingsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/bookings/current');

    if (response.ok) {
        const userBookings = await response.json();
        dispatch(getUserBookings(userBookings))
        return userBookings;
    }
    return response
}

export const postBookingsThunk = (booking, spotId) => async dispatch => {
    const { startDate, endDate } = booking
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        body: JSON.stringify({
            startDate,
            endDate
        }),
    });

    if (response) {
        const createdBooking = response.json()
        dispatch(getUserBookingsThunk())
        return createdBooking
    }
    return response
}

const bookingsReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_USER_BOOKINGS:
            const allBookings = {}
            const allBookingsArr = action.payload.Bookings
            allBookingsArr.forEach(booking => allBookings[booking.id] = booking)
            newState['userBookings'] = { ...allBookings }
            newState['userBookingsArr'] = allBookingsArr
            return newState
        default:
            return state;
    }
}

export default bookingsReducer