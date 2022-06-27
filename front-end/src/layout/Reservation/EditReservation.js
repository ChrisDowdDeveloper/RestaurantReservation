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
        console.log("Button click ")
        event.preventDefault();
        const errors = ReservationValidation(reservation);
        console.log("errors " + errors)
        if (errors.length) {
            console.log("there are errors")
            setError(errors)
        } else {
            console.log("before try in else")
            try {
                console.log("before call")
                updateReservation(reservation)
                    .then(console.log("after call"))
                    .then(() => {
                        history.push(`/dashboard?date=${reservation.reservation_date}`)
                    })
                console.log("after call and push to dash")
            } catch (err) {
                console.log("In catch, call to API fail")
                setError(err)
                console.log("err from API" + err)
            }
        }
        console.log("end of submit")
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