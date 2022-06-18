import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../../utils/api";
import ValidateReservation from "./ValidateReservation";
import { today } from "../../utils/date-time";


//Creates a reservation
export default function NewReservation() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState(0);
    const [people, setPeople] = useState("");
    const [reservationDate, setReservationDate] = useState(today());
    const [reservationTime, setReservationTime] = useState("");

    const history = useHistory();

    let form = {
        "first_name": firstName,
        "last_name": lastName,
        "mobile_number": number,
        "people": people,
        "reservation_date": reservationDate,
        "reservation_time": reservationTime,
    }

    //Handles the letters typed into the form and sets them to their respective form data. 
    const handleFirstName = (event) => setFirstName(event.target.value);
    const handleLastName = (event) => setLastName(event.target.value);
    const handleNumber = (event) => setNumber(event.target.value);
    const handlePeople = (event) => setPeople(parseInt(event.target.value));

    const handleSubmit = (event) => {
        event.preventDefault();
        createReservation(form)
            .then(() => {
                history.push(`/dashboard?date=${form.reservation_date}`)
            })
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="FirstName">
                        First Name:
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            placeholder="First Name"
                            required
                            onChange={handleFirstName}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="LastName">
                        Last Name:
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            placeholder="Last Name"
                            required
                            onChange={handleLastName}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Mobile number:
                        <input
                            name="mobile_number"
                            type="number"
                            required
                            onChange={handleNumber}
                        />
                    </label>
                </div>    
                <div className="form-group">
                    <label>
                        Party Size:
                        <input
                            name="people"
                            type="number"
                            required
                            onChange={handlePeople}
                        />
                    </label>
                </div>
                <ValidateReservation 
                    form={form} 
                    setReservationDate={setReservationDate} 
                    setReservationTime={setReservationTime}
                />
            </form>
        </div>
    );
}