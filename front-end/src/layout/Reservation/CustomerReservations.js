import { Link } from "react-router-dom";

function CustomerReservations({ reservations, handleCancel }) {
    /*
        Lists the reservation and adds an extra measure to make sure 
        that reservations with the status of "finished" or "cancelled" aren't included
    */
    const list = reservations.map((reservation) => {
        if (reservation.status === "finished" || reservation.status === "cancelled")
            return null;
        return (
            <div
                className="card-body"
                key={reservation.reservation_id}
            >
                <h3>{reservation.reservation_date}</h3>
                <h4 className="card-title">
                    Name: {reservation.last_name}, {reservation.first_name}
                </h4>
                <p className="card-text">Time: {reservation.reservation_time}</p>

                <p className="card-text">Phone Number: {reservation.mobile_number}</p>
                <p className="card-text">Size: {reservation.people}</p>
                <p data-reservation-id-status={reservation.reservation_id} className="card-text">
                    Status: {reservation.status}
                </p>
                <div>
                    {reservation.status === "booked" && (
                        <Link
                            to={`/reservations/${reservation.reservation_id}/seat`}
                            className="btn btn-success res-card-link"

                        >
                            Seat
                        </Link>
                    )}
                    {"   "}
                    {reservation.status === "booked" && (
                        <Link
                            to={`/reservations/${reservation.reservation_id}/edit`}
                            className="btn btn-success res-card-link"
                        >
                            Edit
                        </Link>
                    )}
                    {"   "}
                    <button
                        data-reservation-id-cancel={reservation.reservation_id}
                        onClick={() => handleCancel(reservation.reservation_id)}
                        className="btn btn-danger res-card-link"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    });

    if (reservations.length < 1) {
        return (
            <div>
                <p style={{ textAlign: "center" }}>No reservations found</p>
            </div>
        );
    }
    return (
        <div className="row res-card-container">
            {list}
            <br />
        </div>
    );
}

export default CustomerReservations;