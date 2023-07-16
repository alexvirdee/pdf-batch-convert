import React from "react";

export default function ConvertBtn({ handleConvert }) {

    return (
        <button className="btn" onClick={handleConvert}>Convert</button>
    )
}