import React, { useState } from "react";
import ErrorAlert from "../ErrorAlert";
import FormComponent from "./FormComponent";


//Creates a reservation
export default function NewReservation() {
    const [error, setError] = useState(null);
    const initialForm = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
    };

    const [reservation, setReservation] = useState({ ...initialForm });


    return (
        <div>
            <ErrorAlert error={error} />
            <FormComponent
                type="New"
                reservation={reservation}
                setReservation={setReservation}
                setError={setError}
            />
        </div>
    );
}