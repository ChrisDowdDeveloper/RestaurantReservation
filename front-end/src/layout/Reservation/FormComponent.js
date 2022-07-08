import React from "react";
import { useHistory } from "react-router";


function FormComponent({ handleChange, handleSubmit, form }) {
    const history = useHistory();
    return (
        <div className="card-body">
            <form>
                <div className="col-10 form-group">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input
                        id="first_name"
                        className="form-control"
                        type="text"
                        name="first_name"
                        onChange={handleChange}
                        value={form.first_name || ""}
                        required
                    />
                </div>
                <div className="col-10 form-group">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input
                        id="last_name"
                        className="form-control"
                        type="text"
                        name="last_name"
                        onChange={handleChange}
                        value={form.last_name || ""}
                        required
                    />
                </div>
                <div className="col-10 form-group">
                    <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
                    <input
                        id="mobileNumber"
                        className="form-control"
                        type="tel"
                        name="mobile_number"
                        onChange={handleChange}
                        value={form.mobile_number || ""}
                        required
                    />
                </div>
                <div className="col-10 form-group">
                    <label htmlFor="reservation_date" className="form-label" >Date of Reservation</label>
                    <input
                        id="date"
                        className="form-control"
                        type="date"
                        name="reservation_date"
                        onChange={handleChange}
                        value={form.reservation_date || ""}
                        required
                    />
                </div>
                <div className="col-10 form-group">
                    <label htmlFor="reservation_time" className="form-label">Time of Reservation</label>
                    <input
                        id="time"
                        className="form-control"
                        type="time"
                        name="reservation_time"
                        onChange={handleChange}
                        value={form.reservation_time || ""}
                        required
                    />
                </div>
                <div className="col-10 form-group">
                    <label htmlFor="people" className="form-label">Number of People in Party</label>
                    <input
                        id="people"
                        type="number"
                        className="form-control"
                        name="people"
                        onChange={handleChange}
                        value={form.people || ""}
                        required
                    />
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary m-2">
                    Submit
                </button>
                <button onClick={() => history.push("/dashboard")} type="button" className="btn btn-secondary m-2" >Cancel</button>
            </form>
        </div>
    );
}

export default FormComponent;