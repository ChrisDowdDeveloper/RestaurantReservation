import React, { useEffect, useState } from "react";
import { listReservations, listTables, deleteTableStatus } from "../utils/api";
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
  const [error, setError] = useState(null);
  const currentDay = today()
  const previousDay = previous(date)
  const nextDay = next(date)

  useEffect(loadDashboard, [date]);

  //Fetches the reservations on the date selected, and a list of all tables.
  function loadDashboard() {
    const abortController = new AbortController();
    setError(null);
    setReservations([]);
    setTables([]);
    try {
      listReservations({ date }, abortController.signal)
        .then(setReservations)
      listTables(abortController.signal)
        .then(setTables)
    } catch (e) {
      setError(e)
    }
    return () => abortController.abort();
  }

  //Handles the request to finish a reservation and makes the table status to "Open" once more.
  const handleTable = async (table) => {
    let question = window.confirm("Is this table ready to seat new guests? This cannot be undone.")
    const abortController = new AbortController();
    if (question) {
      try {
        await deleteTableStatus(table.table_id, table.reservation_id, abortController.signal)
        loadDashboard();
      } catch (e) {
        setError(e)
      };
    };
    return () => abortController.abort();
  };

  return (
    <main>
      <h1 className="dash">Dashboard</h1>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">
              Reservations for Date: {date}
            </h4>
          </div>
          <ErrorAlert error={error} />
          <button type="button" className="btn btn-primary" onClick={() => setDate(previousDay)}>
            Previous
          </button>
          <button type="button" className="btn btn-primary" onClick={() => setDate(currentDay)}>
            Today
          </button>
          <button type="button" className="btn btn-primary" onClick={() => setDate(nextDay)}>
            Next
          </button>
          <CustomerReservations reservations={reservations} date={date} loadDashboard={loadDashboard} />
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-md-flex mb-3">
            <Table tables={tables} handleTable={handleTable} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;