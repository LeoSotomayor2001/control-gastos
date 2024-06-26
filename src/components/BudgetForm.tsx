import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"
export const BudgetForm = () => {
    const [budget, setBudget] = useState(0)
    const {dispatch}=useBudget()
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(Number(e.target.value))
    }
    const isValid=useMemo(()=>{
        return  budget<=0 || isNaN(budget)
    },[budget])
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
       dispatch({type:'ADD_BUDGET',payload:{budget}})
    }
  return (
    <form className=" space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                Definir Presupuesto
            </label>
            <input 
                type="number"  
                id="budget" 
                placeholder="Definir Presupuesto"
                className="w-full p-2 border border-gray-200 rounded-lg"
                name="budget"
                value={budget}
                onChange={handleChange}
            />
        </div>

        <input 
            type="submit"
            value="Definir Presupuesto"
            disabled={isValid}
            className="disabled:opacity-50 w-full p-2 bg-blue-600 hover:bg-blue-800 text-white font-bold rounded-lg cursor-pointer"
        />
    </form>
  )
}
