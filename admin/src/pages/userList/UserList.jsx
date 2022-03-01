import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline,MoreVert } from "@material-ui/icons";
import { Button,MenuItem,Typography ,Menu 
  ,IconButton,Tooltip,Avatar} from "@material-ui/core";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import {getUsers, deleteUser} from '../../redux/apiCall'
import {useDispatch,useSelector} from 'react-redux'
import styled from "styled-components";
import {format} from 'date-fns'


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
  const currentUser = useSelector(state=>state.user.currentUser)
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
           <Avatar
              alt="Remy Sharp"
              src={currentUser?.avatar}
            />
            <span style={{marginLeft:"10px"}}> {params.row.username}</span> 
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
    {
        field: "createdAt",
        headerName: "Joined At",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="userListUser">
             {params.row.createdAt}
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
        getRowId={(row) => row._id}
      />
 </Container>
  );
}
