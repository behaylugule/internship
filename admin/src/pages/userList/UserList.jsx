import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline,MoreVert } from "@material-ui/icons";
import { Button,MenuItem,Typography ,Menu ,IconButton,Tooltip} from "@material-ui/core";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import {getUsers, deleteUser} from '../../redux/apiCall'
import {useDispatch,useSelector} from 'react-redux'
import styled from "styled-components";
import {format} from 'timeago.js'


const Container = styled.div`
   flex: 4;
    height: 95vh;
    width:100%;
    background-color: white;
    margin-top: 60px;
`

const ITEM_HEIGHT = 48;
export default function UserList() {
  const [data, setData] = useState(userRows);
  const dispatch = useDispatch()
 
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth
    })
  }
useEffect(() => {
    window.addEventListener('resize', setDimension);
    
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])

 
  useEffect(() => {
    getUsers(dispatch,localStorage.getItem("token"))
  }, [dispatch])

  const handleDelete = (id) => {
    deleteUser(dispatch,id)
 };

 const varifyOnHandle = (id)=>{
     
 }

 const users = useSelector(state=>state.users.users) 
  
 const [anchorEl, setAnchorEl] = useState(null);
 const open = Boolean(anchorEl);

 const handleClick = (event) => {
   setAnchorEl(event.currentTarget);
 };

 const handleClose = (id) => {
   console.log(id)
   setAnchorEl(null);
 };

  const columns = [
    {
      field: "username",
      headerName: "User",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src="https://image.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg" alt="" />
            {params.row.username}
          </div>
        );
      },
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
          <Link to={`/user/${params.row._id}`}>
          <button className="userListEdit" onClick={()=>varifyOnHandle(params.row._id)}>Edit</button>
          </Link>
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
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row._id}
      />
 </Container>
  );
}
