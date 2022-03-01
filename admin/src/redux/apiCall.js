import {loginFail,loginStart,loginSuccess,
  logoutSucess,logoutFail,changePasswordStart,changePasswordSuccess,
  changePasswordFail} from './userRedux' 
import {notificationStart,notificationSucess,
    notificationFail,varifySucess,deleteVarifySucess,
   } from './varifyUser'
import {usersGetStart,usersGetSuccess,usersGetFail,
        deleteUsersStart,deleteUsersFail,
        deleteUserSucess,
        createUsersStart,createUserFail,createUserSucess,
     updateUsersStart,updateUserSucess,updateUserFail} from './usersRedux'
import {getDepStart,getDepSuccess,getDepFail,deleteDepStart,
        deleteDepSuccess,deleteDepFail,
        updateDepStart,updateDepSuccess,updateDepFail,
      createDepStart,createDepSuccess,createDepFail} from './departmentRedux'
import {publicMethod,userMethod} from '../requiestMethod'
import axios from 'axios'
export const login= async(dispach,user)=>{
    try {
       dispach(loginStart())
       const res = await axios.post("https://aastudms.herokuapp.com/api/auth/login",user)
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

export const getNotification= async(dispach)=>{
    dispach(notificationStart())
    try {
       const res = await axios.get("https://aastudms.herokuapp.com/api/users/notification",{
        headers:{
            token:`Bearer ${localStorage.getItem("token")}`
        }
    })
       dispach(notificationSucess(res.data))
    } catch (error) {
        dispach(notificationFail("Something is wrong!!!"))
    }
}

export const varifyUser = async(dispach,id,history)=>{
    dispach(notificationStart())
    try {
      const user = await axios.put(`https://aastudms.herokuapp.com/api/users/varify/${id}`,
      {isVarify:true},
      {
        headers:{
            token:`Bearer ${localStorage.getItem("token")}`
        }
    }
      )  
        dispach(varifySucess(id))  
        history.push(`/users`)    
    } catch (error) {
        dispach(notificationFail("user not varified please try again!!!"))
    }
}

export const deleteVarifyUser = async(dispach,id)=>{
    dispach(notificationStart())
    try {
   const user = await axios.delete(`https://aastudms.herokuapp.com/api/users/${id}`,{
    headers:{
        token:`Bearer ${localStorage.getItem("token")}`
    }
})
   dispach(deleteVarifySucess(id))       
    } catch (error) {
        dispach(notificationFail("Something is wrong!!!"))
    }
}

export const getUsers = async(dispatch,token)=>{
    dispatch(usersGetStart())
    try {
        const res = await axios.get(`https://aastudms.herokuapp.com/api/users`,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(usersGetSuccess(res.data))
    } catch (error) {
        console.log(error)
        dispatch(usersGetFail("something is wrong!!!"))
    }
}

export const deleteUser = async(dispach,id)=>{
    dispach(deleteUsersStart())
    try {
        const user = await axios.delete(`https://aastudms.herokuapp.com/api/users/${id}`
        ,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispach(deleteUserSucess(id))
    } catch (error) {
        dispach(deleteUsersFail("Something is wrong!!!"))
    }
}

export const createUser = async(dispatch,data,history)=>{
    dispatch(createUsersStart())
    try {
        const res = await axios.post('https://aastudms.herokuapp.com/api/auth/register',
        data
        ,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(createUserSucess())
        history.push("/varify", { from: "NewUser" })
    } catch (error) {
        dispatch(createUserFail("Something is wrong!!!"))
    }
}

export const updateUser = async(dispatch,data,history,id)=>{
    dispatch(updateUsersStart())
    try {
        const res = await axios.put(`https://aastudms.herokuapp.com/api/users/${id}`,
        data
        ,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        }
        )
        dispatch(updateUserSucess())
        history.push("/users", { from: "User" })
    } catch (error) {
        dispatch(updateUserFail("Something is wrong!!!"))
    }
}
export const getDepartments = async(dispatch)=>{
    dispatch(getDepStart())
    try {
        const res = await axios.get('https://aastudms.herokuapp.com/api/departments'
        ,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        })
          dispatch(getDepSuccess(res.data))
    } catch (error) {
        dispatch(getDepFail())
    }
}

export const createDepartment = async(dispatch,data,history)=>{
    dispatch(createDepStart())
    try {
        const res = await axios.post('https://aastudms.herokuapp.com/api/departments',
        data,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        })
          dispatch(createDepSuccess(res.data))
          history.push("/departments")
    } catch (error) {
        dispatch(createDepFail("something is wrong"))
    }
}
export const deleteDepartment = async(dispatch,id)=>{
       dispatch(deleteDepStart())
    try {
          const res = await axios.delete(`https://aastudms.herokuapp.com/api/departments/${id}`
          ,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        })
          dispatch(deleteDepSuccess(id))
          
    } catch (error) {
      
        dispatch(deleteDepFail("something is wrong"))
    }
}
export const updateDepartment = async(dispatch,data,history,id)=>{
    dispatch(updateDepStart())
    console.log(localStorage.getItem("token"))
    try {
        const res = await axios.put(`https://aastudms.herokuapp.com/api/departments/${id}`,data,{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        })
          dispatch(updateDepSuccess())
          history.push("/departments")
    } catch (error) {
        dispatch(updateDepFail("something is wrong."))
    }
}
export const addRole = async(dispatch,data,id,history)=>{
    dispatch(updateUsersStart())
    try {
        const res = await axios.put(`https://aastudms.herokuapp.com/api/users/${id}`,{role:data},{
            headers:{
                token:`Bearer ${localStorage.getItem("token")}`
            }
        } )
        dispatch(updateUserSucess())
        history.push('/users')
    } catch (error) {
        console.log(error)
        dispatch(updateUserFail("user is not updated."))
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