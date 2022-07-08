import React from "react";

function Table({ tables, handleFinish }) {
    const tableList = tables.map((table) => {
        return (
            <div className="card-body" key={table.table_id} >
                <h5 className="card-title">Table: {table.table_name}</h5>
                <p data-table-id-status={table.table_id} className="card-text">Status: {" "}
                    {table.reservation_id ? "Occupied" : "Free"}
                </p>
                <p>Capacity: {table.capacity}</p>
                {table.reservation_id ? (
                    <div>
                        <button
                            data-table-id-finish={table.table_id}
                            className="btn btn-success"
                            onClick={() => handleFinish(table)}
                        >
                            Finish
                        </button>
                    </div>
                ) : null}
            </div>


        );
    });
    return (
        <div className="card-body" >
            {tableList}
        </div>
    );
}

export default Table;