import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../../utils/api";
import ValidateReservation from "./ValidateReservation";

export default function NewReservation({ date }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState(0);
    const [partySize, setPartySize] = useState(0);

    const history = useHistory();

    let form = {
        "first_name": firstName,
        "last_name": lastName,
        "mobile_number": number,
        "party_size": partySize,
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
                        placeholder="First Name"
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
                    Party Size:
                    <input
                        name="people"
                        type="number"
                        required
                        onChange={handleParty}
                    />
                </label>
                <br />
                <ValidateReservation form={form} />
            </form>
        </div>
    );
}