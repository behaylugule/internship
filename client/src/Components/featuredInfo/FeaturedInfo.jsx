import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useSelector } from "react-redux";
import axios from 'axios'
import { useEffect,useState } from "react";

export default function FeaturedInfo() {
  const currentUser = useSelector(state=>state.user.currentUser)
  const [stats,setStats] = useState({})
  useEffect(()=>{
  const getUserStats= async()=>{
     try {
       const res = await axios.get(`http://localhost:5000/api/folder/stats/${currentUser._id}`,{
         headers:{
           token:`Bearer ${localStorage.getItem("token")}`
         }
       })
        setStats(res.data)
     } catch (error) {
       console.log(error)
     }
  }
  getUserStats()
  },[])
 console.log(stats)
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total Document</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{stats?.document}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Folder</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{stats?.folder}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Department </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{currentUser.role.length}</span>
        </div>
      </div>
    </div>
  );
}
