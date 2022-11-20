import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { editSpotThunk } from "../../../store/spots";
import { getUserSpotsThunk } from "../../../store/spots";

// import './EditSpotForm.css'
import '../CreateSpotModal/CreateSpotForm.css'

function EditSpotForm({ spot, setHasSubmitted, setShowModal }) {

    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()

    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.city)
    const [country, setCountry] = useState(spot.country)
    const [lat, setLat] = useState(spot.lat)
    const [lng, setLng] = useState(spot.lng)
    const [name, setName] = useState(spot.name)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();


        return (dispatch(editSpotThunk({ address, city, state, country, lat, lng, name, description, price }, spot.id)))
            .then(() => setHasSubmitted(prevVal => !prevVal))
            .then(() => setShowModal(false))
            .catch(
                async (res) => {
                    const data = await res.json();
                    console.log(data)
                    if (data && data.errors) setErrors(data.errors);
                }
            )
    }

    return (
        <div className="form-container">
            <div className="form-header">
                Host Your Home on AirClone
            </div>
            <div className="form-div">
                <form className="createSpotForm" onSubmit={handleSubmit}>
                    <input
                        className="host-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        required
                    />
                    <input
                        className="host-input"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Address'
                        required
                    />
                    <div className="city-state">
                        <input
                            className="host-input1"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder='City'
                            required
                        />

                        <input
                            className="host-input1"
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder='State'
                            required
                        />
                    </div>
                    <div className="country-price">
                        <input
                            className="host-input1"
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder='Country'
                            required
                        />
                        <input
                            className="host-input1"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='Price'
                            required
                        />
                    </div>
                    <textarea
                        className="host-input-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Description'
                        required
                    />
                    <ul className="errorList">
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <button className="hostButton2" type="submit">Host Spot</button>
                </form>
            </div>
        </div>
    )

}

export default EditSpotForm;
