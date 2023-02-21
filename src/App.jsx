import React, { useState } from "react";
import BudgetEditor from "./components/BudgetEditor";
import Expenses from "./components/Expenses";

/* To work on:
    - fix the edit budget styling and positioning
    - style the add expenses form
    - localStorage
*/

export default function App() {
    let [budgetEditor, setBudgetEditor] = useState(false)
    let [budget, setBudget] = useState(0)
    let [expenses, setExpenses] = useState([])
    let totalSpent = 0
    expenses.forEach(expense => totalSpent += expense.expensePrice)
    let remaining = budget - totalSpent
    let formattedBudget = budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    let formattedRemain = remaining.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    let formattedSpent = totalSpent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    // fucntion to prevent the form from refreshing the page
    function handleSubmit(event){
        event.preventDefault()
    }

    // fucntion to display the budget editor
    function bringEditor(event) {
        setBudgetEditor(prevBudgetEditor => !prevBudgetEditor)
        event.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].children[0].focus()
    }

    // function to set the budget to the value of the input
    function changeBudget(event) {
        setBudget(event.target.value)
    }

    // function to add an expense from the inputs
    function addExpense(event) {
        let children = event.target.parentNode.children[0].children
        if (children[3].value){
            setExpenses(prevExpenses => {
                return [
                    ...prevExpenses,
                    {   id: prevExpenses.length + 1,
                        [children[2].name]: children[2].value,
                        [children[3].name]: parseInt(children[3].value)
                    }
                ]
            })
        }
    }
    // function to delete a list item from the expenses list
    function deleteItem(event){
        let {id} = event.target.parentNode
        let item = expenses.find(obj => obj.id === parseInt(id))
        let index = expenses.findIndex(i => i === item)
        setExpenses(prevExpenses => {
            prevExpenses.splice(index, 1)
            return [...prevExpenses]
        })
    }
    // component render map
    let expensesDisplay = expenses.map(expense => 
    <Expenses
        key={expense.id}
        name={expense.expenseName}
        price={expense.expensePrice}
        id={expense.id}
        deletItem={deleteItem}
    />
    )
    return (
        <div className="wrapper">
            <BudgetEditor show={budgetEditor} submit={handleSubmit} budgetChange={changeBudget} hideEditor={bringEditor}/>
            <h1>My Budget Planner</h1>
                <div className="dashboard">
                    <div className="numbers">
                        <p>My Budget: LBP {formattedBudget}</p>
                        <button className="fa-solid fa-edit edit-btn" onClick={bringEditor}></button>
                    </div>
                    <div className="numbers">
                        <p style={{color: remaining < 0 ? 'red' : 'inherit'}}>Remaining: LBP {formattedRemain}</p>
                    </div>
                    <div className="numbers">
                        <p>Spent So Far: LBP {formattedSpent}</p>
                    </div>
                </div>
                <div className="main">
                    <h2>Expenses</h2>
                    <div className="item-container__main">
                        {expenses.length === 0 ? <p>no expenses</p> : expensesDisplay}
                    </div>
                    <h2>Add Expense</h2>
                    <form onSubmit={handleSubmit} className="add-expense">
                        <div className="form-grid">
                            <p>Name</p>
                            <p>Price</p>
                            <input id="name" type="text" name="expenseName" required />
                            <input id="price" type="number" name="expensePrice" required />
                        </div>
                        <button onClick={addExpense}>Add</button>
                    </form>
                </div>
            </div>
    )
}