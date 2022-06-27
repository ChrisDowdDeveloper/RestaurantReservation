import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { searchReservation, updateStatus } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

//Allows user to search for all reservations made with a specific phone number
export default function Search() {

    const history = useHistory();
    const [number, setNumber] = useState("");
    const [foundReservations, setFoundReservations] = useState([]);
    const [error, setError] = useState(null);
    const [submitClicked, setSubmitClicked] = useState(false);

    const handleNumber = (event) => setNumber(event.target.value);

    const handleSubmit = (event) => {
        setSubmitClicked(true);
        try {
            event.preventDefault();
            searchReservation(number)
                .then(setFoundReservations);
        } catch (e) {
            setError(e)
        }
    }
    async function cancelReservation(reservation_id) {
        if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
            const abortController = new AbortController();
            async function finishStatus() {
                try {
                    await updateStatus(reservation_id, "cancelled", abortController.signal)
                    history.go("/");
                } catch (e) {
                    setError(e)
                }
            }
            finishStatus()
            return () => abortController.abort();
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
                        {reservation.status === "booked" ? <button type="button" className="btn btn-success"><Link style={{ color: 'white' }} to={`/reservations/${reservation.reservation_id}/edit`}>Edit</Link></button> : null}
                        {reservation.status === "booked" ? <button type="button" className="btn btn-danger" data-reservation-id-cancel={reservation.reservation_id} onClick={() => cancelReservation(reservation.reservation_id)}>Cancel Reservation</button> : null}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="card my-3 border-secondary">
            <ErrorAlert error={error} />
            <h3 className="card-header text-white bg-secondary">Search</h3>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="mobile_number">Mobile number:</label>
                        <input
                            className="form-control"
                            id="mobile_number"
                            name="mobile_number"
                            type="text"
                            placeholder="Enter a customer's phone number"
                            value={number || ''}
                            onChange={handleNumber}
                            required={true}
                        />
                        <div>
                            <button type="button" className="btn btn-secondary m-2" onClick={() => history.goBack()}> Cancel </button>
                            <button type="submit" className="btn btn-primary m-2"> Find </button>
                        </div>
                    </div>
                </form>
            </div>
            {submitClicked && foundReservations.length === 0 ? <div className="alert alert-danger m-2">No reservations found</div> : <Display />}
        </div>
    )
}