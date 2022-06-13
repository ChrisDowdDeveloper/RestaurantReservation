import React from "react";
import { Link, useHistory } from "react-router-dom";
import { updateStatus } from "../../utils/api";

export default function CustomerReservations({ reservations }) {

    const history = useHistory();

    async function cancelReservation(reservation_id) {
        if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
            async function finishStatus() {
                await updateStatus(reservation_id, "cancelled");
                history.go("/");
            }
            finishStatus();
        }
    }

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Reservation ID</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Party Size</th>
                        <th scope="col">Mobile Number</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reservation => (
                        <tr key={reservation.reservation_id}>
                            <th scope="row">{reservation.reservation_id}</th>
                            <td>{reservation.first_name}</td>
                            <td>{reservation.last_name}</td>
                            <td>{reservation.people}</td>
                            <td>{reservation.mobile_number}</td>
                            <td>{reservation.status}</td>
                            <td>{reservation.status === "seated" ? null : <button type="button" className="btn btn-success btn-md" href={`/reservations/${reservation.reservation_id}/seat`}>Seat</button>}</td>
                            <td>{reservation.status === "booked" ? <button type="button" className="btn btn-danger btn-sm" data-reservation-id-cancel={reservation.reservation_id} onClick={() => cancelReservation(reservation.reservation_id)}>Cancel Reservation</button> : null}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}