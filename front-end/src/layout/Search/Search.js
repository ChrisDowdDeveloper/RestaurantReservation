import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { searchReservation, updateStatus } from "../../utils/api";

export default function Search() {

    const history = useHistory();
    const [number, setNumber] = useState();
    const [foundReservations, setFoundReservations] = useState();

    const handleNumber = (event) => setNumber(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        searchReservation(number)
            .then(setFoundReservations)
    }

    async function cancelReservation(reservation_id) {
        if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
            async function finishStatus() {
                await updateStatus(reservation_id, "cancelled");
                history.go("/");
            }
            finishStatus();
        }
    }

    function Display() {
        return (
            <div>
                {foundReservations.map(reservation => (
                    <div key={reservation.reservation_id}>
                        {reservation.first_name}
                        {reservation.last_name}
                        {reservation.mobile_number}
                        {reservation.status}
                        {reservation.people}
                        {reservation.status === "booked" ? <Link to={`/reservations/${reservation.reservation_id}/edit`}>Edit</Link> : null}
                        {reservation.status === "booked" ? <button data-reservation-id-cancel={reservation.reservation_id} onClick={() => cancelReservation(reservation.reservation_id)}>Cancel Reservation</button> : null}
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
            {foundReservations ? <Display /> : "No reservations found"}
        </div>
    )
}