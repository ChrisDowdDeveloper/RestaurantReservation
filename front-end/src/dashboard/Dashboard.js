import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import CustomerReservations from "../layout/Reservation/CustomerReservations";
import Table from "../layout/Tables/Table";
import { next, previous, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import "../layout/Layout.css";

/*
  -Check endpoints in app.
*/

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const currentDay = today()
  const previousDay = previous(date)
  const nextDay = next(date)

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
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


  return (
    <main>
      <h1>Dashboard</h1>
      <div>
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <div className="btn-group">
        <button className="btn btn-primary" onClick={() => setDate(previousDay)}>
          Previous
        </button>
        <button className="btn btn-primary actve" onClick={() => setDate(currentDay)}>
          Today
        </button>
        <button className="btn btn-primary" onClick={() => setDate(nextDay)}>
          Next 
        </button>
      </div>
      <br />
      <div className="container">
        <div className="row align-items-start">
          <div className="col">
            <CustomerReservations reservations={reservations} />
          </div>
          <div className="col">
            <Table tables={tables} />
          </div>
        </div>
      </div>
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
