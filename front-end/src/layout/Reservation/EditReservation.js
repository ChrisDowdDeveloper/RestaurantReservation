import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import FormComponent from "./FormComponent";
import ReservationValidation from "./ReservationValidation";

export default function EditReservation() {
    const { reservation_id } = useParams();
    const [error, setError] = useState(null);
    const [reservation, setReservation] = useState({});
    const history = useHistory();

    //Loads the specific reservation and details
    useEffect(() => {
        const ac = new AbortController();
        async function loadReservation() {
            try {
                await readReservation(reservation_id, ac.signal)
                    .then(setReservation)
            } catch (e) {
                setError(e)
            }
        }
        loadReservation()
        return () => ac.abort();
    }, [reservation_id]);

    const onSubmit = (event) => {
        event.preventDefault();
        const errors = ReservationValidation(reservation);
        if (errors.length) {
            setError(errors)
        } else {
            try {
                updateReservation(reservation)
                    .then(() => {
                        history.push(`/dashboard?date=${reservation.reservation_date}`)
                    })
            } catch (err) {
                setError(err)
            }
        }
    }

    return (
        <div>
            <ErrorAlert error={error} />
            <FormComponent
                type="Edit"
                reservation={reservation}
                setReservation={setReservation}
                onSubmit={onSubmit}
            />
        </div>
    );
}