import { useState } from "react";
import { useDispatch } from 'react-redux'
import { createSpotReviewThunk } from "../../../store/reviews";
import { getSpotDetailsThunk } from "../../../store/spots";
import './CreateReviewForm.css'

function CreateReviewForm({ setShowModal, spotId, setHasSubmitted }) {
    const dispatch = useDispatch();

    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        return dispatch(createSpotReviewThunk({ review, stars }, spotId))
            // .then(dispatch(createSpotReviewThunk({ review, stars }, spotId)))
            .then(() => setHasSubmitted(prevValue => !prevValue))
            .then(() => setShowModal(false))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div className="form-container">
            <div className="form-header">
                Create a Review
            </div>
            <div className="form-div">
                <form className="createSpotForm" onSubmit={handleSubmit}>

                    <textarea
                        className="host-input-description"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder='Review'
                        required
                    />
                    <input
                        className="host-input1"
                        type="number"
                        min={0}
                        max={5}
                        value={stars}
                        onChange={(e) => setStars(e.target.value)}
                        placeholder='Star'
                        required
                    />
                    <ul className="errorList">
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <button className="hostButton1" type="submit">Create Review</button>
                </form>
            </div>
        </div>
    )
}

export default CreateReviewForm;