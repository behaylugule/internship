import {createSlice} from '@reduxjs/toolkit'
const userSlice = createSlice({
    name: 'user',
    initialState:{
      currentUser:null,
      users:[],
      message:null,
      isFatching:false,
      error:null
    },
    reducers: {
       loginStart :(state)=>{
         state.isFatching = true
         state.error = null
        },
        loginSuccess :(state,action)=>{
            state.isFatching = false
            state.currentUser = action.payload
            state.error = null
        },
        loginFail:(state,action)=>{
           state.isFatching = false
           state.error = action.payload
        },
        logoutSucess:(state)=>{
          state.isFatching = false
          state.currentUser = null
        },
        logoutFail:(state,action)=>{
           state.isFatching = false
           state.error = action.payload
        },
        updateSuccess:(state,action)=>{
          state.isFatching = false
          state.currentUser = action.payload
        },
        createUserSucess:(state)=>{
          state.isFatching = false
        },
        changePasswordStart:(state)=>{
          state.isFatching =true
        },
        changePasswordSuccess:(state)=>{
          state.isFatching = false
          state.currentUser = null
        },
        changePasswordFail:(state,action)=>{
          state.isFatching = false
          state.error = action.payload
        },
        getUsersStart:(state)=>{
          state.isFatching = true
        },
        getUsersSuccess:(state,action)=>{
          state.isFatching = false
          state.users = action.payload
        },
        getUsersFail:(state,action)=>{
          state.isFatching = false
          state.error = action.payload
        },
        sendPasswordResetStart:(state)=>{
          state.isFatching = true
        },
        sendPasswordResetSuccess:(state,action)=>{
          state.isFatching = false
          state.message = action.payload
        },
        sendPasswordResetFail:(state,action)=>{
          state.isFatching = false
          state.error = action.payload
        } 
    },
  })
  
  export const { loginStart,loginSuccess,loginFail,logoutSucess,logoutFail,
    updateSuccess,createUserSucess,
    changePasswordStart,changePasswordSuccess,changePasswordFail,
    getUsersStart,getUsersSuccess,getUsersFail,
    sendPasswordResetStart,sendPasswordResetSuccess,sendPasswordResetFail
  } = userSlice.actions
  export default userSlice.reducer