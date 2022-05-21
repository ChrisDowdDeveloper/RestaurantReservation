import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import CustomerReservations from "../layout/Reservation/CustomerReservations";
import Table from "../layout/Tables/Table";
import useQuery from "../utils/useQuery";
import { next, previous, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import { Link } from "react-router-dom";

/*
  -Check endpoints in app.
*/

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

  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listTables()
      .then(setTables)
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(() => {
    const abortController = new AbortController();
    async function loadTables() {
      const tableList = await listTables(abortController.signal);
      setTables(tableList);
    }
    loadTables()
    return () => abortController.abort();
  }, []);

  console.log(tables)


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
        <CustomerReservations reservations={reservations} />
      </div>
      <div>
        <Table tables={tables} />
      </div>
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
