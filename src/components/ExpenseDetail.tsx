import { useMemo } from "react"
import { LeadingActions, SwipeableList, SwipeableListItem, TrailingActions, SwipeAction } from "react-swipeable-list";
import { formatDate } from "../helpers"
import { Expense } from "../types"
import { AmountDisplay } from "./AmountDisplay"
import { categories } from "../data/categories"
import "react-swipeable-list/dist/styles.css"
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProps = {
    expense:Expense
}
export const ExpenseDetail = ({expense}:ExpenseDetailProps) => {
    const {dispatch}=useBudget();
    const categoryInfo=useMemo(()=> categories.filter(cat=>cat.id===expense.category)[0],[expense]);
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({type:'GET_EXPENSE_BY_ID',payload:{id:expense.id}})}> 
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => {dispatch({type:'REMOVE_EXPENSE',payload:{id:expense.id}})}}
                destructive={true}    
            > 
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

  return (
    <SwipeableList>
        <SwipeableListItem maxSwipe={1} trailingActions={trailingActions()} leadingActions={leadingActions()}>
            <div className="bg-white shadow-lg rounded-lg p-10 border-b border-gray-200  flex gap-5 items-center">
                <div >
                    <img 
                        src={`/icono_${categoryInfo.icon}.svg`}
                        alt="icono de categoria" 
                        className="w-14 h-14"
                    />
                </div>
                <div className="flex-1 space-y-2">
                    <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                    <p>{expense.expenseName}</p>
                    <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                </div>

                <AmountDisplay
                    amount={expense.amount}

                />
            </div>

        </SwipeableListItem>

    </SwipeableList>
  )
}
