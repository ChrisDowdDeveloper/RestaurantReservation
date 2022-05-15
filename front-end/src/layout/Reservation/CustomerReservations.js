import React from "react";
import { Link } from "react-router-dom";

export default function CustomerReservations({ reservations }) {

    return (
        <section>
            {reservations.map(reservation => (
                <article key={reservation.id}>
                    {reservation.first_name}
                    {reservation.last_name}
                    {reservation.party_size}
                    {reservation.time}
                    {reservation.mobile_number}
                    {reservation.status}
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>Seat</Link>
            </article>
        ))}
        </section>
    )
}