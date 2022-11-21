
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from "react-router-dom";
import { getUserReviewsThunk } from '../../../store/reviews';
import { deleteSpotReviewThunk } from '../../../store/reviews';
import './UserReviews.css'

const UserReviews = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [hasSubmitted, setHasSubmitted] = useState(false)

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getUserReviewsThunk())
        setHasSubmitted(false)
    }, [dispatch, hasSubmitted])

    const userReviews = useSelector(state => state.review.userReviews)

    if (!sessionUser) return <Redirect to="/" />;

    if (!userReviews) return null

    const userReviewsArr = userReviews.Reviews

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
            <div className="yourReviewsBigContainer">
                <div className="yourReviewsSmallContainer">
                    <div className="yourSpotsHeading">
                        <h1>Your Reviews</h1>
                    </div>
                    <div className="yourSpotsBox">
                        <ul>
                            {
                                userReviewsArr.map((review) => {
                                    return (
                                        <div className='oneYourReviewBox' key={review.id}>
                                            <div className='oneYourSpotImageDesc' onClick={() => handleClick(review.Spot.id)}>
                                                <div className="oneYourSpotImage">
                                                    <img className="userReviewImage" src={review.Spot.previewImage} alt={review.id} />
                                                </div>
                                                <div className="oneYourReviewDescription">
                                                    <div className="oneSpotName">
                                                        <h2>{review.Spot.name}</h2>
                                                        <div>
                                                            Your Rating : ★ {Number(review.stars).toFixed(1)}
                                                        </div>
                                                    </div>
                                                    <div>Review: {review.review}</div>
                                                </div>
                                            </div>
                                            <div className="oneYourReviewButtons">
                                                <button className="createReviewButton deleteReviewButton" onClick={async () => {
                                                    dispatch(getUserReviewsThunk())
                                                        .then(dispatch(deleteSpotReviewThunk(review.id)))
                                                        .then(setHasSubmitted(!hasSubmitted))
                                                }}>
                                                    Delete Review
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

export default UserReviews;