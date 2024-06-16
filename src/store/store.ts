import {configureStore} from '@reduxjs/toolkit'
import {OrderList} from './reducer'
export const store = configureStore({
    reducer:OrderList.reducer
})