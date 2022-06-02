import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../../utils/api";
import ValidateTable from "./ValidateTable";

export default function CreateTable() {
    const [tableName, setTableName] = useState("");
    const [tableCapacity, setTableCapacity] = useState(1);

    const history = useHistory();

    const tableForm = {
        "table_name": tableName,
        "capacity": tableCapacity,
    }

    const handleTable = (event) => setTableName(event.target.value);

    const handleCapacity = (event) => setTableCapacity(parseInt(event.target.value))

    const handleSubmit = (event) => {
        event.preventDefault();
        createTable(tableForm).then(() => history.push("/"))
    }


    return (
        <form onSubmit={handleSubmit}>
            <label>Table Name</label>
            <input
                name="table_name"
                onChange={handleTable}
                required
            />
            <br />
            <label>Capacity</label>
            <input
                name="capacity"
                type="number"
                required
                onChange={handleCapacity}
            />
            <br />
            <ValidateTable
                tableCapacity={tableCapacity}
                tableName={tableName}
                history={history}
            />
        </form >
    )
}