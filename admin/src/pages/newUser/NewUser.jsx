import "./newUser.css";
import {useState}from 'react'
import { useDispatch,useSelector } from "react-redux";
import { createUser } from "../../redux/apiCall";
import { useHistory } from "react-router-dom";


export default function NewUser() {

  const [values, setValues] = useState({
    username: "",
    email: "",
    fullname: "",
    address:"",
    phone:"",
    gender:"",
    password: "",
    confirmPassword: "",
  });
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "fullname",
      type: "text",
      placeholder: "Full name",
      label: "Full name",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
    {
      id: 6,
      name: "phone",
      type: "text",
      placeholder: "+251938018734",
      label: "phone",
    },
    {
      id: 7, 
      name: "address",
      type: "text",
      placeholder: "yeka | Addis Abeba ",
      label: "address",
    },
  ];
   const history = useHistory()
   const dispatch = useDispatch()
   const users = useSelector(state=>state.users)
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(dispatch,values,history)
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  return (<>
     
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={(e)=>handleSubmit(e)}>
        <div className="newUserItem">
          <label>Username</label>
          <input {...inputs[0]} onChange={(e)=>onChange(e)}
            onBlur={handleFocus}
            focused={focused.toString()} />
          <span className="span">{inputs[0].errorMessage}</span>
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input {...inputs[2]} onChange={(e)=>onChange(e)}
            onBlur={handleFocus}
            focused={focused.toString()}/>
          <span className="span">{inputs[1].errorMessage}</span>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input {...inputs[1]}  onChange={(e)=>onChange(e)}
            onBlur={handleFocus}
            focused={focused.toString()}/>
          <span className="span">{inputs[2].errorMessage}</span>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input {...inputs[3]} onChange={(e)=>onChange(e)} 
            onBlur={handleFocus}
            focused={focused.toString()}/>
          <span className="span">{inputs[3].errorMessage}</span>
        </div>
        <div className="newUserItem">
          <label>Conformd Password</label>
          <input {...inputs[4]} onChange={(e)=>onChange(e)} 
            onBlur={handleFocus}
            onFocus={() =>
              inputs[4].name === "confirmPassword" && setFocused(true)
            }
            focused={focused.toString()}/>
          <span className="span">{inputs[4].errorMessage}</span>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input {...inputs[5]}  onChange={(e)=>onChange(e)}
            onBlur={handleFocus}
            focused={focused.toString()}/>
          <span className="span">{inputs[5].errorMessage}</span>
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input {...inputs[6]}  onChange={(e)=>onChange(e)} 
            onBlur={handleFocus}
            focused={focused.toString()}/>
          <span className="span">{inputs[6].errorMessage}</span>
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" onChange={(e)=>onChange(e)} />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female"  onChange={(e)=>onChange(e)}/>
            <label for="female">Female</label>
            
          </div>
        </div>
        <button className="newUserButton" disabled={users.isFatching}>Create</button>
      </form>
    </div>
    </>
  );
}
