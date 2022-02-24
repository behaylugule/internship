import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import {addRole} from '../../redux/apiCall';
import {useHistory,useLocation} from 'react-router-dom';
import styled from 'styled-components'
import {CloseOutlined} from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    padding: theme.spacing(5),
    minWidth: 300,
    maxWidth: 500,
    backgroundColor:"white",
    position: 'relative'
    
  },
 
 button:{
     marginTop:theme.spacing(3),
     width: "100px"
 },
 label:{
     fontSize:"23px",
     fontWeight:700
 }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CloseModel = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  &:hover{
    transform: scale(1.2);
  }
`
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({departments,showModel,setShowModel}) {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const dispatch = useDispatch()
 const history = useHistory()
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const onSubmitHandle = (event) => {
    event.preventDefault()
    const value = [];
    for (let i = 0, l = personName.length; i < l; i += 1) {
      let dep = departments.find(dep=>dep.depName===personName[i])
        value.push({depId:dep._id,depName:dep.depName});
      }
     addRole(dispatch,value,userId,history)      
  };
  const user = useSelector(state=>state.users)
 
  
  return (
    <div>
      <FormControl className={classes.formControl}>
          <CloseModel>
              
            <CloseOutlined color="primary" style={{fontSize:"30px"}} onClick={()=>setShowModel(!showModel)}/>
          </CloseModel>
        <InputLabel id="demo-mutiple-checkbox-label" className={classes.label}>Role</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {departments.map((department) => (
            <MenuItem key={department._id} value={department.depName}>
              <Checkbox checked={personName.indexOf(department.depName) > -1}/>
              <ListItemText primary={department.depName}/>
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary" className={classes.button} 
         onClick={(e)=>onSubmitHandle(e)}>
             Add
       </Button>
      </FormControl>
    </div>
  );
}