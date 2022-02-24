import styled from 'styled-components'
import { useLocation, useHistory } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {useState} from 'react'
import {createFolder,updateFolder} from '../../redux/apiCall'
 const Container = styled.div` 
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 100%;
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
    width: 70%;
    display: flex;
    flex-direction: column;
`
const Select = styled.select`
  width: 77%;
margin: 20px 0;
margin-top: 7px;
outline: none;
padding: 10px 10px;
border: 1px solid darkblue;
`
const Option = styled.option`
 
`
const Folder = () => {
    const location = useLocation();
    const parent = location.pathname.split('/')[2]
    const edit=location.search?.split('=')[0]
    const foldername=location.search?.split('=')[1]
    const dispatch = useDispatch()
    const history = useHistory()
    const current = useSelector(state=>state.user.currentUser)
    const [inputs,setInputs]=useState({})
    let data = []
     if(edit==="?level"){
      if(current.level === "president"&&foldername===""){
        data = ["president","vice-president","college-head","head","member"]
     }else if(current.level ==="vice-president"){
       data = ["vice-president","college-head","head","member"]
     }else if(current.level ==="college-head"){
       data = ["college-head","head","member"]
     }else if (current.level === "head"){
       data = ["head","member"]
     }else if(current.level ==="member"){
       data = ["member"]
     }
     }
   
    const onChangeHandler = (e)=>{
        setInputs((prev)=>{
          return{...prev,[e.target.name]:e.target.value}
        })
      }
    
     const onSubmitHandler = (e)=>{
        e.preventDefault()
        console.log(inputs)
     if(foldername&&edit==="?edit"){
       updateFolder(dispatch,inputs,parent,history)
     }else{
          createFolder(dispatch,
         {parent:parent,userId:current._id,...inputs},
          history)
     }
    }
    return (
        <Container>
            <Wrapper>
                <Form onSubmit={(e)=>onSubmitHandler(e)}>
                    <Item>
                        <Label>Folder name</Label>
                       <Input type='text' name="foldername" 
                       onChange={(e)=>onChangeHandler(e)} />
                    </Item>
                    <Item>
                       <Label>Permision</Label>
                       <Select type='text' name="level" 
                       onChange={(e)=>onChangeHandler(e)}>
                         <Option>Select</Option>
                         {data?.map(i=><Option>{i}</Option>)}
                      </Select>
                    </Item>
                    <Button>Create</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Folder
