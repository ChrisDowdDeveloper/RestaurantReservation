import React, { useState } from "react";
import { createReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import { useHistory } from "react-router";
import FormComponent from "./FormComponent";


//Creates a reservation
export default function NewReservation() {
    const [error, setError] = useState([]);
    const history = useHistory();
    const initialForm = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
    };

    const [reservation, setReservation] = useState({ ...initialForm });
    console.log(error)

    const handleSubmit = (event) => {
        if (error.length === 0) setError(null);
        event.preventDefault();
        const abortController = new AbortController();
        try {
            if (error.length === 0) {
                createReservation(reservation, abortController.signal)
                    .then(history.push(`/dashboard?date=${reservation.reservation_date}`));
            }
        } catch (e) {
            setError(e)
        }
        return () => abortController.abort();
    }

    return (
        <div>
            {error.length > 0 ? <ErrorAlert error={error} /> : null}
            <FormComponent
                type="New"
                reservation={reservation}
                setReservation={setReservation}
                handleSubmit={handleSubmit}
                setError={setError}
            />
        </div>
    );
}