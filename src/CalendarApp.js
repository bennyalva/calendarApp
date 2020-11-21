import React from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from './router/AppRouter'
import { store } from './store/store';


export const CalendarApp = () => {

    // para que se pueda proveer el store a todos loo hijos, el estore se debe proveer en un nivel
    // muy alto de la aplicaión, para para antes poder preveerlo se necesitan de la configuración del store
    // 1 .- crear los reducer oh almenos el principal
    // 2 .- crear el root reducer que combina todos los reducers
    // 3 .- se crea el store y ahora si se puede proveer
    return (
        <Provider store={ store }>
           <AppRouter />
        </Provider>
    )
}
