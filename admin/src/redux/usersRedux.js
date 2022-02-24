import {createSlice} from '@reduxjs/toolkit'
const usersSlice = createSlice({
    name: 'users',
    initialState:{
      users:[],
      isFatching:false,
      error:null
    },
    reducers: {
        usersGetStart:(state)=>{
            state.isFatching=true
        },
        usersGetSuccess:(state,action)=>{
          state.isFatching=false
          state.users =  action.payload
        },
        usersGetFail:(state,action)=>{
            state.isFatching=false
            state.error = action.payload
        },
        createUsersStart:(state)=>{
            state.isFatching=true
        },
        createUserSucess:(state)=>{
          state.isFatching = false
        },
        createUserFail:(state,action)=>{
            state.isFatching=false
            state.error = action.payload
        } ,
        updateUsersStart:(state)=>{
            state.isFatching=true
        },
        updateUserSucess:(state)=>{
          state.isFatching = false
        },
        updateUserFail:(state,action)=>{
            state.isFatching=false
            state.error = action.payload
        } ,
        deleteUsersStart:(state)=>{
            state.isFatching=true
        },
        deleteUserSucess:(state,action)=>{
            state.isFatching = false
            state.users.splice(
                state.users.findIndex((item) => item._id === action.payload),
                1
              );
        },
        deleteUsersFail:(state,action)=>{
            state.isFatching=false
            state.error = action.payload
        }
    },
  })
  
  export const { usersGetStart,usersGetFail,
                  usersGetSuccess,
                  createUsersStart,createUserFail,
                  createUserSucess,deleteUsersStart,deleteUsersFail,deleteUserSucess,
                  updateUsersStart,updateUserSucess,updateUserFail
  } = usersSlice.actions
  export default usersSlice.reducer