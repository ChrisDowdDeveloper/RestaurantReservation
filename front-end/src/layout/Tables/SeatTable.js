import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listTables, readReservation } from "../../utils/api";

export default function SeatTable() {
  const { reservation_id } = useParams()
  const [tables, setTables] = useState([]);

  console.log(reservation_id)

  useEffect(() => {
    readReservation(reservation_id)
  }, [reservation_id])

  useEffect(() => {
    const abortController = new AbortController();
    async function loadTables() {
      const tableList = await listTables(abortController.signal);
      setTables(tableList);
    }
    loadTables()
    return () => abortController.abort();
  }, []);

  return (
    <div>
      <h1>Seat Table Page</h1>
      <select name="table_id">
        {tables.map(table => (
          <option
            key={table.table_id}
            value={table.table_id}>
            {table.table_name} - {table.capacity}
          </option>

        ))}
      </select>
    </div>
  )
}