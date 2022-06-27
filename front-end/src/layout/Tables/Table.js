import React from "react";

export default function Table({ tables, handleTable }) {


    return (
        <div className="table-responsive">
            <h2>-Tables-</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Table Name</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tables.map(table => (
                        <tr key={table.table_id}>
                            <td>{table.table_name}</td>
                            <td>{table.capacity}</td>
                            <td data-table-id-status={table.table_id}>{(table.reservation_id) ? "Occupied" : "Free"}</td>
                            <td>{table.reservation_id ? (<button type="button" className="btn btn-danger btn-md" data-table-id-finish={table.table_id} onClick={() => handleTable(table)}>Finish</button>) : null}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}