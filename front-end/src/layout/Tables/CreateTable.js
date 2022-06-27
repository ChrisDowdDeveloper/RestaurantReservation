import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

//Allows user to create a Table
export default function CreateTable() {
    const [error, setError] = useState(null);

    const history = useHistory();

    const tableForm = {
        "table_name": "",
        "capacity": 1,
    }

    const [table, setTable] = useState({ ...tableForm })

    const handleTable = ({ target }) => {
        const value =
            target.type === "number" ? Number(target.value) : target.value;
        setTable({ ...table, [target.name]: value });
        setError(null);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            if (table.table_name.length < 2) {
                throw new Error('Table name cannot be less than 2 letters')
            } else if (table.capacity < 1) {
                throw new Error('Table must be able to seat at least 1 guest')
            }
            createTable(table, abortController.signal)
                .then(() => history.push("/"))
        } catch (err) {
            setError(err)
        }
        return () => abortController.abort();
    }

    return (
        <div className="card my-3 border-secondary">
            <ErrorAlert error={error} />
            <h3 className="card-header text-white bg-secondary">Create Table</h3>
            <div className="card-body">
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
                            onChange={handleTable}
                        />
                        <br />
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => history.goBack()}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}