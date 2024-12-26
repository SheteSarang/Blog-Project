import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    status: false,
    userData: null
  };

  export const authSlice  = createSlice({
    name: "auth",  // Name of the slice
    initialState,  // Set the initial state
    reducers: {
      // user is logged in aur logged out, that info cant be stored in backend, so storing it in redux
      login : (state, action) => {
        state.status = true;
        state.userData = action.payload; 
        },
     logout : (state, action) => {
        state.status = false;
        state.userData = null;
      }
    }
  });
  export const { login, logout  } = authSlice.actions;
  export default authSlice.reducer;
  