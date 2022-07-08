import React, { useState } from "react";
import { listByPhone } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import CustomerReservations from "../Reservation/CustomerReservations";

function Search() {
  const [number, setNumber] = useState({
    mobile_number: "",
  });
  const [foundReservations, setFoundReservations] = useState([]);
  const [error, setError] = useState(null);

  //Handles the number that is being typed
  const handleChange = (event) => {
    event.preventDefault();
    setNumber({ ...number, [event.target.name]: event.target.value });
  };

  //Handles the request to search for the number
  const handleFind = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      listByPhone(
        number.mobile_number,
        abortController.signal
      ).then(setFoundReservations);
    } catch (err) {
      setError(err);
    }
    return () => abortController.abort();
  };

  return (
    <div>
      <h2 className="card-header text-white bg-secondary" style={{ textAlign: "center" }}> Search</h2>
      <div className="card my-3 border-secondary">
        <div className="card-body">
          <form>
            <div className="col-10 form-group">
              <label className="form-label">Search by phone number</label>
              <input
                id="searchNumber"
                name="mobile_number"
                className="form-control"
                type="tel"
                onChange={handleChange}
                value={number.mobile_number}
                placeholder="Enter a customer's phone number"
                required
              />
            </div>
          </form>
        </div>
      </div>
      <div>
        <button onClick={handleFind} type="submit" className="btn btn-primary m-2">
          Find
        </button>
      </div>
      <ErrorAlert error={error} />
      <CustomerReservations reservations={foundReservations} />
    </div>
  );
}

export default Search;