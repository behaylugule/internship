import "./sidebar.css";
import { useState,useEffect } from "react";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link, NavLink } from "react-router-dom";
import styled from 'styled-components'

const Component = styled.div` 
  position: fixed;
  width: 250px;
   background: lightblue;
   color: black;
   z-index: 100;
   height: 100vh;
   transform: ${props=>props.show?"translateX(-300px)":"translateX(0)"};
   transition: all 1s ease;
`

export default function Sidebar({showSm, setShowSm}) {
  const activeStyle = { color: '#0091ea', fontWeight:"bold" };
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
    <>
    {screenSize.dynamicWidth<600?(
       <Component show={showSm}>
          <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
          <NavLink to="/" exact activeStyle={activeStyle} className="link"
          onClick={(e)=>setShowSm(!showSm)}>
            <li className="sidebarListItem active" >
              <LineStyle className="sidebarIcon" />
              Home
            </li>
         </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
          <NavLink to="/users" exact activeStyle={activeStyle} 
          className="link" onClick={(e)=>setShowSm(!showSm)}>
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
           </NavLink>
            <NavLink to="/newUser" activeStyle={activeStyle}
             className="link" onClick={(e)=>setShowSm(!showSm)}>
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Create User
              </li>
            </NavLink>
            <NavLink to="/varify" activeStyle={activeStyle} className="link"
            onClick={(e)=>setShowSm(!showSm)}>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              unvarified user
            </li>
            </NavLink>
            <NavLink  activeStyle={activeStyle} to="/departments" 
            className="link" onClick={(e)=>setShowSm(!showSm)}>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Department 
            </li>
            </NavLink>
          </ul>
        </div>
      </div>
       </Component>
    ):(
      <div className="sidebar" >
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
          <NavLink to="/" exact activeStyle={activeStyle}  className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
         </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
          <NavLink to="/users" exact activeStyle={activeStyle} className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
           </NavLink>
            <NavLink to="/newUser" activeStyle={activeStyle} className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Create User
              </li>
            </NavLink>
            <NavLink to="/varify" activeStyle={activeStyle} className="link">
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              unvarified user
            </li>
            </NavLink>
            <NavLink  activeStyle={activeStyle} to="/departments" className="link">
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Department 
            </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>

    )}
     </>
  );
}
