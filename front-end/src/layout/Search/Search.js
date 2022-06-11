import React, { useState } from "react";
//import { useHistory } from "react-router";
import { searchReservation } from "../../utils/api";

export default function Search() {

    //const history = useHistory();
    const [number, setNumber] = useState();
    const [foundReservations, setFoundReservations] = useState();

    const handleNumber = (event) => setNumber(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("button pressed")
        let result = searchReservation(number)
        console.log(result)
    }

    function Display() {
        return (
            <div>
                {foundReservations.map(reservation => (
                    <div key={reservation.reservation_id}>
                        {reservation.first_name}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div>
            <h1>Search by Number Here</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="mobile_number"
                    placeholder="Enter a customer's phone number"
                    onChange={handleNumber}
                />
                <button type="submit">Find</button>
            </form>
            {foundReservations ? <Display /> : null}
        </div>
    )
}