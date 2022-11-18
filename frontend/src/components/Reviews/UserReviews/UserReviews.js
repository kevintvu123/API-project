
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";
import { getUserReviewsThunk } from '../../../store/reviews';
import { deleteSpotReviewThunk } from '../../../store/reviews';
import './UserReviews.css'

const UserReviews = () => {
    const dispatch = useDispatch()

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

    const capitalize = (name) => {
        const firstLetter = name.charAt(0)
        const upperFirstLetter = firstLetter.toUpperCase()
        const restWord = name.slice(1)
        return upperFirstLetter + restWord
    }

    return (
        <>
            <div className="big-container">
                <div className="small-container">
                    <div className="smaller-container">
                        <div className="heading-container">
                            <h1>All Reviews made by {capitalize(sessionUser.firstName)} {capitalize(sessionUser.lastName)}:</h1>
                        </div>
                        <div className="userReviews-container">
                            <ul>
                                {
                                    userReviewsArr.map((review) => {
                                        return (
                                            <div className='userReview-card' key={review.id}>
                                                <div className="buttonAndReviewInfo">
                                                    <div className="userSpotHeading">
                                                        <h2>{review.Spot.name}</h2>
                                                    </div>
                                                    <div className="userSpotImageInformation">
                                                        <img className="userReviewImage" src={review.Spot.previewImage} alt={review.id} />
                                                        <div className="userReviewInfoOnly">
                                                            <div>Review: {review.review}</div>
                                                            <div>★ {(review.stars).toFixed(1)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="editDeleteButtonContainer">
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
            </div>
        </>
    )

}

export default UserReviews;