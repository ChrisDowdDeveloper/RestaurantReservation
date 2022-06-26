import React from "react";
import { useHistory } from "react-router-dom";

export default function FormComponent(props) {
    const history = useHistory();
    const {
        type,
        reservation,
        setReservation,
        handleSubmit,
        setError,
    } = props;

    const validation = () => {
        let errorsFound = [];
        let dateToCheck = (`${reservation.reservation_date} ${reservation.reservation_time}`)
        const date = new Date(reservation.reservation_date);
        const day = date.getUTCDay();
        let currentDay = new Date()
        if (day === 2) errorsFound.push({ message: "Restaurant is closed on Tuesdays." })
        if (dateToCheck < currentDay) errorsFound.push({ message: "Reservations cannot be made in the past." })
        let timeToCheck = Number(reservation.reservation_time.replace(":", ""));
        if (timeToCheck < 1030) errorsFound.push({ message: "Reservations cannot be made before 10:30am." });
        if (timeToCheck > 2130) errorsFound.push({ message: "Reservations cannot be made after 9:30pm." });
        if (timeToCheck > 2230) errorsFound.push({ message: "Restaurant is closed at 10:30." });
        if (errorsFound.length > 0) setError(errorsFound)
    }


    const handleReservation = ({ target }) => {
        const value =
            target.type === "number" ? Number(target.value) : target.value;
        setReservation({ ...reservation, [target.name]: value });
        validation();
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