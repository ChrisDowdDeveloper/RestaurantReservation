import FormError from "../FormError";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../../utils/api";
import FormComponent from "./FormComponent";

function NewReservation() {
    const history = useHistory();
    const [formError, setFormError] = useState([]);
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    });

    //Handles the changes made to the new form
    const handleChange = (event) => {
        event.preventDefault();
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    //Handles the submit request to create the reservation
    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            await createReservation(form, abortController.signal);
            history.push(`/dashboard?date=${form.reservation_date}`);
        } catch (err) {
            setFormError([err.message]);
        }
        return () => abortController.abort();
    };

    return (
        <div>
            <h2 className="card-header text-white bg-secondary">Create New Reservation</h2>
            <div className="card my-3 border-secondary">
                <FormError formError={formError} />
                <FormComponent
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    form={form}
                    formError={formError}
                />
            </div>
        </div>
    );
}

export default NewReservation;