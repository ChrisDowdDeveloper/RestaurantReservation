import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateStatus } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

export default function CustomerReservations({ reservations, loadDashboard }) {
    const [error, setError] = useState(null)
    //Cancels the reservation
    async function cancelReservation(reservation_id) {
        if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
            const abortController = new AbortController();
            try {
                await updateStatus(reservation_id, "cancelled", abortController.signal)
                loadDashboard();
            } catch (e) {
                setError(e)
            }
            return () => abortController.abort()
        }
    }

    return (
        <div className="card mt-1">
            <ErrorAlert error={error} />
            {reservations.map(reservation => (
                <div className="card-body" key={reservation.reservation_id}>
                    <h4 className="card-title">
                        {reservation.first_name} {reservation.last_name}
                    </h4>
                    <h6 className="card-text">Phone Number: </h6><p>{reservation.mobile_number}</p>
                    <h6 className="card-text">Date of Reservation: </h6><p>{reservation.reservation_date}</p>
                    <h6 className="card-text">Time of Reservation: </h6><p>{reservation.reservation_time}</p>
                    <h6 className="card-text">Party Size: </h6><p>{reservation.people}</p>
                    <h6 className="card-text">Reservation Status: </h6> <p data-reservation-id-status={reservation.reservation_id}>{reservation.status}</p>
                    <br />
                    {reservation.status === "booked" ? <button type="button" className="btn btn-success btn-md"><Link style={{ color: 'white' }} to={`/reservations/${reservation.reservation_id}/seat`}>Seat</Link></button> : null}
                    {reservation.status === "booked" ? <button type="button" className="btn btn-warning btn-md" data-reservation-id-cancel={reservation.reservation_id}><Link style={{ color: 'white' }} to={`/reservations/${reservation.reservation_id}/edit`}>Edit</Link></button> : null}
                    <button type="button" className="btn btn-danger btn-md" data-reservation-id-cancel={reservation.reservation_id} onClick={() => cancelReservation(reservation.reservation_id)}>Cancel Reservation</button>
                </div>
            ))}
        </div>
    )
}