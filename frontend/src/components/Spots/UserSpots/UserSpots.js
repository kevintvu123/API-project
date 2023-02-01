import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom";
import { getUserSpotsThunk } from "../../../store/spots";
import EditSpotFormModal from "../EditSpotModal";
import { deleteSpotThunk } from "../../../store/spots";
import './UserSpots.css'
import { getUserBookingsThunk } from "../../../store/bookings";

const UserSpots = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [hasSubmitted, setHasSubmitted] = useState(false)

    const sessionUser = useSelector(state => state.session.user);
    const userSpots = useSelector(state => state.spot.userSpots)
    const userBookings = useSelector(state => state.booking)

    useEffect(() => {
        dispatch(getUserSpotsThunk())
        dispatch(getUserBookingsThunk())
        setHasSubmitted(false)
    }, [dispatch, hasSubmitted])



    if (!sessionUser) return <Redirect to="/" />;
    if (!userSpots) return null
    if (Object.keys(userBookings).length === 0) return null

    const userSpotsArr = userSpots.Spots
    const userBookingsArr = userBookings.userBookingsArr

    const lengthShortener = (text) => {
        if (text.length > 100) {
            const shortenedText = text.slice(0, 99)
            const returnedText = shortenedText + '...'
            return returnedText
        }
        return text
    }

    function formatDate(date) {
        const newDate = new Date(date)
        const options = { month: 'short', day: 'numeric', year: 'numeric' }

        return new Intl.DateTimeFormat('en-US', options).format(newDate)
    }

    function handleClick(spotId) {
        let path = `/spots/${spotId}`
        history.push(path)
    }

    return (
        <>
            <div className="yourSpotsBigContainer">
                <div className="yourSpotsSmallContainer">
                    <div className="yourSpotsHeading">
                        <h1>Trips</h1>
                    </div>
                    <div className="yourSpotsBox">
                        <ul>
                            {
                                userBookingsArr.map((booking) => {
                                    return (
                                        <div className="oneYourSpotBox" key={booking.id}>
                                            <div className="oneYourSpotImageDesc" onClick={() => handleClick(booking.spotId)}>
                                                <div className="oneYourSpotImage">
                                                    <img src={booking.Spot.previewImage} alt='userSpotImage not found' />
                                                </div>
                                                <div className="oneYourSpotDescription">
                                                    <div className="oneSpotName">
                                                        <h2>{booking.Spot.name}</h2>
                                                    </div>
                                                    <div>
                                                        <span>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
                                                    </div>
                                                    <div className="oneSpotPrice">
                                                        <span>${booking.Spot.price}</span> /night
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="yourSpotsHeading">
                        <h1>Listings</h1>
                    </div>
                    <div className="yourSpotsBox">
                        <ul>
                            {
                                userSpotsArr.map((spot) => {
                                    return (
                                        <div className="oneYourSpotBox" key={spot.id}>
                                            <div className="oneYourSpotImageDesc" onClick={() => handleClick(spot.id)}>
                                                <div className="oneYourSpotImage">
                                                    <img src={spot.previewImage} alt='userSpotImage not found' />
                                                </div>
                                                <div className="oneYourSpotDescription">
                                                    <div className="oneSpotName">
                                                        <h2>{spot.name}</h2>
                                                        <div>
                                                            ★ {Number(spot.avgRating) ? Number(spot.avgRating).toFixed(1) : 'No Reviews'} · {spot.city}, {spot.state}, {spot.country}
                                                        </div>
                                                    </div>
                                                    <div className="oneSpotDescription">
                                                        Description: {lengthShortener(spot.description)}
                                                    </div>
                                                    <div className="oneSpotPrice">
                                                        <span>${spot.price}</span> /night
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="oneYourSpotButtons">
                                                <EditSpotFormModal spot={spot} setHasSubmitted={setHasSubmitted} />
                                                <button className="createReviewButton" onClick={async () => {
                                                    dispatch(getUserSpotsThunk())
                                                        .then(dispatch(deleteSpotThunk(spot.id)))
                                                        .then(setHasSubmitted(!hasSubmitted))
                                                }}>
                                                    Delete Spot
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSpots;