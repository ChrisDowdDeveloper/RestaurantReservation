import React from "react"
import { useHistory } from "react-router";
import { today } from "../../utils/date-time";

export default function ValidateReservation({ form, reservationDate, setReservationDate, reservationTime, setReservationTime }) {
    let timeOpen = `10:30`;
    let timeClosed = `21:30`;
    let currentDate = new Date();
    let time = `${currentDate.getHours()}:${currentDate.getHours()}`
    const history = useHistory();

    if (form.reservation_date < today()) {
        return (
            <div>
                <label>
                    Date of reservation
                    <input
                        type="date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        onChange={(event) => setReservationDate(event.target.value)}
                        required
                    />
                </label>
                <label className="alert alert-danger">Reservation must be on todays date or after</label>
                <br />
                <label>
                    Time of Reservation:
                    <input
                        type="time"
                        placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]{2}"
                        onChange={(event) => setReservationTime(event.target.value)}
                        required
                    />
                </label>
                <br />
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.push("/")}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled
                >
                    Submit
                </button>
            </div>
        )
    } else if (form.reservation_time < timeOpen) {
        return (
            <div>
                <label>
                    Date of reservation
                    <input
                        type="date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        onChange={(event) => setReservationDate(event.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Time of Reservation:
                    <input
                        type="time"
                        placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]{2}"
                        onChange={(event) => setReservationTime(event.target.value)}

                    />
                </label>
                <label className="alert alert-danger">Reservation must be made after 10:30am</label>
                <br />
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.push("/")}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"

                >
                    Submit
                </button>
            </div>
        )
    } else if (form.reservation_time > timeClosed) {
        return (
            <div>
                <label>
                    Date of reservation
                    <input
                        type="date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        onChange={(event) => setReservationDate(event.target.value)}

                    />
                </label>
                <br />
                <label>
                    Time of Reservation:
                    <input
                        type="time"
                        placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]{2}"
                        onChange={(event) => setReservationTime(event.target.value)}
                        required
                    />
                </label>
                <label className="alert alert-danger">Reservation must be made before 9:30pm</label>
                <br />
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.push("/")}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"

                >
                    Submit
                </button>
            </div>
        )
    } else if (form.reservation_time <= time && form.reservation_date === today()) {
        return (
            <div>
                <label>
                    Date of reservation
                    <input
                        type="date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        onChange={(event) => setReservationDate(event.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Time of Reservation:
                    <input
                        type="time"
                        placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]{2}"
                        onChange={(event) => setReservationTime(event.target.value)}
                        required
                    />
                </label>
                <label className="alert alert-danger">Reservations cannot be made after time has passed</label>
                <br />
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.push("/")}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled
                >
                    Submit
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <label>
                    Date of reservation
                    <input
                        type="date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        onChange={(event) => setReservationDate(event.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Time of Reservation:
                    <input
                        type="time"
                        placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]{2}"
                        onChange={(event) => setReservationTime(event.target.value)}
                        required
                    />
                </label>
                <br />
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.push("/")}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </div>
        )
    }
}
