import styled from 'styled-components'
import {ShareOutlined, ArrowForwardIos, PictureAsPdfOutlined} from "@material-ui/icons"
import { Button,Typography,TextField,Link } from "@material-ui/core";
import {Send} from "@material-ui/icons"
import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {sendEmail} from "../../redux/apiCall"


const BG = styled.div` 
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
 padding-bottom: 60px;
  background-color: white;
  z-index: 1100;
  transform: ${props=>props.showModel?"translateX(510px)":" translateX(0px)"};
  transition: all 1s ease;

  box-shadow: -22px 10px 47px -2px rgba(0,0,0,0.53);
-webkit-box-shadow: -22px 10px 47px -2px rgba(0,0,0,0.53);
-moz-box-shadow: -22px 10px 47px -2px rgba(0,0,0,0.53);
  
`

const Wrapper = styled.div` 
   display: flex;
   width: 100%;
   height: 100%;
   flex-direction: column;
   
`
const Top = styled.div` 
  height: 13vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 3px #f3e5f5;

`
const MiddleTop = styled.div` 
  height: 15vh;
  width: 100%;
  background-color: #f3e5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`
const Middle = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
`
const Bottem = styled.div` 
display: ${prop=>prop.showShare?"flex":"none"};
align-items: center;
justify-content: center;
margin: 50px;
width: 100%;
`
const Share = styled.div` 
  padding: 0;
  cursor: pointer;
  &:hover{
      transform: scale(1.1);
  }
`
const Detail = styled.div` 
  align-self: flex-start;
  padding-left: 15px;
  margin-bottom: 30px;
`
const Title = styled.h3`
     margin-top: 5px;
`
const Desc = styled.p` 
 margin-top: 5px;
`
const Size = styled.p` 
 margin-top: 5px;
`

const Back = styled.div` 
  position: fixed;
  left: -10px;
  top: 10px;
  background-color:white;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover{
    transform: scale(1.2);
  }
`
const Form = styled.form` 
 width: 100%;
 
`
const FormItem = styled.div`
    display: flex;
    align-items: center;
`;

const DocumentModel = ({showModel,setShowModel,pdfData}) => {
    const [showShare,setShowShare] = useState(false)
    const [email,setEmail] = useState("")
    const currentUser = useSelector(state=>state.user.currentUser)
    const dispatch = useDispatch()
    const onChangeHandler = (e)=>{
              setEmail(e.target.value)
    }

    const onSubmitHundler =()=>{
      const data = {
        receiverEmail:email,
        senderEmail:"behaylugule@gmail.com",
        documentUrl:pdfData.documentUrl,
        documentName:pdfData.documentName
      }
      sendEmail(dispatch,data)
      setEmail("")         
    }
  return <BG showModel={showModel}>
  <Wrapper>
     <Top>
         <Back onClick={(e)=>setShowModel(!showModel)}>
           <ArrowForwardIos style={{fontSize:"20px"}}/>
         </Back>
         <Typography style={{fontSize:"30px",marginLeft:"30px"}}>File</Typography>
         <Share onClick={(e)=>setShowShare(!showShare)}>
            <ShareOutlined style={{fontSize:"30px",marginRight:"30px",
            backgroundColor:"#f3e5f5", padding:"7px",
            borderRadius:"50%",cursor:"pointer"}}></ShareOutlined>
         </Share>
     </Top>
     <Middle>
         <MiddleTop>
            <PictureAsPdfOutlined style={{fontSize:"80px", color:"#d32f2f",backgroundColor:"white",borderRadius:"50%"}}/>
         </MiddleTop>
         <Detail>
             <Title>Name: {pdfData.documentName}</Title>
             <Desc>Desc: {pdfData.description}</Desc>
         </Detail>
         <Link href={pdfData.documentUrl} target="_blank">
            View Document
         </Link>
 

     </Middle>
     <Bottem showShare = {showShare}>
     <Form  noValidate autoComplete="off">
         <FormItem>
            <TextField id="standard-basic" label="Email" style={{width:"60%",marginLeft:"10px"}}
             onChange={(e)=>onChangeHandler(e)} value={email} />
            <Send style={{fontSize:"60px",cursor:"pointer"}} color='primary' 
            onClick={()=>onSubmitHundler()}/>
         </FormItem>
     </Form>             
      </Bottem>       
  </Wrapper>
</BG>;
};

export default DocumentModel;
