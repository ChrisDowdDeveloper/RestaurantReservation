import React, { useState } from "react"
import { formatAsTime, today } from "../../utils/date-time"
import formatReservationTime from "../../utils/format-reservation-time";

export default function ValidateReservation() {

    const [resDate, setResDate] = useState(today());
    const [resTime, setResTime] = useState()

    const handleDate = (event) => setResDate(event.target.value)
    const handleTime = (event) => setResTime(event.target.value)

    let timeOpen = `10:30`
    let timeClosed = `21:30`

    console.log(resTime)

    if (resDate < today()) {
        return (
            <div>
                <label>
                    Date of reservation
                    <input
                        type="date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        onChange={handleDate}
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
                        onChange={handleTime}
                        required
                    />
                </label>
            </div>
        )
    } else if (resTime < timeOpen) {
        return (
            <div>
                <label>
                    Date of reservation
                    <input
                        type="date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        onChange={handleDate}
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
                        onChange={handleTime}
                        required
                    />
                </label>
                <label className="alert alert-danger">Reservation must be made after 10:30am</label>
            </div>
        )
    } else if (resTime > timeClosed) {
        return (
            <div>
                <label>
                    Date of reservation
                    <input
                        type="date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        onChange={handleDate}
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
                        onChange={handleTime}
                        required
                    />
                </label>
                <label className="alert alert-danger">Reservation must be made before 9:30pm</label>
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
                        onChange={handleDate}
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
                        onChange={handleTime}
                        required
                    />
                </label>
            </div >
        )
    }
}
