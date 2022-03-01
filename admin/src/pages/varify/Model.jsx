import styled from 'styled-components'
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {getNotification} from '../../redux/apiCall'
import {format} from 'timeago.js'
import {varifyUser,deleteVarifyUser} from '../../redux/apiCall'
import {useHistory} from 'react-router-dom'
import {Avatar} from '@material-ui/core'
const Container = styled.div`
    flex: 4;
    height: 95vh;
    width:100%;
    background-color: white;
    margin-top: 60px;
`
const Wrapper = styled.div`
    
`
export default function Model(){
  const user = useSelector(state=>state.varifyUsers.varifyUsers)
  const currentUser = useSelector(state=>state.user.currentUser)
  const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
       getNotification(dispatch)
    }, [dispatch])
    
    
  const handleDelete = (id) => {
     deleteVarifyUser(dispatch,id)
  };

  const varifyOnHandle = (id)=>{
    varifyUser(dispatch,id,history)   
  }
 
  const columns = [
    { field: "_id", headerName: "ID", width: 190 },
    {
      field: "username",
      headerName: "User",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">
           <Avatar
              alt="Remy Sharp"
              src={currentUser?.avatar}
            />
            <span>{params.row.username}</span>  
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
    {
        field: "createdAt",
        headerName: "Date",
        width: 110,
        renderCell: (params) => {
          return (
            <div className="userListUser">
              {format(params.row.createdAt)}
            </div>
          );
        },
      },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
              <button className="userListEdit" onClick={()=>varifyOnHandle(params.row._id)}>varify</button>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

    return (
    <Container>
       <DataGrid
        rows={user}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row._id}
      />
 </Container>
    )
}
