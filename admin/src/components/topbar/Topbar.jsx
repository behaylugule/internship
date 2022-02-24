import React, {useEffect,useState} from "react";
import "./topbar.css";
import { NotificationsNone,ArrowDropDown,Dehaze,CloseOutlined, Language, Settings, Opacity, Close } from "@material-ui/icons";
import {Avatar,Typography} from '@material-ui/core'
import styled from 'styled-components'
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../../redux/apiCall'
import { Link } from "react-router-dom";
import {getNotification} from '../../redux/apiCall'

const Container = styled.div` 
   opacity: ${prop=>prop.show?1:0};
   transform:${prop=>!prop.show&&"translateX(500px)"};
   width: 200px;
   position: absolute;
   top: 50px;
   right: 20px;
   background-color: white;
   overflow: hidden;
   z-index: 1001;
   box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
   -webkit-box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
   border-radius: 20px;
   transition: all 1s ease;
`
const Icons = styled.div`
  width: 100%;
  padding:30px;
  display:flex;
  flex-direction: column;
 
 
`
const Icon = styled.span`
  width: 70%;
  padding: 5px 10px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: none;
  &:hover{
    background-color: lightgray;
  }
`
const BG = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #00000088;
  z-index:1000;
  transition: all 1s ease;
  opacity: ${prop=>prop.show?1:0};
   transform:${prop=>!prop.show&&"translateX(500px)"};
`
const CloseIcon = styled.div` 
   position: absolute;
   color: white;
   top: 50px;
   right: 175px;
   cursor: pointer;
`
export default function Topbar({showsm,setShowSm}) {

  const user = useSelector(state=>state.varifyUsers)
  const currentUser = useSelector(state=>state.user)
  
    const dispatch = useDispatch()
    useEffect(() => {
       getNotification(dispatch)
    }, [dispatch])
    
  const[show,setShow] = useState(false)
  const[showModel,setShowModel] = useState(false)
  const logoutHandler =()=>{
    setShow(!show) 
    logout(dispatch)
  }

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
    
    <div className="topbar"style={{background: "lightblue"}}>
      <div className="topbarWrapper">
        <div className="topLeft">
          {screenSize.dynamicWidth<600&& (showsm?<Dehaze style={{marginRight:"20px"}} 
          onClick={(e)=>setShowSm(!showsm)}/>:<CloseOutlined
          style={{marginRight:"20px"}} 
          onClick={(e)=>setShowSm(!showsm)}/>)}
          <span className="logo">AASTU</span>
        </div>
        <div className="topRight">
          <Link to="/varify">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">{user.varifyUsers.length}</span>
          </div>
          </Link>
          <div className="topbarIconContainer" style={{display:"flex"}}>
              <ArrowDropDown/>
              <Typography>{currentUser.currentUser?.username}</Typography>
            </div>
          <div className="topbarIconContainer"  onClick={()=>setShow(!show)}>
          <Avatar
              alt="Remy Sharp"
              src={currentUser.currentUser?.avatar}
            />
           </div>
        </div>
        
           <Container show={show}>
               <Icons>
                    <Icon  onClick={()=>setShow(!show)}>
                    <Link  to={`/user/${currentUser.currentUser._id}`}
                      style={{textDecoration:'none',width:"100%",paddingRight:"120px",color:"black"}} >
                         Edit 
                      </Link> 
                    </Icon>
                    <Icon  onClick={()=>setShow(!show)}>
                    <Link to={`/changepassword`}  style={{textDecoration:'none',width:"100%",color:"black"}}>
                      Change Password
                   </Link>
                   </Icon>
                   <Icon onClick={()=>logoutHandler()} >Logout</Icon>
               </Icons>
           </Container>
         
      </div>
    </div>
  );
}
