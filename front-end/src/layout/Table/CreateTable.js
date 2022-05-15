import React, { useState } from "react"; 
import { useHistory } from "react-router-dom";
import { createTable } from "../../utils/api";

export default function CreateTable() {
    const [tableName, setTableName] = useState("");
    const [tableCapacity, setTableCapacity] = useState(1);

    const history= useHistory();

    const tableForm = {
        "tableName": tableName,
        "tableCapacity": tableCapacity,
    }

    const handleTable = (event) => setTableName(event.target.value);
    
    function handleCapacity() {
        setTableCapacity(tableCapacity + 1)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(tableCapacity < 1) {
            alert("Tables must be occupied by at least or more people")
        } else {
            createTable(tableForm).then((result) => history.push("/"))
        }
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
                onChange={handleCapacity} 
            />
            <br />
            <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.push("/")}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Submit
                </button>
        </form>
    )
}