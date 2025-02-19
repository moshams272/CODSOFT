import { configureStore } from "@reduxjs/toolkit";
import loader from "./slice/loader.js"
const store=configureStore({
    reducer:{
        loader:loader
    }
})
export default store