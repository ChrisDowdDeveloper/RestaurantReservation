function FormError({ formError }) {
    let id = 0

    if (formError.length === 0) {
        return null
    }

    const formErrorList = formError.map(error => {
        id++;
        return (
            <div className="alert alert-danger" key={id}>Error: {error}</div>

        )
    })

    if (formError.length > 0) {
        return (
            <div>
                {formErrorList}

            </div>
        )
    }

}


export default FormError;