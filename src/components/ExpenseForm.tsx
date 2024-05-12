
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from '../types/index';
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export const ExpenseForm = () => {
    
    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })
    const [error, setError] = useState('')
    const [previousAmount, setPreviousAmount] = useState(0)
    const {dispatch,state,remainingBudget}=useBudget();
    useEffect(()=>{
        if(state.editingId){
            const editingExpense=state.expenses.filter(currentExpense=>currentExpense.id===state.editingId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    },[state.editingId])
    const handleChange = (e: ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField=['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        })
    }
    const handleChangeDate=(value:Value)=>{
        setExpense({
            ...expense,
            date:value
        })
    }

    const handleSubmit=(e:ChangeEvent<HTMLFormElement>)=>{
        e.preventDefault()
        //validar
        if(Object.values(expense).includes('')){
            setError('Llena los campos');
            return
        }
        if(remainingBudget<(expense.amount - previousAmount)){
            setError('No hay suficiente presupuesto');
            return
        }
        
        //agregar o actualizar el gasto
        if(state.editingId){
            dispatch({type:'EDIT_EXPENSE',payload:{expense:{id:state.editingId,...expense}}})
        }
        else{

            dispatch({type:'ADD_EXPENSE',payload:{expense}})
        }
        //reiniciar el state
        setExpense({
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)
    }
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <legend 
            className="uppercase text-center text-2xl font-black border-b-4 
            border-blue-600 py-2"
        >
            {state.editingId ? 'Editar gasto' : 'Añade un gasto'}
        </legend>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">
                Nombre del gasto
            </label>
            <input
                type="text"
                id="expenseName"
                placeholder="Añade el nombre del gasto"
                className="w-full p-2 border border-slate-200 bg-slate-200 rounded-lg"
                name="expenseName"
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">
                Cantidad del gasto
            </label>
            <input
                type="number"
                id="amount"
                placeholder="Añade la cantidad del gasto. Ej: 300"
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-200"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
            />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl">
                Categoria
            </label>
            <select
                name="category"
                id="category"
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-200"
                value={expense.category}
                onChange={handleChange}
            >
                <option value="">-- Seleccione --</option>
                {
                    categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))
                }
             </select>   
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">
                Fecha del gasto
            </label>
            <DatePicker
                className="w-full p-2 border border-slate-200 rounded-lg bg-slate-200"
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>
        <input 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 
            px-4 rounded cursor-pointer"
            value={state.editingId ? 'Guardar cambios' : 'Anadir gasto'}
        />
    </form>
  )
}
