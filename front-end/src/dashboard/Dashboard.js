import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import CustomerReservations from "../layout/Reservation/CustomerReservations";
import useQuery from "../utils/useQuery";
import { next, previous, today } from "../utils/date-time";
import data from "./data";
import ErrorAlert from "../layout/ErrorAlert";
import { Link } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const dateQuery = useQuery().get("date");
  if (dateQuery) {
    date = dateQuery;
  }

  const [reservations, setReservations] = useState(data);
  const [reservationsError, setReservationsError] = useState(null);

  /*useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }*/

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <div>
        <Link to={`/dashboard?date=${previous(date)}`}>Previous</Link>
        <br />
        <Link to={`/dashboard?date=${today()}`}>Today</Link>
        <br />
        <Link to={`/dashboard?date=${next(date)}`}>Next</Link>
        <br />
        <Link to="/reservations/new">New Reservation</Link>
      </div>
      <br />
      <div>
        <CustomerReservations
          reservations={reservations}
        />
      </div>
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
