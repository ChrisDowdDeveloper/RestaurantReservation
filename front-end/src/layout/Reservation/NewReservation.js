import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../ErrorAlert";
import FormComponent from "./FormComponent";
import ReservationValidation from "./ReservationValidation";
import { createReservation } from "../../utils/api";


//Creates a reservation
export default function NewReservation() {
    const [error, setError] = useState(null);
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

    const onSubmit = (event) => {
        const abortController = new AbortController();
        event.preventDefault();
        const errors = ReservationValidation(reservation, abortController.signal);
        if (errors.length) {
            setError(errors)
        } else {
            try {
                createReservation(reservation,)
                    .then(() => {
                        history.push(`/dashboard?date=${reservation.reservation_date}`)
                    })
            } catch (err) {
                setError(err)
            }
        }
        return () => abortController.abort();
    }


    return (
        <div>
            <ErrorAlert error={error} />
            <FormComponent
                type="New"
                reservation={reservation}
                setReservation={setReservation}
                onSubmit={onSubmit}
            />
        </div>
    );
}