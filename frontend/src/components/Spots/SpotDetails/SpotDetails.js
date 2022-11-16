
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetailsThunk } from "../../../store/spots";
import { getSpotReviewsThunk } from "../../../store/reviews";
import AllReviews from "../../Reviews/AllReviews/AllReviews";
import CreateReviewFormModal from "../../Reviews/CreateReviewModal";
import './SpotDetails.css'

const SpotDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const [hasSubmitted, setHasSubmitted] = useState(false)

    const spot = useSelector(state => state.spot.spotDetails)
    const allReviews = useSelector(state => state.review.allReviews)

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
            .then(() =>
                dispatch(getSpotReviewsThunk(spotId))
            )
    }, [dispatch, spotId, hasSubmitted])


    if (!spot) return null
    if (!allReviews) return null

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
            <CreateReviewFormModal spotId={spotId} setHasSubmitted={setHasSubmitted} />
            <AllReviews allReviews={allReviews} />
        </>
    )

}

export default SpotDetails;