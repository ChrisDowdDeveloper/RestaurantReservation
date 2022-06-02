import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../../utils/api";


export default function EditReservation() {
    const { reservation_id } = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState(0);
    const [partySize, setPartySize] = useState("");
    const [reservationDate, setReservationDate] = useState("");
    const [reservationTime, setReservationTime] = useState("");
    const newFormData = {
        "first_name": firstName,
        "last_name": lastName,
        "mobile_number": number,
        "party_size": partySize,
        "reservation_date": reservationDate,
        "reservation_time": reservationTime,
    }
    const history = useHistory();

    useEffect(() => {
        const ac = new AbortController();
        async function loadReservation() {
            const loadedRes = await readReservation(reservation_id, ac.signal);
            setFirstName(loadedRes.first_name)
            setLastName(loadedRes.last_name)
            setNumber(loadedRes.mobile_number)
            setPartySize(loadedRes.party_size)
            //setReservationDate(loadedRes.reservationDate)
            //setReservationTime(loadedRes.reservationTime)
        }
        loadReservation();
        return () => ac.abort();
    }, [reservation_id])

    const handleFirst = (event) => setFirstName(event.target.value);
    const handleLast = (event) => setLastName(event.target.value);
    //const handleSize = (event) => setPartySize(event.target.value);
    const handleNumber = (event) => setNumber(event.target.value);
    //const handleDate = (event) => setReservationDate(event.target.value);
    //const handleTime = (event) => setReservationTime(event.target.value);

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
                        value={firstName ||''}
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
                        value={lastName || ''}
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
                        value={number || ''}
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
                        value={partySize || ''}
                        required
                        onChange={(event) => setPartySize(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Date of reservation
                    <input
                        type="date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        value={reservationDate || ''}
                        onChange={(event) => setReservationDate(event.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Time of Reservation:
                    <input
                        type="time"
                        placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]{2}"
                        value={reservationTime || ''}
                        onChange={(event) => setReservationTime(event.target.value)}
                        required
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
        </div >
    );
}