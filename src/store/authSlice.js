import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },

  reducers: {
    setToken: (state, action) => {
      state.user = action.payload;
      window.localStorage.setItem('token',JSON.stringify(action.payload))
    },

    removeToken:(state,action)=>{
      state.user = null
      window.localStorage.removeItem('token')
    },

    setTokenFromLocalStorage:(state,action)=>{
       var token = window.localStorage.getItem('token')
      if(token){
        token = JSON.parse(token)
        state.user = token
      }else{
        state.user = null
      }
    },
  },
});

export const {setToken,removeToken,setTokenFromLocalStorage} = authSlice.actions

export default authSlice.reducer;
