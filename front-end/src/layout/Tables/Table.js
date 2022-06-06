import React from "react";
import { useHistory } from "react-router";
import { deleteTableStatus, updateStatus } from "../../utils/api";

export default function Table({ tables }) {

    const history = useHistory();

    async function handleTable(table_id) {
        if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
            const abortController = new AbortController();
            async function finishedTable() {
                await deleteTableStatus(table_id, abortController.signal);
                history.go("/");
            }
            async function finishStatus() {
                await updateStatus("finished");
                history.go("/");
            }
            finishedTable();
            finishStatus();
        }
    }


    return (
        <div>
            {tables.map(table => (
                <div key={table.table_id}>
                    <h5>Table: {table.table_name}</h5>
                    <div>
                        <p>Capacity: {table.capacity}</p>
                        <p data-table-id-status={table.table_id}>Status: {table.status === "open" ? "free" : "occupied"}</p> 
                    </div>
                    {table.status !== "open" ? <button data-table-id-finish={table.table_id} type="button" onClick={() => handleTable(table.table_id)}>Finish</button> : null}
                </div>
            ))}
        </div>
    )
}