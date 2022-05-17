import React, { useEffect, useState } from "react";
import ValidateReservation from "./ValidateReservation";
import { useParams, useHistory } from "react-router-dom";


export default function EditReservation() {
    const { reservation_id } = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState(0);
    const [partySize, setPartySize] = useState(0);
    const history = useHistory();

    let form = {
        "first_name": firstName,
        "last_name": lastName,
        "phone_number": number,
        "party_size": partySize,
    }

    const handleFirst = (event) => setFirstName(...firstName, event.target.value);
    const handleLast = (event) => setLastName(...lastName, event.target.value);
    const handleSize = (event) => setPartySize(...partySize, event.target.value);
    const handleNumber = (event) => setNumber(...number, event.target.value)

    function handleSubmit(event) {
        event.preventDefault();
        // updateReservation()
    }

    return (
        < div >
            <form onSubmit={handleSubmit}>
                <label htmlFor="FirstName">
                    First Name:
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        placeholder="First Name"
                        required
                        onChange={handleFirst}
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
                        onChange={handleLast}
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
                    Party Size:
                    <input
                        name="people"
                        type="number"
                        required
                        onChange={handleSize}
                    />
                </label>
                <br />
                <ValidateReservation form={form} />
            </form>
        </div >
    );
}