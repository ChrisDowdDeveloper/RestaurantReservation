import React from "react";
import { useHistory } from "react-router-dom";
import { updateReservation, createReservation } from "../../utils/api";

export default function FormComponent(props) {
    const history = useHistory();
    const {
        type,
        reservation,
        setReservation,
        setError,
    } = props;

    const handleReservation = ({ target: { name, value } }) => {
        if (name === "people") {
            value = Number(value);
        }
        setReservation((prevRes) => ({
            ...prevRes,
            [name]: value,
        }));
        setError(null);
    }

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
            if (type === "Edit") {
                updateReservation(reservation, abortController.signal)
                    .then(history.push(`/dashboard?date=${reservation.reservation_date}`));
            } else {
                createReservation(reservation, abortController.signal)
                    .then(history.push(`/dashboard?date=${reservation.reservation_date}`))
            }
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
        <div className="card my-3 border-secondary">
            <h3 className="card-header text-white bg-secondary">{type} Reservation</h3>
            <div className="card-body"></div>
            <form onSubmit={handleSubmit}>
                <div className="col-10 form-group">
                    <label className="form-label" htmlFor="first_name">First name: </label>
                    <input
                        className="form-control"
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={reservation.first_name || ''}
                        onChange={handleReservation}
                        required={true}
                    />
                    <label className="form-label" htmlFor="last_name">Last name:</label>
                    <input
                        className="form-control"
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={reservation.last_name || ''}
                        onChange={handleReservation}
                        required={true}
                    /><br />
                    <label className="form-label" htmlFor="mobile_number">Mobile number: </label>
                    <input
                        className="form-control"
                        id="mobile_number"
                        name="mobile_number"
                        type="text"
                        value={reservation.mobile_number || ''}
                        onChange={handleReservation}
                        required={true}
                        placeholder="(xxx) xxx-xxxx"
                    /><br />
                    <label className="form-label" htmlFor="reservation_date">Reservation date: </label>
                    <input
                        className="form-control"
                        id="reservation_date"
                        name="reservation_date"
                        type="date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        value={reservation.reservation_date || ''}
                        onChange={handleReservation}
                        required={true}
                    />
                    <label className="form-label" htmlFor="reservation_time">Reservation time: </label>
                    <input
                        className="form-control"
                        id="reservation_time"
                        name="reservation_time"
                        type="time"
                        placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]:{2}"
                        value={reservation.reservation_time || ''}
                        onChange={handleReservation}
                        required={true}
                    /><br />
                    <label className="form-label" htmlFor="people">Number of people: </label>
                    <input
                        className="form-control"
                        id="people"
                        name="people"
                        type="number"
                        min={1}
                        value={reservation.people || ''}
                        onChange={handleReservation}
                        required={true}
                    /><br />
                    <div>
                        <button type="button" className="btn btn-secondary m-2" onClick={() => history.goBack()}> Cancel </button>
                        <button type="submit" className="btn btn-primary m-2"> Submit </button>
                    </div>
                </div>
            </form>
        </div>
    )
}