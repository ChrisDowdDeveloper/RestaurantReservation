import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import FormComponent from "./FormComponent";

export default function EditReservation() {
    const { reservation_id } = useParams();
    const [error, setError] = useState(null);
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState(0);
    const [partySize, setPartySize] = useState("");
    const [reservationDate, setReservationDate] = useState("");
    const [reservationTime, setReservationTime] = useState("");
    const reservation = {
        "first_name": firstName,
        "last_name": lastName,
        "mobile_number": number,
        "people": partySize,
        "reservation_date": reservationDate,
        "reservation_time": reservationTime,
    };

    //Loads the specific reservation and details


    useEffect(() => {
        const ac = new AbortController();
        async function loadReservation() {
        try {
            const loadedRes = await readReservation(reservation_id, ac.signal);
            setFirstName(loadedRes.first_name)
            setLastName(loadedRes.last_name)
            setNumber(loadedRes.mobile_number)
            setPartySize(loadedRes.people)
            setReservationDate(loadedRes.reservation_date)
            setReservationTime(loadedRes.reservation_time)
        } catch(e) {
            setError(e)
            }
        } 
        loadReservation()
        return () => ac.abort();
    }, [reservation_id]);


    function handleSubmit(event) {
        event.preventDefault();
        updateReservation(reservation)
            .then((result) => history.push("/dashboard"))
            .catch(setError);
    }

    return (
        <div>
            <ErrorAlert error={error}/>
            <FormComponent 
                error={error} 
                handleSubmit={handleSubmit}
                reservation={reservation}
                type="Edit"
            />
        </div>
    );
}