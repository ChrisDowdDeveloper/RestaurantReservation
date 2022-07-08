import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { listById, listTables, seatTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function SeatTable() {
  const history = useHistory();
  const [reservation, setReservation] = useState([]);
  const [tables, setTables] = useState([]);
  const [current, setCurrent] = useState({ table_id: "" });
  const [error, setError] = useState(null);
  const { reservation_id } = useParams();

  useEffect(loadTableData, [reservation_id]);

  function loadTableData() {
    const abortController = new AbortController();
    listById(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setError);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setError);
    return () => abortController.signal;
  }

  //Handles the submit request to seat the table
  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await seatTable(
        reservation_id,
        current.table_id,
        abortController.signal
      );

      history.push("/dashboard");
    } catch (err) {
      setError(err);
    }
    return () => abortController.abort();
  };

  //Handles the table requested to be seated at
  const handleChange = (event) => {
    setCurrent({
      ...current,
      [event.target.name]: event.target.value,
    });
  };

  //Lists tables that aren't seated
  const freeTables = tables.filter((table) => table.reservation_id === null);

  const reservationCard = (
    <div key={reservation.reservation_id}>
      <div className="col-lg-4 col-xl-3 m-3 reservation-card text-black">
        <h3>{reservation.reservation_date}</h3>
        <h4>
          Name: {reservation.last_name} {reservation.first_name}
        </h4>
        <h5>Time: {reservation.reservation_time}</h5>


        <h5>Phone Number: {reservation.mobile_number}</h5>
        <h5>Size: {reservation.people}</h5>
      </div>
    </div>
  );

  return (
    <div className="new-res-body">
      <div className="seat-res-header">
        <h2 >Seat Reservation</h2>
      </div>
      {error && <ErrorAlert error={error} />}
      <div>{reservationCard}</div>
      <div>
        <form>
          <h3 className="search-res-list">Select a table</h3>
          <select name="table_id" onChange={handleChange}>
            <option>Select Table</option>
            {freeTables.map((table) => (
              <option
                key={table.table_id}
                value={table.table_id}
                defaultValue="Select Table"
              >
                {table.table_name} - {table.capacity}
              </option>
            ))}
          </select>
        </form>
      </div>
      <button onClick={handleSubmit} type="submit" className="btn-primary m-1">
        Seat
      </button>
      <button onClick={() => history.goBack()}>Cancel</button>

    </div>
  );
}

export default SeatTable;