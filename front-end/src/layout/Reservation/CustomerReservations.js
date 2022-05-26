import React from "react";
import { Link, useParams } from "react-router-dom";

export default function CustomerReservations({ reservations }) {

    const { reservation_id } = useParams();
    return (
        <section>
            <div>
                {reservations.map(reservation => (
                    <article key={reservation.reservation_id}>
                        {reservation.first_name} || 
                        {reservation.last_name} || 
                        {reservation.people} || 
                        {reservation.mobile_number} || 
                        {reservation.status}
                        <Link to={`/reservations/${reservation_id}/seat`}>Seat</Link>
                        <Link to={`/reservations/${reservation_id}/edit`}>Edit</Link>
                    </article>
                ))}
            </div>
        </section>
    )
}