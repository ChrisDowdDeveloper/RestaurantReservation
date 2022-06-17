import React from "react";

export default function Table({ tables, handleTable }) {

    return (
        <div>
            <p>________________________</p>
            <h2 className="dash">-Tables-</h2>
            <div className="container">
                <div className="col">
                    {tables.map(table => (
                        <div className="table" key={table.table_id}>
                            <h5>Table: {table.table_name}</h5>
                            <div>
                                <p>Capacity: {table.capacity}</p>
                                <p data-table-id-status={table.table_id}>Status: {table.status === "open" ? "free" : "occupied"}</p>
                            </div>
                            {table.status !== "open" ? <button type="button" data-table-id-finish={table.table_id} onClick={() => handleTable(table.table_id)}>Finish</button> : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}