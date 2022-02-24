import { useState } from "react";
import "./Createdocument.css";
import { useDispatch ,useSelector} from "react-redux";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import app from "../../firebase";
import {createDocument} from '../../redux/apiCall' 
import { useHistory,useLocation } from "react-router-dom";
export default function CreateDocument() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [percent,setPercent] = useState(0)
  const history = useHistory()
  const location = useLocation()
  const parent = location.pathname.split('/')[2]
  const dispatch = useDispatch();
  const current = useSelector(state=>state.user.currentUser)
  const handleChange = (e) => {   
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
     let data = []
     
  if(current.level === "president"){
     data = ["president","vice-president","college-head","head","member"]
  }else if(current.level ==="vice-president"){
    data = ["vice-president","college-head","head","member"]
  }else if(current.level ==="college-head"){
    data = ["college-head","head","member"]
  }else if (current.level === "head"){
    data = ["head","member"]
  }else if(current.level ==="member"){
    data = ["member"]
  }
    

     
  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
       const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercent(progress)
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {        
        console.log(error)
      },
      () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const document = { ...inputs, documentUrl: downloadURL,userId:current._id,parent:parent };
           createDocument(dispatch,document,history)
        });
      }
    );
  };

   
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Document</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="documentName"
            type="text"
            placeholder="letter"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="description"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
           <div className="addProductItem">
             <label>Permision</label>
             <select name="level" onChange={handleChange}>
               <option>Select</option>
               {data?.map(i=><option>{i}</option>)}
             </select>
        </div>
        </div>
        <div className="addProductItem">
          <label>File</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
       
        <button onClick={handleClick} className="addProductButton" disabled={percent!==0}>
          {percent===0&& "Create"} 
          {percent !==0&&`${percent.toFixed(0)} % uploaded.`}
        </button>
      </form>
    </div>
  );
}