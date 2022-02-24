import {createSlice} from '@reduxjs/toolkit'
const departmentSlice = createSlice({
    name: 'departments',
    initialState:{
      departments:[],
      isFatching:false,
      error:null
    },
    reducers: {
       getDepStart :(state)=>{
         state.isFatching = true
        },
        getDepSuccess :(state,action)=>{
            state.isFatching = false
            state.departments = action.payload
        },
        getDepFail:(state,action)=>{
           state.isFatching = false
           state.error = action.payload
        },
        deleteDepStart:(state)=>{
          state.isFatching = true
         
        },
        deleteDepSuccess:(state,action)=>{
           state.isFatching = false
           state.departments.splice(
            state.departments.findIndex((item) => item._id === action.payload),
            1
          );
        },
        deleteDepFail:(state,action)=>{
            state.isFatching=false
            state.error = action.payload
        },
        createDepStart:(state)=>{
          state.isFatching=true
        },
        createDepSuccess:(state,action)=>{
          state.isFatching=false
          state.departments.push(action.payload)
        },
        createDepFail:(state,action)=>{
          state.isFatching=false
            state.error = action.payload
        },
        updateDepStart :(state)=>{
          state.isFatching = true
         },
         updateDepSuccess :(state)=>{
             state.isFatching = false
         },
         updateDepFail:(state,action)=>{
            state.isFatching = false
            state.error = action.payload
         },
    },
  })
  
  export const { getDepStart,getDepSuccess,getDepFail,deleteDepStart,deleteDepSuccess,
                  deleteDepFail,createDepSuccess,createDepStart,createDepFail,
                  updateDepStart,updateDepSuccess,updateDepFail
  } = departmentSlice.actions
  export default departmentSlice.reducer