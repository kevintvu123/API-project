
import './AllReviews.css'

const AllReviews = ({ allReviews }) => {

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