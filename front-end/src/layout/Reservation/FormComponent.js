import React from "react";
import { useHistory } from "react-router-dom";

export default function FormComponent(props) {
    const history = useHistory();
    const { 
        type,
        reservation, 
        setFirstName, 
        setLastName, 
        setNumber, 
        setPartySize, 
        setReservationDate, 
        setReservationTime, 
        handleSubmit 
    } = props;
 
    const handleFirstName = (event) => setFirstName(event.target.value);
    const handleLastName = (event) => setLastName(event.target.value);
    const handleNumber = (event) => setNumber(event.target.value);
    const handlePeople = (event) => setPartySize(parseInt(event.target.value));
    const handleResDate = (event) => setReservationDate(event.target.value);
    const handleResTime = (event) => setReservationTime(event.target.value);


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
                value={reservation.first_name ||''}
                onChange={handleFirstName}
                required={true}
            />
            <label className="form-label" htmlFor="last_name">Last name:</label>
            <input  
                className="form-control"
                id="last_name"
                name="last_name"
                type="text"
                value={reservation.last_name ||''}
                onChange={handleLastName}
                required={true}
            /><br/>
            <label className="form-label" htmlFor="mobile_number">Mobile number: </label>
            <input  
                className="form-control"
                id="mobile_number"
                name="mobile_number"
                type="text"
                value={reservation.mobile_number ||''}
                onChange={handleNumber}
                required={true}
                placeholder="(xxx) xxx-xxxx"
            /><br/>
            <label className="form-label" htmlFor="reservation_date">Reservation date: </label>
            <input  
                className="form-control"
                id="reservation_date"
                name="reservation_date"
                type="date"
                placeholder="YYYY-MM-DD"
                pattern="\d{4}-\d{2}-\d{2}"
                value={reservation.reservation_date ||''}
                onChange={handleResDate}
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
                value={reservation.reservation_time ||''}
                onChange={handleResTime}
                required={true}
            /><br/>
            <label className="form-label" htmlFor="people">Number of people: </label>
            <input  
                className="form-control"
                id="people"
                name="people"
                type="number"
                min={1}
                value={reservation.people ||''}
                onChange={handlePeople}
                required={true}
            /><br/>
            <div>
                <button type="button" className="btn btn-secondary m-2" onClick={()=>  history.goBack()}> Cancel </button>
                <button type="submit" className="btn btn-primary m-2"> Submit </button>
            </div>
        </div>
    </form>
</div>   
    )
}