import styled from 'styled-components'
import {useState,useEffect} from 'react'
import {changePassword} from '../../redux/apiCall'
import {useDispatch,useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom'


const Container = styled.div`
    margin-top: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Input = styled.input` 
margin-top: 20px;
padding: 12px;
border: 1px solid #0091ea;
&:focus{
    outline: none;
}
`
const Button = styled.button`
    padding: 10px 30px;
    background-color: #0091ea;
    border: none;
    font-size: 16px;
    margin-top: 20px;
`
export default function ChangePassword() {
    const currentUser = useSelector(state=>state.user.currentUser)
    const user = useSelector(state=>state.user)
    const [values, setValues] = useState({
        old_password: "",
        new_password: "",
      });
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
  

    const inputs=[{
        id: 1,
        name: "new_password",
        type: "password",
        placeholder: "New Password",
        errorMessage:
          "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
        label: "New Password",
        pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
        required: true,
      },
      {
        id: 2,
        name: "old_password",
        type: "password",
        placeholder: "Old Password",
        label: "Old Password",
        required: true,
      },]
      const handleSubmit = (e) => {
        e.preventDefault();
           console.log(values)
          changePassword(dispatch,currentUser._id,values)
      };
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
     
    return (
      <>
      {screenSize.dynamicWidth<600 && <Redirect to="/devicenotsupport"/>}
        <Container>
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <Input {...inputs[1]} onChange={(e)=>onChange(e)} 
                  />
                <Input {...inputs[0]} onChange={(e)=>onChange(e)}
                  />
                <span style={{fontSize:"10px", }} >{inputs[0].errorMessage}</span>
                <Button type="submit" disabled={user.isFatching}>Update</Button>
            </Form>
        </Container>
      </>
    )
}
