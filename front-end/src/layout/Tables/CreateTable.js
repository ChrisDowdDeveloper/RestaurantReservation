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

    <div className="card my-3 border-secondary">
    <h3 className="card-header text-white bg-secondary">Create Table</h3>
    <div className="card-body"></div>
        <form onSubmit={handleSubmit}>
        <div className="col-10 form-group">
            <label className="form-label" htmlFor="first_name">Table Name: </label>
            <input 
                className="form-control" 
                name="table_name"
                onChange={handleTable}
                required
            />
            <label className="form-label" htmlFor="last_name">Table Capacity:</label>
            <input  
                className="form-control"
                name="capacity"
                type="number"
                required
                onChange={handleCapacity}
            /><br/>
            <div>
                <button type="button" className="btn btn-secondary m-2" onClick={()=>  history.goBack()}> Cancel </button>
                <button type="submit" className="btn btn-primary m-2"> Submit </button>
            </div>
        </div>
        <ValidateTable
                tableCapacity={tableCapacity}
                tableName={tableName}
                history={history}
            />
    </form>
</div>   
}