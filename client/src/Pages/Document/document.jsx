import "./document.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline,Folder, 
  PictureAsPdfOutlined, AddOutlined,MoreVert,ArrowBackIosOutlined,
  ArrowForwardIosOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState,useEffect,useRef } from "react";
import {useDispatch,useSelector} from 'react-redux'
import styled from "styled-components";
import {format} from 'timeago.js'
import {deleteDocuemnt, getDocument,deleteFolder} from '../../redux/apiCall'
import { Button,MenuItem,Typography ,Menu ,IconButton  } from "@material-ui/core";
import DocumentModel from "./DocumentModel";
import { getStorage, ref, deleteObject } from "firebase/storage";
import app from '../../firebase'
import VerifyModel from "../../Components/VerifyModel/VerifyModel";
import {Tooltip} from '@material-ui/core'

const Container = styled.div`
  background-color: white;
  height: calc(100vh - 70px);
`
const Wrapper = styled.div` 
  position: relative;
`


const Role = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 20px 0;
    margin-left: 15px;
    padding: 0px 20px;
`

const RoleItem = styled.div`
    min-width: 150px;
    height: 30px;
    border-radius: 20px;
    margin-right: 15px;
    background-color:${prop=>prop.selected?"#0091ea": "#dfd9d9"};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
const Middle = styled.div` 
  height: ${props=>props.size>600?"30px":"60px"};
  margin-bottom: 7px;
  display: flex;
  align-items:${props=>props.size>600?"center":"flex-start"} ;
  justify-content: space-between;
  flex-direction: ${props=>props.size>600?"row":"column"};
  margin-left:${props=>props.size>600?"row":"column"} 15px;
  
`
const Mange = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 20px;
`
const Folder1 = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
    &:hover{
      transform: scale(1.2);
    }
`
const Url= styled.div`
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 15px;
`
const UrlItem = styled.div`
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
`
const ITEM_HEIGHT = 48;



export default function Document() {

  const dispatch = useDispatch()

  
  
  const current = useSelector(state=>state.user.currentUser) 
  const [url,setUrl] = useState([current.role[0]])
  const [selected,setSelected] = useState(current.role[0].depName)
  const [showModel,setShowModel] = useState(true)
  const [pdfData,setPdfData] = useState({})
  const [varifyDelete,setVarifyDelate] = useState({show:false,data:{}})
  useEffect(() => {
    getDocument(dispatch,url[0].depId,current.level)
  }, [dispatch])

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (dep) => {
  
    if(dep.type==="pdf"){
      const storage = getStorage(app);
      const desertRef = ref(storage, dep.documentUrl);
      deleteObject(desertRef).then(() => {
           deleteDocuemnt(dispatch,dep._id)
           setVarifyDelate({show:false,data:{}})
      }).catch((error) => {
        console.log(error)
      });

    }else{
      deleteFolder(dispatch,dep._id)
      setVarifyDelate({show:false,data:{}})
    }
 };
 const handleUrl=(dep,index)=>{
    if(url.length===1) return;
    if(index===url.length-1)return;
    setUrl(prev=>prev.splice(
      prev.findIndex((item) => item.depId === dep._id)+1,
      prev.length-1
    ))
   
    getDocument(dispatch,dep?.depId||dep?._id,current.level)
 }
 const getDataDep = (dep)=>{
     getDocument(dispatch,dep.depId,current.level)
     setUrl([dep])
     setSelected(dep.depName)
 }


 const openFile = (row)=>{
   if(row.type==="folder"){ 
     getDocument(dispatch,row._id,current.level)
     setUrl(prev=>[...prev,{depId:row._id,depName:row.foldername,level:row.level}])
    }
     else{
       setShowModel(!showModel)
       setPdfData(row)
     }
 }

  const documents =useSelector(state=>state.documents.documents)
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

  const columns = [
    {
      field:"documentName",
      headerName: "documentname",
      width: `${screenSize.dynamicWidth>600?250:150}`,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.type ==="pdf"?
             <PictureAsPdfOutlined className="userListImg" style={{color:"#d32f2f"}} />
             :
             <Folder className="userListImg" style={{color:"#ffab00"}} />}
            {params.row.type==="pdf"?params.row.documentName:params.row.foldername}
          </div>
        );
      },
    },
    { field: "type", headerName: "Type",  width:`${screenSize.dynamicWidth>600?110:0}` },
    {
        field: "createdAt",
        headerName: "Date",
        width:`${screenSize.dynamicWidth>600?250:0}`,
        renderCell: (params) => {
          return (
            <div className="userListUser" style={{display:`${screenSize.dynamicWidth>600?"block":"none"}`}}>
              {params.row.createdAt}
            </div>
          );
        },
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
          {screenSize.dynamicWidth>600?(
            <>
          <Link to={`/folder/${params.row._id}?edit=${params.row.foldername}`} >
          <button className="userListEdit"  disabled={params.row.type==="pdf"} >Edit</button>
          </Link>
         
          <Button className="userListEdit" onClick={(e)=>openFile(params.row)}>Open</Button>
         
             <DeleteOutline
              className="userListDelete"
              onClick={() => setVarifyDelate({show:!varifyDelete.show,data:params.row})}
            />
            </>):(
              <div>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                    display:"flex",
                    flexDirection:"column"
                  },
                }}
              >
               
                  <MenuItem  onClick={handleClose}>
                    <Link to={`/folder/${params.row._id}?edit=${params.row.foldername}`} >
                      <button className="userListEdit"  disabled={params.row.type==="pdf"} >Edit</button>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>          
                     <Button className="userListEdit" onClick={(e)=>openFile(params.row)}>Open</Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                  <Tooltip title="Delete Document" aria-label="add">
                       <DeleteOutline
                        className="userListDelete"
                        onClick={() => setVarifyDelate({show:!varifyDelete.show,data:params.row})}
                       />
                 </Tooltip>
                       
                  </MenuItem>
              </Menu>
            </div>
            )
          }
         </>
        );
      },
    },
  ];
  const listRef = useRef()
  const [slideNumber,setSlideNumber] = useState(0)
  const [isMoved,setIsMoved]=useState(false)

  const handleMove=(direction)=>{
    const distance=listRef.current.getBoundingClientRect().x - 100
   console.log(distance)
    if(direction==="left"){
        setSlideNumber(slideNumber-1)
      listRef.current.style.transform = `translateX(${175 + distance}px)`  
    }
    if(direction==="right"  ){
      setSlideNumber(slideNumber+1)
      listRef.current.style.transform = `translateX(${distance-175}px)`  
    }
    console.log(distance)
     setIsMoved(true)
  }

  return (<>
    <Container>
      <Wrapper>
      {isMoved&&<ArrowBackIosOutlined className="sliderarrow left" onClick={()=>handleMove("left")}/>}
         <Role  ref={listRef}>
            {current.role?.map(r=> <RoleItem key={r.depId} onClick={(e)=>getDataDep(r)} selected={r.depName===selected}>
                <span>
                {r.depName}
                </span>
             </RoleItem>)}
         </Role>
         <ArrowForwardIosOutlined className="sliderarrow right" onClick={()=>handleMove('right')}/>
      </Wrapper>
       
        <Middle size ={screenSize.dynamicWidth}>
           <Url>
             {url.map((u,index)=><UrlItem onClick={()=>handleUrl(u,index)}><span>/{u.depName}</span></UrlItem>)} 
          </Url>
          <Mange>
          <Tooltip title="Add Folder" aria-label="add">
            <Link to={`/folder/${url[url.length-1].depId}?level=${url[url.length-1].level}`}>
            <Folder1>
               <AddOutlined style={{color:"#ffab00"}}/>
                <Folder style={{color:"#ffab00"}}/>
              </Folder1>
            </Link>
            </Tooltip>
            <Tooltip title="Add Document" aria-label="add">
             <Link to={`/document/${url[url.length-1].depId}`}>
               <Folder1>
                  <AddOutlined style={{color:"#d32f2f"}}/>
                  <PictureAsPdfOutlined style={{color:"#d32f2f"}}/>
               </Folder1>
             </Link> 
             </Tooltip>
          </Mange>
        </Middle>
       <DataGrid
        rows={documents}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
      />
 </Container>
  <DocumentModel showModel={showModel} setShowModel={setShowModel} pdfData={pdfData}/>
  <VerifyModel showModel={varifyDelete} setShowModel={setVarifyDelate}
    handleDelete={handleDelete}/>  
  </>
  );
}
