import React from "react";
import { Link } from "react-router-dom";
import { updateStatus } from "../../utils/api";

export default function CustomerReservations({ reservations }) {

    function cancelReservation(reservation_id) {
        window.confirm("Do you want to cancel this reservation? This cannot be undone.");
        updateStatus("")
    }

    return (
        <section>
            <div>
                {reservations.map(reservation => (
                    <article key={reservation.reservation_id}>
                        {reservation.reservation_id} ||
                        {reservation.first_name} ||
                        {reservation.last_name} ||
                        {reservation.people} ||
                        {reservation.mobile_number} ||
                        {reservation.status}
                        {reservation.status === "seated" ? null : <Link to={`/reservations/${reservation.reservation_id}/seat`}>Seat</Link>}
                        {reservation.status === "booked" ? <button data-reservation-id-cancel={reservation.reservation_id} onClick={cancelReservation(reservation.reservation_id)}>Cancel Reservation</button> : null}
                    </article>
                ))}
            </div>
        </section>
    )
}