import React, { useEffect, useState } from "react";
import { listTables } from "../../utils/api";

export default function SeatTable() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadTables() {
      const tableList = await listTables(abortController.signal);
      setTables(tableList);
    }
    loadTables()
    return () => abortController.abort();
  }, []);

  console.log(tables)

  return (
    <div>
      <h1>Seat Table Page</h1>
      {tables.map(table => (
        <select name="table_id">
          <option value={table.table_id}>{table.table_name} - {table.capacity}</option>
        </select>
      ))}
    </div>
  )
}