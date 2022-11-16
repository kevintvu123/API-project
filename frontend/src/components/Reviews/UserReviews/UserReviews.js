
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
            <h1>All Reviews made by {capitalize(sessionUser.firstName)} {capitalize(sessionUser.lastName)}:</h1>
            <ul>
                {
                    userReviewsArr.map((review) => {
                        return (
                            <div key={review.id}>
                                <div>
                                    <div>Review: {review.review}</div>
                                    <div>Stars: {review.stars}</div>
                                    <div>For: {review.Spot.name}</div>
                                    <img src={review.Spot.previewImage} alt={review.id} />
                                </div>
                                <button onClick={async () => {
                                    dispatch(getUserReviewsThunk())
                                        .then(dispatch(deleteSpotReviewThunk(review.id)))
                                        .then(setHasSubmitted(!hasSubmitted))
                                }}>
                                    Delete Review
                                </button>
                            </div>
                        )
                    })
                }
            </ul>
        </>
    )

}

export default UserReviews;