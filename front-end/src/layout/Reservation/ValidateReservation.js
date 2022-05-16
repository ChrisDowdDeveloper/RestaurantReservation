import React, { useState } from "react"
import { previous, today } from "../../utils/date-time"

export default function ValidateReservation({ date }) {
    const [reservationDate, setReservationDate] = useState(today());

    function handleDateChange(date) {
        setReservationDate()
    }
    console.log(reservationDate)

    if (reservationDate === previous(today())) {
        return (
            <div>
                <label>
                    Date of reservation
                    <input
                        type="date"
                        placeholder="YYYY-MM-DD"
                        className="alert alert-danger"
                        pattern="\d{4}-\d{2}-\d{2}"
                        onChange={handleDateChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Time of Reservation:
                    <input
                        type="time" placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]{2}"
                        required
                    />
                </label>
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
                        required
                    />
                </label>
                <br />
                <label>
                    Time of Reservation:
                    <input
                        type="time" placeholder="HH:MM"
                        pattern="[0-9]{2}:[0-9]{2}"
                        required
                    />
                </label>
            </div>
        )
    }
}