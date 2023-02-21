import React from "react";

export default function Expenses({name, price, id, deletItem}) {
    return (
        <div className="item-container" id={id}>
            <p>{name}</p>
            <p className="price">LBP {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
            <button className="fa-solid fa-close close-btn" onClick={deletItem}></button>
        </div>
    )
}