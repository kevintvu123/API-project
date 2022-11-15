import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createSpotThunk } from "../../store/spots";

function CreateSpotForm({ setShowModal }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState(1.0)
    const [lng, setLng] = useState(2.0)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState("")
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();

        return dispatch(createSpotThunk({ address, city, state, country, lat, lng, name, description, price, previewImage }))
            .then((response) => {
                setAddress('')
                setCity('')
                setState('')
                setCountry('')
                setName('')
                setDescription('')
                setPrice('')
                setPreviewImage('')
                history.push(`/spots/${response.id}`)
            })
            .then(setShowModal(false))
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
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder='Address'
                    required
                />
            </label>
            <label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='City'
                    required
                />
            </label>
            <label>
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder='State'
                    required
                />
            </label>
            <label>
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder='Country'
                    required
                />
            </label>
            <label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name'
                    required
                />
            </label>
            <label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Description'
                    required
                />
            </label>
            <label>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='Price'
                    required
                />
            </label>
            <label>
                <input
                    type="text"
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    placeholder='Preview Image'
                    required
                />
            </label>
            <button type="submit">Host Spot</button>
        </form>
    )
}

export default CreateSpotForm;