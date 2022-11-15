
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetailsThunk } from "../../../store/spots";
import './SpotDetails.css'

const SpotDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
    }, [dispatch, spotId])

    const spot = useSelector(state => state.spot.spotDetails)

    if (!spot) return null

    return (
        <>
            <h1>
                This is the details for SpotId: {spot.id}
            </h1>
            <div>
                <ul>
                    <li>
                        OwnerId: {spot.Owner.id}
                    </li>
                    <li>
                        Address: {spot.address}
                    </li>
                    <li>
                        Average Rating: {spot.avgStarRating}
                    </li>
                    <li>
                        Price: ${spot.price}
                    </li>
                </ul>
            </div>
        </>
    )

}

export default SpotDetails;