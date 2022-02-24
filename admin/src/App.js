import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/login"
import {useSelector} from 'react-redux'
import Model from "./pages/varify/Model";
import DepartmentList from "./pages/department/department";
import CreateDepartment from './pages/createDepartment/createDepartment'
import ChangePassword from "./pages/Changepassword/ChangePassword";
import {useState} from 'react'

function App() {
  const user = useSelector(state=>state.user?.currentUser)
  const isFatchingUser = useSelector(state=>state.user.isFatching)
  const isFatchingUsers = useSelector(state=>state.users.isFatching)
  const  department = useSelector(state=>state.departments)
  const varify = useSelector(state=>state.varifyUsers)
  const [smDiv,setSmDiv]= useState(true)
  return (
    <>
    {
       (isFatchingUser||varify.isFatching||department.isFatching||isFatchingUsers)&&
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
      <Route path="/login">
            <Login/> 
       </Route> 
    {user?<>
      <Topbar showsm={smDiv} setShowSm = {setSmDiv} />
      <div className="container">
       <Sidebar showSm={smDiv} setShowSm = {setSmDiv}/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/varify">
            <Model />
          </Route>
          <Route path="/departments">
             <DepartmentList/>
          </Route>
          <Route path="/department/:departmentId">
             <CreateDepartment/>
          </Route>
          <Route path="/changepassword">
             <ChangePassword/>
          </Route>
        </Switch>

      </div>
      </>:<Redirect to="/login"/>}
    </Router>
    </>
  );

}
export default App;
