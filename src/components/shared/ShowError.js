import React  from "react";

const ShowError = ({ error }) => error
    ? <React.Fragment>Error:
        {typeof (error) === "string"
            ? error
            : `${error.Message}: ${error.ExceptionMessage}`}
    </React.Fragment>
    : null

export default ShowError;