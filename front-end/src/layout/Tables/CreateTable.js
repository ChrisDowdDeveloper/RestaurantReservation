import React, { useState } from "react";
import TableForm from "./TableForm";
import { useHistory } from "react-router-dom";
import { createTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function CreateTable() {
    const [newTable, setNewTable] = useState({
        table_name: "",
        capacity: "",
    });
    const history = useHistory();
    const [error, setError] = useState(null);

    //Handles the changes made to each input
    const handleChange = (event) => {
        event.preventDefault();
        setNewTable({ ...newTable, [event.target.name]: event.target.value });
    };

    //Handles the submit request to create the table
    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            await createTable(newTable, abortController.signal);
            history.push("/dashboard");
        } catch (err) {
            setError(err);
        }
        return () => abortController.abort();
    };

    //Handles the cancel button that allows the user to go back to the previous screen
    const handleCancel = () => {
        history.goBack();
    };

    return (
        <div>
            <h2 className="card-header text-white bg-secondary">Create New Table</h2>
            <div className="card my-3 border-secondary">
                <ErrorAlert error={error} />
                <TableForm
                    handleChange={handleChange}
                    newTable={newTable}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />
            </div>
        </div>
    );
}

export default CreateTable;