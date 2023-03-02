import React from "react";

export default function BudgetEditor({show, submit, budgetChange, hideEditor}) {
    return (
        <div className="main-editor">
            <div className={`editor ${show ? 'show' : 'hide'}`}>
                <form onSubmit={submit}>
                    <input type="number" onChange={budgetChange} placeholder="Enter your Budget..." />
                    <button onClick={hideEditor} className="save-btn">Save</button>
                </form>
            </div>
        </div>
    )
}