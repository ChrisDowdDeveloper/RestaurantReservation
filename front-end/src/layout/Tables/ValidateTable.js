import React from "react"

export default function ValidateTable({ tableCapacity, tableName, history }) {

    if (tableCapacity >= 1 && tableName.length >= 2) {
        return (
            <div>
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
            </div>
        )
    } else if (tableName.length < 2 && tableCapacity > 1) {
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.push("/")}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-secondary"
                    disabled
                >
                    Submit
                </button>
                <br />
                <label className="alert alert-danger">Person's name must be at least 2 letters long</label>
            </div>
        )
    } else if (tableCapacity < 1 && tableName.length < 2) {
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.push("/")}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-secondary"
                    disabled
                >
                    Submit
                </button>
                <br />
                <label className="alert alert-danger">Must have at least one person</label>
                <label className="alert alert-danger">Person's name must be at least 2 letters long</label>
            </div>
        )
    } else {
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => history.push("/")}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-secondary"
                    disabled
                >
                    Submit
                </button>
                <br />
                <label className="alert alert-danger">Must have at least one person</label>
            </div>
        )
    }
}
