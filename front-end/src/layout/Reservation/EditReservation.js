import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom"
import FormComponent from "./FormComponent";
import { updateReservation, listById } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";



function EditReservation() {
    const initialForm = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: ""
    }
    const [form, setForm] = useState(initialForm)
    const { reservation_id } = useParams();
    const [formError, setFormError] = useState(null);
    const history = useHistory()

    useEffect(loadReservation, [reservation_id])

    //Loads the reservation that is being updated
    function loadReservation() {
        const abortController = new AbortController();
        setFormError(null)
        listById(reservation_id, abortController.signal)
            .then(setForm)
            .catch(setFormError);
        return () => abortController.abort()
    }

    //Handles the changes made to reservation
    const handleChange = (event) => {
        event.preventDefault();
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    //Handles the submit request for the changes that were made
    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            const reservation = await updateReservation(form, reservation_id, abortController.signal);
            const updatedDate = reservation.reservation_date.match(/\d{4}-\d{2}-\d{2}/)[0];
            history.push(`/dashboard?date=${updatedDate}`);
        } catch (err) {
            setFormError(err)
        }
        return () => abortController.abort()
    }

    return (
        <div>
            <h2 className="card-header text-white bg-secondary">Edit Reservation</h2>
            <div className="card my-3 border-secondary">
                <ErrorAlert error={formError} />
                <FormComponent
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    form={form}
                />
            </div>
        </div>
    )
}

export default EditReservation;