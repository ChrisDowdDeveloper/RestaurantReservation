function TableForm({ handleChange, newTable, handleSubmit, handleCancel }) {
    return (
        <div className="card-body">
            <form>
                <div className="col-10 form-group">
                    <label className="form-label">Table Name</label>
                    <input
                        className="form-control"
                        id="table_name"
                        type="text"
                        name="table_name"
                        onChange={handleChange}
                        value={newTable.table_name}
                        required
                    />
                </div>
                <div className="col-10 form-group">
                    <label className="form-label">Capacity</label>
                    <input
                        className="form-control form-label"
                        id="capacity"
                        type="number"
                        name="capacity"
                        onChange={handleChange}
                        value={newTable.capacity}
                        required />
                </div>
            </form>
            <button onClick={handleSubmit} type="submit" className="btn btn-primary m-2">Submit</button>
            <button onClick={handleCancel} type="button" className="btn btn-secondary m-2">Cancel</button>
        </div>
    )
}

export default TableForm;