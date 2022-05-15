import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
import formatReservationTime from "../utils/format-reservation-date";
import { next, previous, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import { Link } from "react-router-dom";  

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  async function fetchJson(url) {
      const response = await fetch(url);
      const payload = await response.json();
      return payload.data;
    }

  
  async function listReservations(params, signal) {
    const url = new URL(`client-restaurantreservation.herokuapp.com`);
    console.log(url)
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value.toString())
    );
    return await fetchJson(url)
      .then(formatReservationDate)
      .then(formatReservationTime);
  }
  console.log(date)

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div>
        <button onClick={date => previous(date)}>Previous</button>
        <button onClick={date => today()}>Today</button>
        <button onClick={date => next(date)}>Next</button>
        <Link to="/reservations/new">New Reservation</Link>
      </div>
      <br />
      <div>
        {reservations.map(reservation => (
          <p>{reservation.first_name}</p>
        ))}
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
