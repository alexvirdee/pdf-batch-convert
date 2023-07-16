import React from "react";

interface ConvertBtnProps {
    handleConvert: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }

export default function ConvertBtn({ handleConvert }: ConvertBtnProps) {

    return (
        <button className="btn" onClick={handleConvert}>Convert</button>
    )
}