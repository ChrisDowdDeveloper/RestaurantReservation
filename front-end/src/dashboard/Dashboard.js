import React, { useEffect, useState } from "react";
import {
  listTables,
  listReservations,
  finishTable,
  updateStatus,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import CustomerReservations from "../layout/Reservation/CustomerReservations"
import { Link, useRouteMatch } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";
import Table from "../layout/Tables/Table";
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);

  // set date based of url query
  const url = useRouteMatch();
  const query = useQuery();
  useEffect(loadDate, [url, query, setDate]);

  function loadDate() {
    const newDate = query.get("date");
    if (newDate) setDate(newDate);
  }

  useEffect(loadDashboard, [date, url]);

  function loadDashboard() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal)
      .then(setTables);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    return () => abortController.abort();
  }

  //Handles a table that is ready to seat new people
  const handleFinish = async (table) => {
    const abortController = new AbortController();
    try {
      if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
        await finishTable(table.table_id, abortController.signal);
        await loadDashboard();
      }
      await loadDashboard();
    } catch (err) {
      setError(err);
    }
    return () => abortController.abort();
  };

  //Handles a reservation cancellation
  const handleCancel = async (id) => {
    const data = { status: "cancelled" };
    const abortController = new AbortController();
    try {
      if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
        await updateStatus(data, id, abortController.signal);
        await loadDashboard();
      }
    } catch (err) {
      setError(err);
    }
    return () => abortController.abort();
  };

  return (
    <main>
      <h1 className="dash">Dashboard</h1>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">Reservations for Date: {date}</h4>
          </div>
          <ErrorAlert error={error} />
          <Link
            to={`/dashboard?date=${previous(date)}`}
            className="btn btn-primary m-1"
          >
            Previous
          </Link>{" "}
          <Link
            to={`/dashboard?date=${today()}`}
            className="btn btn-primary m-1"
          >
            Today
          </Link>{" "}
          <Link
            to={`/dashboard?date=${next(date)}`}
            className="btn btn-primary m-1"
          >
            Next
          </Link>
          <div className="card">
            <CustomerReservations
              reservations={reservations}
              handleCancel={handleCancel}
            />
          </div>
        </div>
        <div className="card" style={{ width: "50%" }}>
          <Table
            tables={tables}
            setTables={setTables}
            handleFinish={handleFinish}
          />
        </div>
      </div>
    </main >
  );
}

export default Dashboard;