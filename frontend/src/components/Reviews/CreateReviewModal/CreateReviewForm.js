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

        return dispatch(getSpotDetailsThunk(spotId))
            .then(dispatch(createSpotReviewThunk({ review, stars }, spotId)))
            .then(setHasSubmitted(prevValue => !prevValue))
                .then(() => setShowModal(false))
                .catch(
                    async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    }
                )
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                <input
                    type="textarea"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder='Review'
                    required
                />
            </label>
            <label>
                <input
                    type="number"
                    min={0}
                    max={5}
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    placeholder='Star'
                    required
                />
            </label>
            <button type="submit">Create Review</button>
        </form>
    )
}

export default CreateReviewForm;