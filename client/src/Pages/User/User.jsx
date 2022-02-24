import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  Dehaze
} from "@material-ui/icons";
import {Avatar} from '@material-ui/core'
import { useLocation,useHistory } from "react-router-dom";
import "./user.css";
import {useSelector,useDispatch} from 'react-redux'
import moment from 'moment'
import {useState, useEffect} from 'react'
import {updateUser} from '../../redux/apiCall'
import VerifyModel from "../../Components/VerifyModel/VerifyModel";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) =>
     state.user.currentUser
   );
  const [file,setFile] = useState(null)
   const [values, setValues] = useState({
    username: user.username,
    email: user.email,
    fullname: user.fullname,
    address:user.address,
    phone:user.phone,
    gender:user.gender,
    avater:user.avater
  });
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

  const history = useHistory()
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(dispatch,values,history,userId)
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onChangeFile=(e)=>{
    console.log(e)
    console.log(e.target)
  }
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

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

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer" style={{display:"flex",flexDirection:`${screenSize.dynamicWidth>600?"row":"column"}`}}>
        <div className="userShow">
          <div className="userShowTop">
          <Avatar
              alt="Remy Sharp"
              src={user?.avatar}
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.fullname}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">Joined in {user.createdAt}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>
            <div className="userShowInfo">
              <Dehaze className="userShowIcon" />
              <span className="userShowInfoTitle">{user.level}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={(e)=>handleSubmit(e)} style={{display:"flex",flexDirection:`${screenSize.dynamicWidth>600?"row":"column"}`}}>
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
        </div>
            </div>
            <div className="userUpdateRight">
            <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
                
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
       
    </div>
  );
}
