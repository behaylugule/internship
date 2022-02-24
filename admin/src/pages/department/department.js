import "./department.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Add } from "@material-ui/icons";

import { Link, useHistory } from "react-router-dom";
import { useState,useEffect } from "react";
import {getDepartments, createDepartment,deleteDepartment} from '../../redux/apiCall'
import {useDispatch,useSelector} from 'react-redux'
import styled from "styled-components";
import {format} from 'timeago.js'

const Container = styled.div`
    flex: 4;
    background-color: white;
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    height: 95vh;
    width:100%;
`
const Create =styled.div` 
   width:200px ;
   font-size: 20px;
   margin: 30px 0;
   display: flex;
   align-items: center;
   background-color:darkblue;
   color: white;
   padding: 10px 10px;
   border-radius: 7px;
   cursor: pointer;
`

const BG = styled.div` 
 position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
  z-index: 1000;
  transform: ${props=>props.showModel?"scale(1)":"scale(0)"};
  transition: all 1s ease;
  display: flex;
  align-items: center;
  justify-content: center;

`
const Wrapper = styled.div` 
 
 `
const Form = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   width: 400px;
`
const Input  = styled.input` 
width: 90%;
margin: 20px 0;
margin-top: 7px;
outline: none;
padding: 10px 10px;
border-radius: 5px;
border: 1px solid darkblue;
`
const Label = styled.label` 
 color: white;
`
const Button = styled.button` 
  width: 100px;
  padding: 10px 10px;
  border: none;
  background-color: darkblue;
  color: white;
  border-radius: 5px;
  margin-right: 15px;
  cursor: pointer;
`
const Item = styled.div`
    
`
 const ButtonGroup =styled.div` 
 width: 90%;
 display: flex;
 justify-content: center;
 `
 const Cancel = styled.div`
    width: 100px;
  padding: 10px 10px;
  border: none;
  background-color: darkblue;
  color: white;
  border-radius: 5px;
  margin-right: 15px;
  cursor: pointer;
  text-align: center;
 `

export default function DepartmentList() {
  
  const dispatch = useDispatch()
  const history = useHistory()
  const [showModel, setShowModel] = useState(false)
 const [data,setData]=useState({
     depName:''
 })

 
  useEffect(() => {
    getDepartments(dispatch)
  }, [dispatch])
  
  const onChangeHandler = (e)=>{
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleDelete = (id) => {
    deleteDepartment(dispatch,id)
 };

 const onSubmitHandler = (e)=>{
     e.preventDefault()
     createDepartment(dispatch,data,history)
     setData({depName:""})
     setShowModel(false)
 }

 const department = useSelector(state=>state.departments.departments)
 const departments =department?.length?department:[]
  const columns = [
    {
      field: "depName",
      headerName: "Department",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.depName}
          </div>
        );
      },
    },{
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
          <Link to={`/department/${params.row._id}`}>
          <button className="userListEdit" >Edit</button>
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
      <>
    <Container>
       
        <Create onClick={()=>setShowModel(!showModel)}>
            <Add/>
           Create Department 
        </Create>
       
       <DataGrid
        rows={departments}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row._id}
      />
     
 </Container>
  <BG showModel={showModel}>
      <Wrapper>
                <Form onSubmit={(e)=>onSubmitHandler(e)}>
                    <Item>
                        <Label>Department name</Label>
                       <Input type='text' name="depName"  onChange={(e)=>onChangeHandler(e)} value={data.depName}/>
                    </Item>
                    <ButtonGroup>
                       <Cancel style={{backgroundColor:"coral"}}  onClick={()=>setShowModel(!showModel)}>Cancel</Cancel>
                      <Button type="submit">Create</Button>
                    </ButtonGroup>  
                </Form>
            </Wrapper>
      </BG>
 </>
  );
}
