import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useState} from 'react'
import {login} from '../../redux/apiCall'
import {useDispatch,useSelector} from 'react-redux'
import {Redirect,Link} from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const currentUser = useSelector(state=>state.user.currentUser)
  const user = useSelector(state=>state.user)
  const [user_name, setUsename] = useState("")
  const [password,setPassword] = useState("")
  const dispatch = useDispatch()
  const onSubmitHandler=(e)=>{
        e.preventDefault()
        login(dispatch,{user_name,password})
  }
  return (
    <Container component="main" maxWidth="xs">
          {currentUser&& <Redirect to="/"/>}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}  onSubmit={(e)=>onSubmitHandler(e)} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete='current-username'
            autoFocus
            onChange={(e)=>setUsename(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {user.error!==null&&<Alert severity="error">{user.error}</Alert>}
          <Grid container>
            <Grid item xs>
              <Link to="/resetpassword" className='link'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/register' className='link'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}