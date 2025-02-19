import {createSlice }from "@reduxjs/toolkit"
const loader=createSlice({
    name:"loader",
    initialState:{loader:0},
    reducers:{
        toggleLoader:(state,action)=>{
            state.loader=action.payload;
        }
    }
});
export const {toggleLoader} = loader.actions;
export default loader.reducer;