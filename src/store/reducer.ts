 import { PayloadAction, createSlice } from "@reduxjs/toolkit";

 interface productType {
    img: string,
    title: string,
    size: string,
    type: string,
    price: number,
    count: number
  }

  interface StateType {
    orderProduct: Array<productType>
  }
  
  const initialState: StateType = {
    orderProduct: []
  }

 export const OrderList = createSlice({
    name:"OrderList",
    initialState:initialState,
    reducers:{
        getProduct: (state: StateType, action: PayloadAction<productType>) => {
            return {
              orderProduct: [...state.orderProduct, action.payload]
            }
          },
        incOrder:(state: StateType, action:any) => {
            state.orderProduct.map((item: any) => {
                if(item.id == action.payload){
                    item.count = item.count + 1
                }
                return item
            })
        },
        decOrder:(state:StateType, action:any) => {
            state.orderProduct.map((item: any) => {
                if(item.id == action.payload){
                    item.count = item.count - 1
                }
                return item
            })
        }
    }
 })

 export const { getProduct, incOrder, decOrder } = OrderList.actions;