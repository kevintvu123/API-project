
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSpotReviewsThunk } from '../../../store/reviews'
import './AllReviews.css'

const AllReviews = () => {

    const dispatch = useDispatch()
    const { spotId } = useParams()

    useEffect(() => {
        dispatch(getSpotReviewsThunk(spotId))
    }, [dispatch, spotId])

    const allReviews = useSelector(state => state.review.allReviews)

    if (!allReviews) return null

    const allReviewsArr = Object.values(allReviews)

    return (
        <>
            <div>
                <div>
                    Reviews
                </div>
                <ul>
                    {allReviewsArr.map((review) => {
                        return (
                            <div key={review.id}>
                                <div></div>
                                <div>{review.review}</div>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default AllReviews;