import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { listReservations, listTables, updateStatus } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

export default function CustomerReservations({ reservations, date }) {

    const history = useHistory();
    const [error, setError] = useState(null)
    //Cancels the reservation
    async function cancelReservation(reservation_id) {
        if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
            const abortController = new AbortController();
            async function finishStatus() {
                try {
                    await updateStatus(reservation_id, "cancelled", abortController.signal)
                    await listReservations({ date }, abortController.signal)
                    await listTables(abortController.signal)
                    history.go("/");
                } catch (e) {
                    setError(e)
                }
            }
            finishStatus()
            history.go("/");
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
                    <h6 className="card-text">Phone Number: </h6> {reservation.mobile_number}
                    <h6 className="card-text">Date of Reservation: </h6>{reservation.reservation_date}
                    <h6 className="card-text">Time of Reservation: </h6>{reservation.reservation_time}
                    <h6 className="card-text">Party Size: </h6>{reservation.people}
                    <h6 className="card-text">Reservation Status: </h6> {reservation.status}
                    <br />
                    {reservation.status === "seated" ? null : <button type="button" className="btn btn-success btn-md"><Link style={{ color: 'white' }} to={`/reservations/${reservation.reservation_id}/seat`}>Seat</Link></button>}
                    {reservation.status === "booked" ? <button type="button" className="btn btn-danger btn-md" data-reservation-id-cancel={reservation.reservation_id} onClick={() => cancelReservation(reservation.reservation_id)}>Cancel Reservation</button> : null}
                </div>
            ))}
        </div>
    )
}