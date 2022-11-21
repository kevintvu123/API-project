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



    // const capitalize = (name) => {
    //     const firstLetter = name.charAt(0)
    //     const upperFirstLetter = firstLetter.toUpperCase()
    //     const restWord = name.slice(1)
    //     return upperFirstLetter + restWord
    // }

    function handleClick(spotId) {
        let path = `/spots/${spotId}`
        history.push(path)
    }

    return (
        <>
            <div className="yourSpotsBigContainer">
                <div className="yourSpotsSmallContainer">
                    <div className="yourSpotsHeading">
                        <h1>Your Spots</h1>
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
                                                        Description: {spot.description}
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