import React, { useEffect, useState } from "react";
import ValidateReservation from "./ValidateReservation";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../../utils/api";
import form from "./NewReservation";


export default function EditReservation() {
    const { reservation_id } = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState(0);
    const [partySize, setPartySize] = useState(0);
    const newFormData = {
        "first_name": firstName,
        "last_name": lastName,
        "mobile_number": number,
        "party_size": partySize
    }
    const history = useHistory();

    useEffect(() => {
        const ac = new AbortController();
        async function loadReservation() {
            const loadedRes = await readReservation(reservation_id, ac.signal);
            setFirstName(loadedRes.first_name);
            setLastName(loadedRes.last_name);
            setNumber(loadedRes.mobile_number);
            setPartySize(loadedRes.party_size);
        }
        loadReservation();
        return () => ac.abort();
    }, [reservation_id])

    const handleFirst = (event) => setFirstName(event.target.value);
    const handleLast = (event) => setLastName(event.target.value);
    const handleSize = (event) => setPartySize(event.target.value);
    const handleNumber = (event) => setNumber(event.target.value)

    function handleSubmit(event) {
        event.preventDefault();
        updateReservation(newFormData)
            .then((result) => history.push("/dashboard"));
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
                        value={firstName}
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
                        value={lastName}
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
                        value={number}
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
                        value={partySize}
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