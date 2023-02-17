import React from "react";

export default function Expenses({name, price}) {
    return (
        <div>
            <h1>{name}</h1>
            <p>LBP {price}</p>
        </div>
    )
}