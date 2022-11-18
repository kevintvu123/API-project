import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom";
import { getUserSpotsThunk } from "../../../store/spots";
import EditSpotFormModal from "../EditSpotModal";
import { deleteSpotThunk } from "../../../store/spots";
import './UserSpots.css'

const UserSpots = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [hasSubmitted, setHasSubmitted] = useState(false)

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getUserSpotsThunk())
        setHasSubmitted(false)
    }, [dispatch, hasSubmitted])


    const userSpots = useSelector(state => state.spot.userSpots)

    if (!sessionUser) return <Redirect to="/" />;
    if (!userSpots) return null

    const userSpotsArr = userSpots.Spots



    const capitalize = (name) => {
        const firstLetter = name.charAt(0)
        const upperFirstLetter = firstLetter.toUpperCase()
        const restWord = name.slice(1)
        return upperFirstLetter + restWord
    }

    function handleClick(spotId) {
        let path = `/spots/${spotId}`
        history.push(path)
    }

    return (
        <>
            <div className="big-container">
                <div className="small-container">
                    <div className="smaller-container">

                        <div className="heading-container">
                            <h1>Spots hosted by {capitalize(sessionUser.firstName)} {capitalize(sessionUser.lastName)}:</h1>
                        </div>

                        <div className="userSpots-container">
                            <ul>
                                {
                                    userSpotsArr.map((spot) => {
                                        return (
                                            <div className='userpot-card' key={spot.id}>
                                                <div className="buttonAndInfo">
                                                    <div className="clickingDiv" onClick={() => handleClick(spot.id)}>
                                                        <div className="userSpotHeading">
                                                            <h2>{spot.name}</h2>
                                                        </div>
                                                        <div className="userSpotImageInformation">
                                                            <img className="userSpotImage" src={spot.previewImage} alt='userSpotImage not found' />
                                                            <div className="userSpotInfoOnly">
                                                                <div>${spot.price} /night</div>
                                                                <div>★ {Number(spot.avgRating) ? Number(spot.avgRating).toFixed(1) : 'No Reviews'}</div>
                                                                <div>{spot.city}, {spot.state}, {spot.country}</div>
                                                                <div>Description: {spot.description}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="editDeleteButtonContainer">
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
                                            </div>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSpots;