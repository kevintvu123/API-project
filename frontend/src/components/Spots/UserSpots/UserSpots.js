import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom";
import { getUserSpotsThunk } from "../../../store/spots";
import './UserSpots.css'
import EditSpotFormModal from "../../EditSpotModal";
import { deleteSpotThunk } from "../../../store/spots";

const UserSpots = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getUserSpotsThunk())
    }, [dispatch])


    const userSpots = useSelector(state => state.spot.userSpots)

    if (!userSpots) return null

    const userSpotsArr = userSpots.Spots


    if (!sessionUser) return <Redirect to="/" />;


    const capitalize = (name) => {
        const firstLetter = name.charAt(0)
        const upperFirstLetter = firstLetter.toUpperCase()
        const restWord = name.slice(1)
        return upperFirstLetter + restWord
    }

    function handleClick(spotId) {
        let path = `/spots/${spotId}`
        history.push(path)
    }

    return (
        <>
            <h1>Spots owned by {capitalize(sessionUser.firstName)} {capitalize(sessionUser.lastName)}:</h1>
            <ul>
                {
                    userSpotsArr.map((spot) => {
                        return (
                            <div className='spot-card' key={spot.id}>
                                <div onClick={() => handleClick(spot.id)}>
                                    <h1>{spot.name}</h1>
                                    <div>Spot Id: {spot.id}</div>
                                    <div>Address: {spot.address}</div>
                                    <div>{spot.description}</div>
                                    <div>Price: {spot.price}</div>
                                </div>
                                <EditSpotFormModal spot={spot} />
                                <button onClick={() => {
                                    dispatch(deleteSpotThunk(spot.id))
                                    history.push('/')
                                }}>
                                    Delete Spot
                                </button>
                            </div>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default UserSpots;