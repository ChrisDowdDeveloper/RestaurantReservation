import React from "react";

export default function SeatTable({ reservations }) {
    <div>
        <h1>Seat Table Page</h1>
        <table>
        <tr>
          <th>{}</th>
          <th>{}</th>
        </tr>
        {reservations.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.age}</td>
              <td>{val.gender}</td>
            </tr>
          )
        })}
      </table>
    </div>
}