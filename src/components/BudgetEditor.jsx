import React from "react";

export default function BudgetEditor({show, submit, budgetChange, hideEditor}) {
    return (
        <div className="main-editor">
            <div className="editor" style={{top: show ? '-10px' : '-150px'}}>
                <form onSubmit={submit}>
                    <input type="number" onChange={budgetChange} placeholder="Enter yout Budget..." />
                    <button onClick={hideEditor} className="save-btn">Save</button>
                </form>
            </div>
        </div>
    )
}