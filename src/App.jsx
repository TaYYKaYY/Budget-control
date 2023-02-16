import React, { useState } from "react";
import EditBudget from "./components/EditBudget";

export default function App() {
    let [budgetEditor, setBudgetEditor] = useState(false)
    let [budget, setBudget] = useState(0)

    function bringEditor() {
        setBudgetEditor(prevBudgetEditor => !prevBudgetEditor)
    }

    function handleChange(event) {
        setBudget(event.target.value)
    }

    function saveBudget(){
            if (budget){
                setBudgetEditor(prevBudgetEditor => !prevBudgetEditor)
            }
    }
    console.log(typeof budget)
    return (
        <div>
            {budgetEditor && <EditBudget changeBudget={saveBudget} budget={budget} handleChange={handleChange}/>}
            <h1>My Budget Planner</h1>
            <div className="dashboard">
                <div className="numbers">
                    <div className="meter" style={{width: `${Math.floor(budget / 40000)}px`}}></div>
                    <p>My Budget: LBP {budget}</p>
                    <button className="fa-solid fa-edit edit-btn" onClick={bringEditor}></button>
                </div>
                <div className="numbers">
                    <div className="meter" style={{width: `${Math.floor(budget / 40000)}px`}}></div>
                    <p>Remaining: LBP {budget}</p>
                </div>
                <div className="numbers">
                    <div className="meter"></div>
                    <p>Spent So Far: LBP 0</p>
                </div>
            </div>
        </div>
    )
}