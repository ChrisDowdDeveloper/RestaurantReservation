import React from "react";
import { Link, useParams } from "react-router-dom";

export default function SearchedReservations({ foundReservations }) {

    const { reservation_id } = useParams();

    function handleCancel() {

    }

    return (
        <div>
            {foundReservations.map(reservations => (
                <div>
                    {reservations.first_name}
                    {reservations.last_name}
                    {reservations.mobile_number}
                    {reservations.reservation_date}
                    {reservations.reservation_time}
                    {reservations.people}
                    <br />
                    <Link to={`/reservations/:${reservation_id}/edit`}>Edit</Link>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ))}
        </div>
    )
}