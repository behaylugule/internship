import styled from 'styled-components'
import { useLocation, useHistory } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {useState} from 'react'
import {updateDepartment} from '../../redux/apiCall'

 const Container = styled.div` 
   flex: 4;
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
width: 70%;
margin: 20px 0;
margin-top: 7px;
outline: none;
padding: 10px 10px;
border: 1px solid darkblue;
`
const Label = styled.label` 
 
`
const Button = styled.button` 
  width: 25%;
  padding: 10px 10px;
  border: none;
  background-color: darkblue;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`
const Item = styled.div`
    
`
const CreateDepartmnet = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const history = useHistory()
    const departmentId = location.pathname.split("/")[2];
    const department = useSelector((state) =>
       state.departments.departments.find((department) => department._id === departmentId)
     );

     const [data,setData]=useState({
        depName:department.depName
    })
     const onChangeHandler = (e)=>{
        setData({ ...data, [e.target.name]: e.target.value })
      }
    
     const onSubmitHandler = (e)=>{
        e.preventDefault()
        updateDepartment(dispatch,data,history,department._id)
    }
    return (
        <Container>
            <Wrapper>
                <Form onSubmit={(e)=>onSubmitHandler(e)}>
                    <Item>
                        <Label>Department name</Label>
                       <Input type='text' name="depName" 
                       onChange={(e)=>onChangeHandler(e)} value={data.depName} />
                    </Item>
                    <Button>Update</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default CreateDepartmnet
