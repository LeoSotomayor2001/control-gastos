import { AmountDisplay } from "./AmountDisplay"


export const BudgetTracker = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex justify-center">
          <img src="/grafico.jpg" alt="imagen grafico" />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Resetear app
          </button>

          <AmountDisplay
            label="Presupuesto"
            amount={300}
          />
          <AmountDisplay
            label="Disponible"
            amount={200}
          />
          <AmountDisplay
            label="Gastado"
            amount={100}
          />
      </div>
    </div>
  )
}
