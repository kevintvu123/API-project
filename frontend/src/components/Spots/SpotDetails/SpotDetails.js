
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetailsThunk } from "../../../store/spots";
import { getSpotReviewsThunk } from "../../../store/reviews";
import AllReviews from "../../Reviews/AllReviews/AllReviews";
import CreateReviewFormModal from "../../Reviews/CreateReviewModal";
import './SpotDetails.css'

import photo from '../../../resources/images/image-unavailable.jpg'

const SpotDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [allReviews, setallReviews] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user);

    const spot = useSelector(state => state.spot.spotDetails)

    useEffect(() => {
        dispatch(getSpotDetailsThunk(spotId))
    }, [dispatch, spotId, hasSubmitted])

    useEffect(() => {
        dispatch(getSpotReviewsThunk(spotId))
            .then((data) => setallReviews(data))
            .then(() => setIsLoaded(true))
    }, [dispatch, spotId, hasSubmitted])

    if (!spot) return null
    if (!isLoaded) return null

    let spotImageArr = spot.SpotImages

    const imageObj = {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null
    }

    for (let i = 0; i < 5; i++) {
        if (spotImageArr[i]) {
            imageObj[i] = spotImageArr[i].url
        } else {
            imageObj[i] = null
        }
    }

    const capitalize = (name) => {
        const firstLetter = name.charAt(0)
        const upperFirstLetter = firstLetter.toUpperCase()
        const restWord = name.slice(1)
        return upperFirstLetter + restWord
    }

    let reviewButtonClassName

    if (sessionUser) {
        (spot.ownerId !== sessionUser.id) ? reviewButtonClassName = 'reviewModal' : reviewButtonClassName = 'noreviewModal'
    }

    if (!sessionUser) {
        reviewButtonClassName = 'noUserVisibility'
    }

    return (
        <>
            <div className="container">
                <div className="itemContainer">
                    <div className="titleBox">
                        <div className="spotName"><h1>{spot.name}</h1></div>
                        <div className="sub-heading">★{Number(spot.avgStarRating) ? Number(spot.avgStarRating).toFixed(1) : 'New'} · {spot.numReviews} reviews · Superhost · {spot.city}, {spot.state}, {spot.country}</div>
                    </div>

                    <div className="imageContainer">
                        <div className="preview-image">{imageObj[0] ? <img className="actual-image0" src={imageObj[0]} alt='image 1' /> : <img className="actual-image0" src={photo} alt='image 1 unavailable' />}</div>
                        <div className="image-1">{imageObj[1] ? <img className="actual-image1" src={imageObj[1]} alt='image 2' /> : <img className="actual-image1" src={photo} alt='image 2 unavailable' />}</div>
                        <div className="image-2">{imageObj[2] ? <img className="actual-image2" src={imageObj[2]} alt='image 3' /> : <img className="actual-image2" src={photo} alt='image 3 unavailable' />}</div>
                        <div className="image-3">{imageObj[3] ? <img className="actual-image3" src={imageObj[3]} alt='image 4' /> : <img className="actual-image3" src={photo} alt='image 4 unavailable' />}</div>
                        <div className="image-4">{imageObj[4] ? <img className="actual-image4" src={imageObj[4]} alt='image 5' /> : <img className="actual-image4" src={photo} alt='image 5 unavailable' />}</div>
                    </div>

                    <div className="infoBooking-container">
                        <div className="info-container">
                            <div className='host-box'>
                                <h2 className="host-name">{spot.name} hosted by {capitalize(spot.Owner.firstName)}</h2>
                                <div className="host-info">{Math.floor(Math.random() * 11)} guests ·{Math.floor(Math.random() * 11)} bedrooms ·{Math.floor(Math.random() * 11)} beds ·{Math.floor(Math.random() * 11)} baths</div>
                            </div>
                            <div className="subhost-box">
                                <h4 className="subHost-heading">{capitalize(spot.Owner.firstName)} is a Superhost</h4>
                                <h5 className="subHost-subHeading">Superhosts are experiences, highly rated hosts who are committed to providing great stays for guests</h5>
                                <h4 className="subHost-heading">Great check-in experience</h4>
                                <h5 className="subHost-subHeading">100% of recent guests gave the check-in process a 5-star rating</h5>
                                <h4 className="subHost-heading">Free cancellation for 48 hours.</h4>
                            </div>
                            <div className="description-box">
                                {spot.description}
                            </div>
                        </div>
                        <div className="booking-container">
                            <div className="booking-component">
                                <div className="price-rating-booking">
                                    <div className="price-booking"><span className="price">${spot.price}</span> night</div>
                                    <div className="rating-booking">★{Number(spot.avgStarRating) ? Number(spot.avgStarRating).toFixed(1) : 'No Reviews'}·<span className="review-gray">{spot.numReviews} reviews</span></div>
                                </div>
                                <div className="checkin-checkout">
                                </div>
                                <button className="reserveButton">Reserve</button>
                                <div className="charge-message">You won't be charged yet</div>
                                <div className="price-block">
                                    <div className="seven-night">
                                        <span className="prior-calc">${spot.price} x 7 nights</span><span>${(spot.price) * 7}</span>
                                    </div>
                                    <div className="seven-night">
                                        <span className="prior-calc">Cleaning Fee</span><span>${((spot.price) * .05).toFixed(0)}</span>
                                    </div>
                                    <div className="seven-night">
                                        <span className="prior-calc">Service Fee</span><span>${((spot.price) * .15).toFixed(0)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="reviews-container">
                        <div className="createReviewButton-container">
                            <div className="reviews-header">★ {Number(spot.avgStarRating) ? Number(spot.avgStarRating).toFixed(1) : 'No Reviews'} · {spot.numReviews} reviews</div>
                            <div className={reviewButtonClassName}>
                                <CreateReviewFormModal spotId={spotId} setHasSubmitted={setHasSubmitted} />
                            </div>
                        </div>

                        <AllReviews allReviews={allReviews.Reviews} />
                    </div>
                </div>
            </div>
        </>
    )

}

export default SpotDetails;