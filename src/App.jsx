import React, { useState } from "react";
import Expenses from "./components/Expenses";

export default function App() {
    let [budgetEditor, setBudgetEditor] = useState(false)
    let [budget, setBudget] = useState(0)
    let [expenses, setExpenses] = useState([])
    let [textValue, setTextValue] = useState('')
    let [priceValue, setPriceValue] = useState('')
    let total = 0
    expenses.forEach(expense => total += expense.expensePrice)
    let remaining = budget - total
    function handleSubmit(event){
        event.preventDefault()
    }

    function bringEditor(event) {
        setBudgetEditor(prevBudgetEditor => !prevBudgetEditor)
        event.target.parentNode.parentNode.parentNode.children[0].children[1].children[0].focus()
    }

    function changeBudget(event) {
        setBudget(event.target.value)
    }

    function addExpense(event) {
        let children = event.target.parentNode.children
        if (children[1].value){
            setExpenses(prevExpenses => {
                return [
                    ...prevExpenses,
                    {   id: prevExpenses.length + 1,
                        [children[0].name]: children[0].value,
                        [children[1].name]: parseInt(children[1].value)
                    }
                ]
            })
        }
    }
    console.log(expenses)
    let expensesDisplay = expenses.map(expense => <Expenses key={expense.id} name={expense.expenseName} price={expense.expensePrice}/>)
    return (
        <div>
            <nav>
                <h1>My Budget Planner</h1>
                <form onSubmit={handleSubmit}>

                    <input
                        type="number"
                        id="budget"
                        className={budgetEditor ? "show" : "hide"}
                        value={budget ? budget : ''}
                        onChange={changeBudget}
                        placeholder="Enter Budget"
                    />

                    <button onClick={bringEditor} style={{display: 'none'}}></button>
                </form>
            </nav>
            <div className="dashboard">
                <div className="numbers">
                    <div className="meter" style={{width: `${Math.floor(budget / 40000)}px`}}></div>
                    <p>My Budget: LBP {budget}</p>
                    <button className="fa-solid fa-edit edit-btn" onClick={bringEditor}></button>
                </div>
                <div className="numbers">
                    <div className="meter" style={{width: `${Math.floor(remaining / 40000)}px`}}></div>
                    <p style={{color: remaining < 0 ? 'red' : 'inherit'}}>Remaining: LBP {remaining}</p>
                </div>
                <div className="numbers">
                    <div className="meter" style={{width: `${Math.floor(total / 40000)}px`}}></div>
                    <p>Spent So Far: LBP {total}</p>
                </div>
            </div>
            <h2>Expenses</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" name="expenseName" required />
                <input type="number" placeholder="Price" name="expensePrice" required />
                <button onClick={addExpense}>+</button>
            </form>
            {expensesDisplay}
        </div>
    )
}