import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";


export default function Reservation() {
    const { reservationId } = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [number, setNumber] = useState(0);
    const [partySize, setPartySize] = useState(0);
    const history = useHistory();

    const NewReservationData = {
        "firstName": firstName,
        "lastName": lastName,
        "number": number,
        "partySize": partySize,
    }

    return (
        <div>
            <h1>Edit Reservation</h1>
        </div>
    )
}