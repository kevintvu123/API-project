

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllSpotsThunk } from "../../../store/spots";
import './AllSpots.css'

const AllSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    const allSpots = useSelector(state => state.spot.allSpots)

    if (!allSpots) return null

    const allSpotsArr = Object.values(allSpots)

    function handleClick(spotId) {
        let path = `/spots/${spotId}`
        history.push(path)
    }

    return (
        <>
            <div className="allSpotsDiv">
                <ul className="allSpotsContainer">
                    {
                        allSpotsArr.map((spot) => {
                            return (
                                <div className='spot-card' key={spot.id} onClick={() => handleClick(spot.id)}>
                                    <div className="imageDiv"><img className="spotImage" src={spot.previewImage} alt={`SpotImage ${spot.name}`} /></div>
                                    <div className="spotName-review">
                                        <div>{spot.city}, {spot.state}</div>
                                        <div>★ {(spot.avgRating) ? (spot.avgRating).toFixed(1) : 'New'}</div>
                                    </div>
                                    <div className="fake-added">Added {Math.floor(Math.random() * 11)} weeks ago</div>
                                    <div>${spot.price} night</div>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default AllSpots;