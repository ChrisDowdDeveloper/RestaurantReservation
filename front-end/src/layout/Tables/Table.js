import React from "react";
import { useHistory } from "react-router";
import { deleteTableStatus } from "../../utils/api";

export default function Table({ tables }) {

    const history = useHistory();

    const clearTable = (event) => {
        event.preventDefault();
        if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
            const abortController = new AbortController();
            async function finishedTable() {
                await deleteTableStatus(tables.table_id, abortController.signal);
                history.go("/");
            }
            finishedTable();
        }
    }


    return (
        <div>
            {tables.map(table => (
                <div key={table.table_id}>
                    <h5>Table: {table.table_name}</h5>
                    <div>
                        <p>Capacity: {table.capacity}</p>
                        <p data-table-id-status={table.table_id}>Status: {"free" || "occupied"}</p>

                        <button data-table-id-finish={table.table_id} type="button" onClick={clearTable}>Finish</button>

                    </div>
                </div>
            ))}
        </div>
    )
}