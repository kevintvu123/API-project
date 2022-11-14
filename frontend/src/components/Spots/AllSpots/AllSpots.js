

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllSpotsThunk } from "../../../store/spots";
import './AllSpots.css'

const AllSpots = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    const allSpots = useSelector(state => state.spot.allSpots)
    if (!allSpots) return null


    const allSpotsArr = Object.values(allSpots)

    function handleClick(spotId) {
        let path = `/spots/${spotId}`
        history.push(path)
    }

    return (
        <>
            <section>
                <ul>
                    {
                        allSpotsArr.map((spot) => {
                            return (
                                <div className= 'spot-card' key={spot.id}>
                                    <div onClick={() => handleClick(spot.id)}><h1>{spot.name}</h1>Spot Id: {spot.id},{spot.address}, {spot.description}, {spot.price} </div>
                                </div>
                            )
                        })
                    }
                </ul>
            </section>
        </>
    )
}

export default AllSpots;