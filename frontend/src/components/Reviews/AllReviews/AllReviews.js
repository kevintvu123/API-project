
import './AllReviews.css'
import profilePic from '../../../resources/images/blank-profile-circle.png'

const AllReviews = ({ allReviews }) => {

    if (!allReviews) return null
    
    const allReviewsArr = Object.values(allReviews)

    const capitalize = (name) => {
        const firstLetter = name.charAt(0)
        const upperFirstLetter = firstLetter.toUpperCase()
        const restWord = name.slice(1)
        return upperFirstLetter + restWord
    }

    return (
        <>
            <div>
                <ul>
                    {allReviewsArr.map((review) => {
                        return (
                            <div className='review-container' key={review.id}>
                                <div className='profile-pic-container'>
                                    <img src={profilePic} />
                                    <div className='review-user'>{capitalize(review.User.firstName)}</div>
                                </div>
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