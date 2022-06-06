import React from "react";
import { Link } from "react-router-dom";

export default function CustomerReservations({ reservations }) {

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
                        <Link to={`/reservations/${reservation.reservation_id}/edit`}>Edit</Link>
                    </article>
                ))}
            </div>
        </section>
    )
}