import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
  name:"products",
  initialState:[],
  reducers:
  {
    addprd:(state,action)=>
    {
      return action.payload;
    }
  }
})

export const productActions = productSlice.actions;
export default productSlice;
