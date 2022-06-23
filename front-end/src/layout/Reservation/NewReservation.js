import React, { useState } from "react";
import { createReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import { useHistory } from "react-router";
import FormComponent from "./FormComponent";


//Creates a reservation
export default function NewReservation() {
    const [error, setError] = useState(null);
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState(0);
    const [partySize, setPartySize] = useState("");
    const [reservationDate, setReservationDate] = useState("");
    const [reservationTime, setReservationTime] = useState("")

    const reservation = {
        "first_name": firstName,
        "last_name": lastName,
        "mobile_number": number,
        "people": partySize,
        "reservation_date": reservationDate,
        "reservation_time": reservationTime,
    };

    function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController()
        try {
            createReservation(reservation, abortController.signal)
                .then((result) => history.push("/dashboard"))
        } catch (e) {
            setError(e)
        }
        return () => abortController.abort();
    }

    return (
        <div>
            <ErrorAlert error={error} />
            <FormComponent
                type="New"
                reservation={reservation}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setNumber={setNumber}
                setPartySize={setPartySize}
                setReservationDate={setReservationDate}
                setReservationTime={setReservationTime}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}