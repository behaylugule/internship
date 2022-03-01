import {
    alpha,
    AppBar,
    Avatar,
    Badge,
    InputBase,
    makeStyles,
    Toolbar,
    Typography,
  } from "@material-ui/core";
import { Cancel,  MailOutline, NotificationsOutlined, Search, ArrowDropDown } from "@material-ui/icons";
import { useState } from "react";
import {useDispatch,useSelector} from 'react-redux'
import styled from "styled-components";
import { Link } from "react-router-dom"; 
import {logout} from '../../redux/apiCall' 
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const BG = styled.div`
position: fixed;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  display: ${prop=>prop.show?"block":"none"};;
  background-color: "#fffffff";
`
const Container = styled.div` 
   opacity: ${prop=>prop.show?1:0};
   transform:${prop=>!prop.show&&"translateX(500px)"};
   width: 250px;
   position: absolute;
   top: 50px;
   right: 20px;
   background-color: white;
   overflow: hidden;
   z-index: 3;
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
  const useStyles = makeStyles((theme) => ({
    appbar:{
        backgroundColor:"#00aeff",
        color: "black"
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    logoContainer:{
        display: "none",
        alignItems:"center",
        [theme.breakpoints.up("sm")]: {
            display: "flex",
          },
    }
    ,
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    logoLg: {
      display: "none",
      cursor: "pointer",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    logoSm: {
      display: "block",
      cursor: "pointer",
      width: 40,
      height: 40,
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
     imgLogo:{
        marginRight: theme.spacing(2),
         width: 40,
         height: 40
     }
    ,
    search: {
      display: "flex",
      alignItems: "center",
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      borderRadius: theme.shape.borderRadius,
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        display: (props) => (props.open ? "flex" : "none"),
        width: "70%",
      },
    },
    input: {
      color: "black",
      marginLeft: theme.spacing(1),
    },
    cancel: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    searchButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    icons: {
      alignItems: "center",
      display: (props) => (props.open ? "none" : "flex"),
    },
    badge: {
      marginRight: theme.spacing(2),
      cursor: "pointer",
    },
    username:{
        display: "flex",
        marginRight:theme.spacing(2),
        cursor: "pointer"
    },
    avatar:{
      cursor: "pointer",
      "&:hover":{
        transform:"scale(1.1)"
      }
    },
    menuitemandlogo:{
      display: "flex",
      alignItems:"flex-start"
    }

  }));
  
  const Navbar = ({handleShow}) => {
    const dispatch = useDispatch()
  const[show,setShow] = useState(false)
 // const[showModel,setShowModel] = useState(false)
  const currentUser = useSelector(state=>state.user.currentUser)
  const logoutHandler =()=>{
    setShow(!show)
    logout(dispatch)
  }
    const [open, setOpen] = useState(false);
    const classes = useStyles({ open });
   
    return (
      <AppBar position="fixed" className={classes.appbar}>
        
        <Toolbar className={classes.toolbar}>
        <div className={classes.menuitemandlogo}>
        <Link to="/"    style={{textDecoration:'none',color:"black"}} >
        <div className={classes.logoContainer}>
           <img src="https://cdn.pixabay.com/photo/2017/03/08/14/20/flat-2126884_960_720.png" className={classes.imgLogo} alt="logo" />
             <Typography variant="h6" className={classes.logoLg}>
               AASTU
            </Typography>
        </div>
        </Link>
        </div>

          <img src="https://cdn.pixabay.com/photo/2017/03/08/14/20/flat-2126884_960_720.png" className={classes.logoSm} alt="logo" />
         
          <div className={classes.icons}>
            <div className={classes.username}>
              <Typography>{currentUser?.username}</Typography>
            </div>
            <Avatar
              alt="Remy Sharp"
              src={currentUser?.avatar}
               onClick={()=>setShow(!show)}
               className={classes.avatar}
            />
          </div>
        </Toolbar>
       <BG show={show} onClick={()=>setShow(!show)}>
        <Container show={show}>
               <Icons>
                    <Icon  onClick={()=>setShow(!show)}>
                    <Link  to={`/user/${currentUser?._id}`}
                      style={{textDecoration:'none',width:"100%",paddingRight:"120px",color:"black"}} >
                         Edit 
                      </Link> 
                    </Icon>
                    <Icon  onClick={()=>setShow(!show)}>
                    <Link to={"/changepassword"}  style={{textDecoration:'none',width:"100%",color:"black"}}>
                      Change Password
                   </Link>
                   </Icon>
                   <Icon onClick={()=>logoutHandler()} >Logout</Icon>
               </Icons>
           </Container>
         </BG>
      </AppBar>
    );
  };
  
  export default Navbar;