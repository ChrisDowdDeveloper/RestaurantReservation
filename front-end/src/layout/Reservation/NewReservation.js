import React, { useState } from "react";
import { createReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import { useHistory } from "react-router";
import FormComponent from "./FormComponent";


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



    async function handleSubmit(event) {
        const abortController = new AbortController();
        try {
            event.preventDefault();
            if (!checkTuesday(reservation.reservation_date)) {
                throw new Error('Restaurant is closed on Tuesdays')
            } else if (!checkTime(reservation.reservation_time)) {
                throw new Error('A reservation cannot be made before 10:30am or after 9:30pm')
            } else if (!futureReservation()) {
                throw new Error("A reservation can only be made on or after today's date.")
            }
            createReservation(reservation, abortController.signal)
                .then(history.push(`/dashboard?date=${reservation.reservation_date}`));
        } catch (err) {
            setError(err)
        }
        return () => abortController.abort();
    }

    const checkTuesday = (dateInput) => {
        const dateToCheck = new Date(`${dateInput} 00:00`)
        return dateToCheck.getDay() !== 2;
    }

    const checkTime = (timeInput) => {
        return (timeInput > '10:30' && timeInput < '21:30')
    }

    const futureReservation = () => {
        const dateToCheck = new Date(`${reservation.reservation_date} ${reservation.reservation_time} CST`);
        return Date.now() < dateToCheck.getTime();
    }

    return (
        <div>
            <ErrorAlert error={error} />
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