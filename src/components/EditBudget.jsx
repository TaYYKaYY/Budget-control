import React from "react";

export default function EditBudget({changeBudget, budget, handleChange}){
    function handleSubmit(event) {
        event.preventDefault()
    }
    return (
        <div className="editor">
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Your budget..." value={budget} onChange={handleChange} required autoFocus/>
                <button onClick={changeBudget} className="save-btn">Save</button>
            </form>
        </div>
    )
}