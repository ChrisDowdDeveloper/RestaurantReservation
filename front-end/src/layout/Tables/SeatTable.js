import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, seatTable } from "../../utils/api";

export default function SeatTable() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [tables, setTables] = useState([]);
  const [ tableId, setTableId ] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadTables() {
      const tableList = await listTables(abortController.signal)
      setTables(tableList)
      return () => abortController.abort();
    }
    loadTables()
    return () => abortController.abort();
  }, [reservation_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const controller = new AbortController();
    seatTable(tableId, reservation_id, controller.signal)
    .then(()=> history.push("/"))
    return () => controller.abort()
  };

  const handleTable = event => {
    event.preventDefault();
    setTableId(event.target.value);
  }

  return (
    <div>
      <h1>Seat Table Page</h1>
      <form onSubmit={handleSubmit}>
        <select 
          name="table_id"
          onChange={handleTable}
        >
          <option>Please Choose an Option</option>
          {tables.map(table => (
            <option
              key={table.table_id}
              value={table.table_id}>
              {table.table_name} - {table.capacity}
            </option>
          ))}
        </select>
        <button onClick={() => history.push("/")}>Cancel</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}