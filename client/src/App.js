import './App.css';
import {useState,useEffect} from 'react'
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar'
import { Grid,makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import Home from './Pages/Home/Home'
import Register from './Pages/Register/Register'
import {useSelector} from 'react-redux'
import User from './Pages/User/User';
import Unvarify from './Pages/unvarify/Unvarify';
import Document from './Pages/Document/document'
import CreateFolder from './Pages/Folder/Folder'
import CreateDocument from './Pages/Createdocument/Createdocument'
import ChangePassword from './Pages/Changepassword/ChangePassword';
import Signin from './Pages/Login/Signin'
import Forgetpassword from './Pages/passwordforget/PasswordForget'
import DeviceNot from './Pages/DeviceNot/DeviceNot';

const useStyles = makeStyles((theme) => ({
  appbar:{
    backgroundColor:"white",
    color: "black"
},
showSidebar:{
  [theme.breakpoints.down("sm")]: {
    display: (props) => (props.show ? "block" : "none"),
  },
}
}))

function App() {
  const [show, setShow] = useState(false)
  const user = useSelector(state=>state.user.currentUser)
   const isFatchingUser = useSelector(state=>state.user.isFatching)
  const document = useSelector(state=>state.documents)
  const handleShow = ()=>{
    setShow(!show)
    console.log(show)
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
  const classes = useStyles({ show });
  return (
    <>{
       (isFatchingUser||document.isFatching) &&
        <div class="center">
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
        </div>
     
    }
   <Router>
   
       <Route path="/register">
         <Register/>
        </Route>
        <Route path="/login">
           <Signin/> 
        </Route> 
        <Route path="/resetpassword">
         <Forgetpassword/>
        </Route>
        <Route exact path="/devicenotsupport">
            <DeviceNot/>
        </Route>
     {user?<>
       {!user.isVarify && <Redirect to="/unvarify"/>}
          {screenSize.dynamicWidth<600?<Redirect to="/devicenotsupport"/>:<Redirect to="/"/>}
      <Navbar handleShow={handleShow} />
        <Grid container >
          <Grid item sm={2} xs={2}  style={{display:!user.isVarify?"none":"block"}} 
          className={classes.showSidebar} >
            <Sidebar/>
          </Grid>
         <Grid item sm={10} xs={10} style={{marginTop:"70px",height:"calc(100vh-70px)"}}>
         <Switch> 
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/user/:id">
            <User />
          </Route>
          <Route exact path="/unvarify">
            <Unvarify />
          </Route>
          <Route exact path="/documents">
            <Document />
          </Route>
          <Route exact path="/changepassword">
            <ChangePassword />
          </Route>
          <Route exact path="/folder/:id">
            <CreateFolder />
          </Route>
          <Route exact path="/document/:id">
            <CreateDocument/>
          </Route>
        </Switch>
         </Grid>
      </Grid>
      </>:<Redirect to="/login" /> 
       }  
   </Router>
   </>
  );
}

export default App;
