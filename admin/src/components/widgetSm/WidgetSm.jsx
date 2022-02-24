import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import {useState,useEffect} from 'react'
import {userMethod} from '../../requiestMethod'

export default function WidgetSm() {
  const [users, setUsers] = useState([])
  useEffect(()=>{
   
  },[])

  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map(user=>(
            
        <li className="widgetSmListItem" key={user._id}>
        <img
          src={user?.img||"https://image.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg"}
          alt=""
          className="widgetSmImg"
        />
        <div className="widgetSmUser">
          <span className="widgetSmUsername">{user.username}</span>
        </div>
        <button className="widgetSmButton">
          <Visibility className="widgetSmIcon" />
          Display
        </button>
      </li>
        ))}      </ul>
    </div>
  );
}
