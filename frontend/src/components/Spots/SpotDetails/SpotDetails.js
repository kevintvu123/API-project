
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllSpotsThunk } from "../../../store/spots";
import './SpotDetails.css'

const SpotDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    const spot = useSelector(state => state.spot.allSpots)

    if (!spot) return null

    const spotbyId = spot[spotId]

    return (
        <>
            <h1>
                This is the details for SpotId: {spotbyId.id}
            </h1>
            <div>
                <ul>
                    <li>
                        OwnerId: {spotbyId.ownerId}
                    </li>
                    <li>
                        Address: {spotbyId.address}
                    </li>
                    <li>
                        Average Rating: {spotbyId.avgRating}
                    </li>
                    <li>
                        Price: ${spotbyId.price}
                    </li>
                </ul>
            </div>
        </>
    )

}

export default SpotDetails;