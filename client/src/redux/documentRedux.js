import {createSlice} from '@reduxjs/toolkit'
const documentSlice = createSlice({
    name: 'documents',
    initialState:{
      documents:[],
      isFatching:false,
      error:null
    },
    reducers: {
       getDocumentStart :(state)=>{
         state.isFatching = true
        },
        getDocumentSuccess :(state,action)=>{
            state.isFatching = false
            state.documents = action.payload
        },
        getDocumentFail:(state,action)=>{
           state.isFatching = false
           state.error = action.payload
        },
        createDocumentStart:(state)=>{
          state.isFatching = true
        },
        createDocumentSuccess:(state,action)=>{
           state.isFatching = false
           state.documents.push(action.payload)
        },
        createDocumentFail:(state,action)=>{
          state.isFatching = false
          state.error = action.payload
        },
        deleteDocumentStart:(state)=>{
          state.isFatching = true
        },
        deleteDocumentSuccess:(state,action)=>{
            state.isFatching = false
            state.documents.splice(
                state.documents.findIndex((item) => item._id === action.payload),
                1
              );
        },
        deleteDocumentFail:(state)=>{
            state.isFatching = false
        },
        updateDocumentStart:(state)=>{
            state.isFatching = true
          },  
        updateDocumentSuccess:(state)=>{
          
        },   
        updateDocumentFail:(state,action)=>{

        },   
        createFolderStart:(state)=>{
          state.isFatching = true
        },
        createFolderSuccess:(state,action)=>{
           state.isFatching = false
           state.documents.push(action.payload)
        },
        createFolderFail:(state,action)=>{
          state.isFatching = false
          state.error = action.payload
        },
        updateFolderStart:(state)=>{
            state.isFatching = true
          },  
        updateFolderSuccess:(state,action)=>{
           state.isFatching = false
           state.documents[
            state.documents.findIndex((item) => item._id === action.payload._id)
          ] = action.payload;
        },   
        updateFolderFail:(state,action)=>{
          state.isFatching = false
          state.error = action.payload
        }, 
        sendEmailStart:(state)=>{
           state.isFatching = true
        },
        sendEmailSuccess:(state)=>{
          state.isFatching = false
        },
        sendEmailFail:(state,action)=>{
             state.isFatching = false
             state.error = action.payload
        },

  }})
  
  export const {getDocumentStart, getDocumentSuccess,getDocumentFail,createDocumentStart,createDocumentSuccess,createDocumentFail,
                  deleteDocumentFail,deleteDocumentSuccess,deleteDocumentStart,updateDocumentFail,updateDocumentStart,updateDocumentSuccess
                ,createFolderStart,createFolderSuccess,createFolderFail,
                updateFolderStart,updateFolderSuccess,updateFolderFail,
                sendEmailStart,sendEmailSuccess,sendEmailFail
                } = documentSlice.actions
  export default documentSlice.reducer