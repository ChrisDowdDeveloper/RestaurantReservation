import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import FormComponent from "./FormComponent";

export default function EditReservation() {
    const { reservation_id } = useParams();
    const [error, setError] = useState(null);
    const [reservation, setReservation] = useState({});


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


    return (
        <div>
            <ErrorAlert error={error} />
            <FormComponent
                error={error}
                reservation={reservation}
                setReservation={setReservation}
                setError={setError}
                type="Edit"
            />
        </div>
    );
}