import styled from 'styled-components'
import { Button} from "@material-ui/core";
import {Alert} from "@material-ui/lab"



const BG = styled.div` 
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
 padding-bottom: 60px;
  background-color: #00000034;
  z-index: 1100;
  transform: ${props=>props.showModel?"translateY(0)":" translateY(-200vh)"};
  transition: all 1s ease;
 display: flex;
 align-items: center;
 justify-content: center; 
 opacity:${props=>props.showModel?1:0};
`

const Wrapper = styled.div` 
   display: flex;
   align-items: center;
   justify-content: center;
   width: 450px;
   height: 300px;
   flex-direction: column;
   background-color: white;
   box-shadow: -22px 10px 47px -2px rgba(0,0,0,0.53);
-webkit-box-shadow: -22px 10px 47px -2px rgba(0,0,0,0.53);
-moz-box-shadow: -22px 10px 47px -2px rgba(0,0,0,0.53);
  
`
const Top = styled.div` 
 font-size: 25px;
`
const Middle = styled.div`
  width: 50%;
 display: flex;
 align-items: center;
 justify-content: space-around;
 margin-top: 40px;
`

const VerifyModel = ({showModel,setShowModel,handleDelete}) => {
    
  return <BG showModel={showModel.show}>
  <Wrapper>
    <Top>
       <Alert severity="warning">Are you sure to delete this file?</Alert>      
    </Top>
    <Middle>
        <Button  variant="contained" color="primary"
        onClick={(e)=>handleDelete(showModel.data)}
        >OK</Button>
        <Button variant="contained" color="secondary" onClick={(e)=>setShowModel({show:!showModel.show})}>Cancle</Button>         
    </Middle>     
  </Wrapper>
</BG>;
};

export default VerifyModel;
