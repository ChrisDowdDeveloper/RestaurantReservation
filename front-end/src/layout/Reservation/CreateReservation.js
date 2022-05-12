import React, { useState } from "react";
import { uesHistory, Link } from "react-router-dom";
import { }
export default function CreateReservation() {



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="FirstName">
                    First Name:
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        onChange={handleFirstName}
                    />
                </label>
                <br />
                <label htmlFor="LastName">
                    Last Name:
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        onChange={handleLastName}
                    />
                </label>
                <br />
                <label>
                    Mobile number:
                    <input name="mobile_number" />
                </label>
                <br />
                <label>
                    Date of reservation
                    <input name="reservation_date" />
                </label>
                <label>
                    Time of Reservation:
                    <input name="reservation_time" />
                </label>
                <label>
                    Party Size:
                    <input name="people" />
                </label>
                <br />
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.push("/")}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}