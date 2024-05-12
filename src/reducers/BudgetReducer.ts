import {v4 as uuid} from 'uuid'
import { DraftExpense, Expense } from "../types"

export type BudgetActions = 
    {type: 'ADD_BUDGET', payload: {budget:number} } |
    {type: 'SHOW_MODAL'}|
    {type: 'HIDE_MODAL'}|
    {type: 'ADD_EXPENSE', payload: {expense:DraftExpense} }|
    {type: 'REMOVE_EXPENSE', payload: {id: Expense['id']} } |
    {type: 'GET_EXPENSE_BY_ID', payload: {id: Expense['id']} }|
    {type: 'EDIT_EXPENSE', payload: {expense:Expense} }

export type BudgetState = {
    budget:number
    modal:boolean,
    expenses:Expense[],
    editingId:Expense['id']
}

export const initialState: BudgetState = {
    budget:0,
    modal:false,
    expenses:[],
    editingId:''
}
const createExpense=(draftExpense:DraftExpense ):Expense =>{
    return {
        ...draftExpense,
        id:uuid()
    }
}

export const budgetReducer = (state: BudgetState, action: BudgetActions) => {
    
    if(action.type === 'ADD_BUDGET'){ 
        return {...state, budget: action.payload.budget}
    }
    if(action.type === 'SHOW_MODAL'){  
        return {...state, modal: true}
    }
    if(action.type === 'HIDE_MODAL'){  
        return {...state, modal: false, editingId:''}
    }
    if(action.type === 'ADD_EXPENSE'){
        const expense=createExpense(action.payload.expense);
        return {
            ...state, 
            expenses:[...state.expenses, expense],
            modal:false 
        }
    }
    if(action.type === 'REMOVE_EXPENSE'){
        return {
            ...state, 
            expenses:state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }
    if(action.type === 'GET_EXPENSE_BY_ID'){
        return {
            ...state, 
            editingId:action.payload.id,
            modal:true
        }
    }
    if(action.type === 'EDIT_EXPENSE'){
        return {
            ...state, 
            expenses:state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
            editingId:'',
            modal:false
        }
    }
    return state;
}