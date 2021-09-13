import { createSlice } from "@reduxjs/toolkit";
import { User } from "screens/project-list/search-panal";

interface State {
    user:User | null;
    status: 'idel' | 'loading' | 'succeeded' | 'failed';
    error:Error|null
}
const initialState: State = {
    user:null,
    status:'idel',
    error:null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser(state,action){

        }
    }
})