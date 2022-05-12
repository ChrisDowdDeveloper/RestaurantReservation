import React, { useState } from "react";
import { uesHistory, Link } from "react-router-dom";
import { formatAsTime, today } from "../../utils/date-time";
import { formatReservationDate } from "../utils/format-reservation_date";
import { createReservation } from "../../utils/api";

export default function CreateReservation() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState(0);
    const [partySize, setPartySize] = useState(0);

    const history = useHistory();

    const form = {
        "first_name": firstName,
        "last_name": lastName,
        "mobile_number": number,
        "reservation_date": today,
        "reservation_time": formatAsTime,
    }

    const handleFirstName = (event) => setFirstName(event.target.value);
    const handleLastName = (event) => setLastName(event.target.value);
    const handleNumber = (event) => setNumber(event.target.value);
    const handleParty = (event) => setPartySize(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        createReservation(form).then((result) => history.push("/"))
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="FirstName">
                    First Name:
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        required
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
                        placeholder="Last Name"
                        required
                        onChange={handleLastName}
                    />
                </label>
                <br />
                <label>
                    Mobile number:
                    <input
                        name="mobile_number"
                        type="number"
                        required
                        onChange={handleNumber}
                    />
                </label>
                <br />
                <label>
                    Date of reservation
                    <input
                        name="reservation_date" required
                        type="date"
                    />
                </label>
                <label>
                    Time of Reservation:
                    <input
                        name="reservation_time"
                        type="datetime-local"
                        required
                    />
                </label>
                <label>
                    Party Size:
                    <input
                        name="people"
                        type="number"
                        required
                        onChange={handleParty}
                    />
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