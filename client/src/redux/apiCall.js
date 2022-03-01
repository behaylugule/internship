import {loginFail,loginStart,loginSuccess,
    logoutSucess,updateSuccess,createUserSucess,
    changePasswordStart,changePasswordSuccess,changePasswordFail,
    getUsersStart,getUsersSuccess,getUsersFail,
    sendPasswordResetStart,sendPasswordResetSuccess,sendPasswordResetFail
} from './userRedux'
import {getDocumentStart,getDocumentSuccess,getDocumentFail,
        createFolderStart,createFolderSuccess,createFolderFail,
        updateFolderStart,updateFolderSuccess,updateFolderFail,
        createDocumentStart,createDocumentSuccess,createDocumentFail,
        sendEmailStart,sendEmailSuccess,sendEmailFail,
        deleteDocumentStart,deleteDocumentSuccess,deleteDocumentFail,
        
} from './documentRedux'
import {publicMethod,userMethod} from '../requiestMethod'
import axios from 'axios'
import { async } from '@firebase/util'
export const login= async(dispach,user)=>{
    try {
        let config = {
            headers: {
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": "http://localhost:3000"
      
            }
          }
       dispach(loginStart())
       const res = await axios.post(" https://aastudms.herokuapp.com/api/auth/loginuser",user,config)
       localStorage.setItem("token", res.data.accessToken)
       dispach(loginSuccess(res.data))

    } catch (error) {
        dispach(loginFail("Invalid Credential!!!"))
    }
}

export const logout=async(dispach)=>{
    dispach(loginStart())
    try {
        localStorage.removeItem("persist:root")
        localStorage.removeItem("token")
        dispach(logoutSucess())
 
     } catch (error) {
         dispach(loginFail("Invalid Credential!!!"))
     }
}

export const updateUser = async(dispatch,data,history,id)=>{
    dispatch(loginStart())
    try {
        const res = await axios.put(` https://aastudms.herokuapp.com/api/users/${id}`, data,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(updateSuccess(res.data))
        history.push("/", { from: "User" })
    } catch (error) {
        dispatch(loginFail("Something is wrong!!!"))
    }
}

export const createUser = async(dispatch,data,history)=>{
    dispatch(loginStart())
    try {
        const res = await axios.post('https://aastudms.herokuapp.com/api/auth/register', data)
        dispatch(createUserSucess())
        history.push("/login", { from: "Register" })
    } catch (error) {
        dispatch(loginFail("Something is wrong!!!"))
    }
}

export const getDocument= async(dispach,id,level)=>{
    dispach(getDocumentStart())
    try {
        console.log(level)
        const res = await axios.get(` https://aastudms.herokuapp.com/api/documents/${id}?level=${level}`,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispach(getDocumentSuccess(res.data))
    } catch (error) {
        dispach(getDocumentFail("Something is wrong!!!"))
    }
}

export const createFolder = async(dispatch,data,history)=>{
    dispatch(createFolderStart())
    try {
        const res = await axios.post("https://aastudms.herokuapp.com/api/folder",data,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(createFolderSuccess(res.data))
        history.push('/documents')
    } catch (error) {
        dispatch(createFolderFail("Something is wrong!!!"))
    }
}
export const updateFolder = async(dispatch,data,id,history)=>{
    dispatch(updateFolderStart())
    try {
        const res = await axios.put(`https://aastudms.herokuapp.com/api/folder/${id}`,data
        ,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(updateFolderSuccess(res.data))
        console.log(res.data)
        history.push('/documents')
    } catch (error) {
        dispatch(updateFolderFail("Something is wrong!!!"))
    }
}

export const createDocument = async(dispatch,data,history)=>{
   dispatch(createDocumentStart())
   try {
       const res = await axios.post(`https://aastudms.herokuapp.com/api/documents`,data
       ,{
        headers:{
            token:`Bearer ${localStorage.getItem("token")}`
        }
    })
       dispatch(createDocumentSuccess(res.data))
       history.push('/documents')
   } catch (error) {
       dispatch(createDocumentFail("Something is wrong!!!"))
   }
}

export const sendEmail = async(dispatch,data)=>{
    dispatch(sendEmailStart())
    try {
        const res = await axios.post("https://aastudms.herokuapp.com/api/documents/email",data
        ,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        }) 
        dispatch(sendEmailSuccess())
    } catch (error) {
        console.log(error)
        dispatch(sendEmailFail("The file has not been sent."))
    }
}

export const deleteDocuemnt = async(dispatch,id)=>{
    dispatch(deleteDocumentStart())
    try {
        const res = await axios.delete(`https://aastudms.herokuapp.com/api/documents/${id}`
        ,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(deleteDocumentSuccess(id))
    } catch (error) {
        dispatch(deleteDocumentFail())
    }
}

export const deleteFolder = async(dispatch,id)=>{
    dispatch(deleteDocumentStart())
    try {
        const res = await axios.delete(`https://aastudms.herokuapp.com/api/folder/${id}`
        ,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        })
       dispatch(deleteDocumentSuccess())
    } catch (error) {
       dispatch(deleteDocumentFail("The file has not been deleted ...."))
    }
}

export const changePassword= async(dispatch,id,data)=>{
  dispatch(changePasswordStart())
  try {
    const res = await axios.put(`https://aastudms.herokuapp.com/api/users/password/${id}`,data
    ,{
        headers:{
            token:`Bearer ${localStorage.getItem("token")}`
        }
    })
    dispatch(changePasswordSuccess())
  } catch (error) {
      dispatch(changePasswordFail("Something is wrong"))
  }
}

export const getUsers =async(dispach)=>{
    try {
       dispach(getUsersStart())
        const res = await axios.get('https://aastudms.herokuapp.com/api/users/client'
        ,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(res.data)
        dispach(getUsersSuccess(res.data))
    } catch (error) {
       dispach(getUsersFail("something is wrong"))
    }
}

export const sendPasswordReset = async(dispach,data)=>{
    try {
        dispach(sendPasswordResetStart())
        const res = await axios.post('https://aastudms.herokuapp.com/api/auth/forgetpassword', data)
         dispach(sendPasswordResetSuccess("Chack your email we sent u a password reset link"))       
    } catch (error) {
        console.log(error)
        dispach(sendPasswordResetFail("Something is wrong!!!"))
    }
}