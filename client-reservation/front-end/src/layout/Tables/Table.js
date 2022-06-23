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
                            <td>{table.status}</td>
                            <td>{table.status !== "open" ? <button type="button" className="btn btn-danger btn-md" data-table-id-finish={table.table_id} onClick={() => handleTable(table.table_id)}>Finish</button> : null}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}