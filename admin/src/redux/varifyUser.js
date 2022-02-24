import {createSlice} from '@reduxjs/toolkit'
const usersSlice = createSlice({
    name: 'varify',
    initialState:{
      varifyUsers:[],
      isFatching:false,
      error:null
    },
    reducers: {
        notificationStart:(state)=>{
            state.isFatching=true
        },
        notificationSucess:(state,action)=>{
          state.isFatching=false
          state.varifyUsers = action.payload
        },
        varifySucess:(state,action)=>{
          state.isFatching=false
          state.varifyUsers.splice(
            state.varifyUsers.findIndex((item) => item._id === action.payload),
            1
          );
        },
        deleteVarifySucess:(state,action)=>{
            state.isFatching = false
            state.varifyUsers.splice(
                state.varifyUsers.findIndex((item) => item._id === action.payload),
                1
              );
        },
        notificationFail:(state,action)=>{
            state.isFatching=false
            state.error = action.payload
        }
    },
  })
  
  export const { notificationStart,notificationFail,
                  notificationSucess,varifySucess,
                  deleteVarifySucess,
  } = usersSlice.actions
  export default usersSlice.reducer