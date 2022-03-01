import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import {Avatar} from '@material-ui/core'
import { Link,useLocation,useHistory } from "react-router-dom";
import "./user.css";
import {useSelector,useDispatch} from 'react-redux'
import moment from 'moment'
import {useState, useEffect} from 'react'
import {updateUser} from '../../redux/apiCall'
import styled from 'styled-components'
import {getDepartments} from '../../redux/apiCall'
import Role from '../../components/Role/Role'
 
const Container = styled.div` 
 position: fixed;
 top: 0;
 width: 100vw;
 height: 100vh;
 background-color: #000000e2;
 z-index: 1001;
 display: flex;
 align-items: center;
 justify-content: center;
 transform:${props=>props.showModel?"scale(1)":"scale(0)"};
 transition: all 1s ease;
`

export default function User() {
  const history = useHistory()
  const dispatch = useDispatch()
  
  
  useEffect(() => {
    getDepartments(dispatch)    
  }, [dispatch])

  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) =>
     state.users.users.find((user) => user._id === userId)
   );
   const departments =useSelector(state=>state.departments.departments)
   const data = [
     "president","vice-president","college-head","head","member"
    ]
   const [values, setValues] = useState({
    username: user?.username,
    email: user?.email,
    fullname: user?.fullname,
    address:user?.address,
    phone:user?.phone,
    gender:user?.gender,
    level:user?.level
  });
  console.log(values)

  const [showModel, setShowModel]=useState(false)
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      required: true,
    },
    {
      id: 3,
      name: "fullname",
      type: "text",
      placeholder: "Full name",
    },
    {
      id: 4,
      name: "phone",
      type: "text",
      placeholder: "+251938018734",
     
    },
    {
      id: 5, 
      name: "address",
      type: "text",
      placeholder: "yeka | Addis Abeba ",
    },
  ];

 
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(dispatch,values,history,userId)
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <>
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
          <Avatar
              alt="Remy Sharp"
              src={user?.avatar}
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.fullname}</span>
              <span className="userShowUserTitle">{user?.role?.map(r=><span key={r.depId} style={{marginRight:"5px"}}>{r.depName}</span>)}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">Joined in {user?.createdAt}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.address}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle">{user?.level}</span>
            </div>
            <button className="userUpdateButton"
             style={{marginTop:"50px",padding:"10px 20px"}}
             onClick={()=>setShowModel(!showModel)} disabled={user?.isFatching}>
              Add Department</button>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={(e)=>handleSubmit(e)}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  {...inputs[0]}
                  className="userUpdateInput"
                  onChange={(e)=>onChange(e)}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                  value={values.username}
                />
                 <span className="span">{inputs[0].errorMessage}</span>
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  {...inputs[2]}
                  onChange={(e)=>onChange(e)}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                  className="userUpdateInput"
                  value={values.fullname}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  {...inputs[1]}
                  onChange={(e)=>onChange(e)}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                  className="userUpdateInput"
                  value={values.email}
                />
                 <span className="span">{inputs[1].errorMessage}</span>
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  {...inputs[3]}
                  onChange={(e)=>onChange(e)}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                  className="userUpdateInput"
                  value={values.phone}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  {...inputs[4]}
                  onChange={(e)=>onChange(e)}
                  onBlur={handleFocus}
                  focused={focused.toString()}
                  className="userUpdateInput"
                  value={values.address}
                />
              </div>
              <div className="userUpdateItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" onChange={(e)=>onChange(e)}  />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" onChange={(e)=>onChange(e)}  />
            <label for="female">Female</label>
          </div>
          <div className="userUpdateItem">
             <label>Role</label>
              <select name="level" id=""  onChange={(e)=>onChange(e)} 
              >
                <option >Select</option>
                {data.map(i=><option>{i}</option>)}
              </select>
              <button className="userUpdateButton">Update</button>
          </div>
        </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Container showModel= {showModel}>
        <Role departments={departments} showModel={showModel} setShowModel={setShowModel}/>
    </Container>
    </>
  );
}
