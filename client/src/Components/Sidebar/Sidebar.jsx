import { Container, makeStyles, Tooltip, Typography } from "@material-ui/core";
import {
  Home,
  DescriptionOutlined,
  EmailOutlined,
  FileCopyOutlined,
  TimelineOutlined,
  ContactPhoneOutlined,
  SettingsOutlined
} from "@material-ui/icons";
import {Link, NavLink} from 'react-router-dom'
import styled from 'styled-components'

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    zIndex:9,
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding:"5px 10px",
    marginBottom: theme.spacing(4),
    borderRadius:"10px",
    '&:hover':{
       color:"#0091ea"
    },
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "25px",
    },
  },
  text: {
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
const Wrapper = styled.div` 

`

const Leftbar = () => {
  const classes = useStyles();
  const activeStyle = { color: '#0091ea', fontWeight:"bold" };
  return (
    <Wrapper>
        <Container className={classes.container}>
          <NavLink to="/" exact activeStyle={activeStyle} className="link" >
          <div className={classes.item}>
            <Tooltip title="Dashboard" aria-label="add">
                <Home className={classes.icon} />
            </Tooltip>
                <Typography className={classes.text}>Dashboard</Typography>
          </div>
          </NavLink>
        <NavLink to="/documents" activeStyle={activeStyle} className="link" >
          <div className={classes.item}>
              <DescriptionOutlined className={classes.icon} />
              <Typography className={classes.text}>Document</Typography>
            </div>
        </NavLink>
        
        </Container>
    </Wrapper>
  );
};
export default Leftbar;