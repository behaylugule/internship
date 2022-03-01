import React,{useEffect} from 'react'
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch,useSelector} from "react-redux"
import {getUsers} from "../../redux/apiCall"
import {
    Avatar,
    makeStyles,
  } from "@material-ui/core";
const Teammate = () => {
    const dispatch = useDispatch()
 useEffect(()=>{
  getUsers(dispatch)
 },[dispatch])
 const users = useSelector(state=>state.user.users)
 const currentUser = useSelector(state=>state.user.currentUser)
    const columns = [
        {
          field: "username",
          headerName: "User",
          width: 150,
          renderCell: (params) => {
            return (
              <div style={{display:"flex",alignItems:"center"}}>
                <Avatar
              alt={params.row.username}
              src={currentUser?.avatar}
            /> 
            <div style={{marginLeft:"10px"}}>
            {params.row.username}
            </div>
            
              </div>
            );
          },
        },
        {
          field: "fullname",
          headerName: "Full Name",
          width: 200,
        },
        { field: "email", headerName: "Email", width: 200 },
        { field: "level", headerName: "Role", width: 200 },  
      ];
  return (
     <DataGrid
    rows={users}
    disableSelectionOnClick
    columns={columns}
    pageSize={5}
    getRowId={(row) => row._id}
  />
  )
}

export default Teammate