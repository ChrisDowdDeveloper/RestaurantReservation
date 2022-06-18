import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { searchReservation, updateStatus } from "../../utils/api";

//Allows user to search for all reservations made with a specific phone number
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
            <div className="card mt-1">
                {foundReservations.map(reservation => (
                <div className="card-body" key={reservation.reservation_id}>
                    <h5 className="card-title">
                        {reservation.first_name} {reservation.last_name}
                    </h5>
                    <h6>Phone Number: </h6>{reservation.mobile_number}
                    <h6>Party Size: </h6>{reservation.people}
                    <h6>Reservation Date: </h6>{reservation.reservation_date}
                    <h6>Reservation Time: </h6>{reservation.reservation_time}
                    <h6>Reservation Status: </h6>{reservation.status}
                    <br />
                    {reservation.status === "booked" ? <button type="button" className="btn btn-success"><Link style={{color: 'white'}} to={`/reservations/${reservation.reservation_id}/edit`}>Edit</Link></button> : null}
                    {reservation.status === "booked" ? <button type="button" className="btn btn-danger" data-reservation-id-cancel={reservation.reservation_id} onClick={() => cancelReservation(reservation.reservation_id)}>Cancel Reservation</button> : null}
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