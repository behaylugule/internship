import styled from "styled-components"
import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Card,CardContent,CardMedia,Typography,CardActionArea} from '@material-ui/core';

const Container = styled.div` 
   width: 100vw;
   height: 100vh;
   z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`
const DeviceNot = () => {
    const user = useSelector(state=>state.user.currentUser)
    return (
        <Container>
             <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://media.istockphoto.com/vectors/contract-or-document-signing-icon-document-folder-with-stamp-and-text-vector-id1179640294?s=612x612"
          alt="green iguana"
        />
        <CardContent style={{backgroundColor:"red"}}>
          <Typography gutterBottom variant="h5" component="div" style={{fontSize:"25px"}}>
            Warning
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{fontSize:"20px"}}>
              Your device is not support this software, please use large device
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </Container>
    )
}

export default DeviceNot
