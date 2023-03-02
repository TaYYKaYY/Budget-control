import React, { useState, useEffect } from "react";
import BudgetEditor from "./components/BudgetEditor";
import Expenses from "./components/Expenses";

/* To work on:
    - localStorage
*/

export default function App() {
    const [budgetEditor, setBudgetEditor] = useState(false)
    const [budget, setBudget] = useState(localStorage.getItem('budget') || 0)
    const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) || [])
    let totalSpent = 0
    expenses.forEach(expense => totalSpent += expense.expensePrice)
    let remaining = budget - totalSpent

    useEffect(() => {
        localStorage.setItem('budget', budget)
    }, [budget])

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }, [expenses])

    // add commas to the numbers
    function formatNum(num){
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    // prevent the form from refreshing the page
    function handleSubmit(event){
        event.preventDefault()
    }

    // display the budget editor
    function bringEditor(event) {
        setBudgetEditor(prevBudgetEditor => !prevBudgetEditor)
        event.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].children[0].focus()
        event.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].children[0].value = budget ? budget : ''
    }

    // set the budget to the value of the input
    function changeBudget(event) {
        setBudget(event.target.value)
    }

    // add an expense from the inputs
    async function addExpense(event) {
        let children = event.target.parentNode.children[0].children
        if (children[3].value < 0){
            children[3].value = ''
            alert("Enter a number greater than zero")
            return
        }
        if (children[3].value && children[2].value){
            setExpenses(prevExpenses => {
                return [
                    ...prevExpenses,
                    {   id: prevExpenses.length + 1,
                        [children[2].name]: children[2].value,
                        [children[3].name]: parseInt(children[3].value)
                    }
                ]
            })
            children[2].focus()
    }
        children[2].value = children[3].value ? await '' : children[2].value
        children[3].value = await ''
    }
    // delete a list item from the expenses list
    function deleteItem(event){
        let {id} = event.target.parentNode
        let item = expenses.find(obj => obj.id === parseInt(id))
        let index = expenses.findIndex(i => i === item)
        setExpenses(prevExpenses => {
            prevExpenses.splice(index, 1)
            return [...prevExpenses]
        })
    }
    // clear expenses list
    function clearExpenses(){
        setExpenses([])
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
            <BudgetEditor
            show={budgetEditor}
            submit={handleSubmit}
            budgetChange={changeBudget}
            hideEditor={bringEditor}
            />
            <h1>My Budget Planner</h1>
                <div className="dashboard">
                    <div className="numbers">
                        <p>My Budget: LBP {formatNum(budget)}</p>
                        <button className="fa-solid fa-edit edit-btn" onClick={bringEditor} title="edit budget"></button>
                    </div>
                    <div className="numbers">
                        <p style={{color: remaining < 0 ? 'red' : 'inherit'}}>Remaining: LBP {formatNum(remaining)}</p>
                    </div>
                    <div className="numbers">
                        <p>Spent So Far: LBP {formatNum(totalSpent)}</p>
                    </div>
                </div>
                <div>
                    <div className="expenses-header">
                        <h2>Expenses</h2>
                        <button className="clear-list fa-solid fa-broom" onClick={clearExpenses} title="clear all"></button>
                    </div>
                    <div className="item-container__main">
                        {expenses.length === 0 ? <p>no expenses</p> : expensesDisplay}
                    </div>
                    <h2>Add Expense</h2>
                    <form onSubmit={handleSubmit} className="add-expense">
                        <div className="form-grid">
                            <p>Name</p>
                            <p>Price</p>
                            <input id="name" type="text" name="expenseName" />
                            <input id="price" type="number" name="expensePrice" />
                        </div>
                        <button onClick={addExpense} className="add-btn">Add</button>
                    </form>
                </div>
            </div>
    )
}