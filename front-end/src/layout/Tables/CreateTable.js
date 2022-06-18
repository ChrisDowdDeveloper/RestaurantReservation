import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import ValidateTable from "./ValidateTable";

//Allows user to create a Table
export default function CreateTable() {
    const [tableName, setTableName] = useState("");
    const [tableCapacity, setTableCapacity] = useState(1);
    const [error, setError] = useState(null);

    const history = useHistory();

    const tableForm = {
        "table_name": tableName,
        "capacity": tableCapacity,
    }

    const handleTable = (event) => setTableName(event.target.value);

    const handleCapacity = (event) => setTableCapacity(parseInt(event.target.value))

    const handleSubmit = (event) => {
        event.preventDefault();
        createTable(tableForm)
            .then(() => history.push("/"))
            .catch(setError);
    }


    return (
        <div>
            <ErrorAlert error={error}/>
            <h1>Create A Table</h1>
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
        </form>
        </div>
    )
}