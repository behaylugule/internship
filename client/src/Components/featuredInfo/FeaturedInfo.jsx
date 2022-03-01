import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useSelector } from "react-redux";
import axios from 'axios'
import { useEffect,useState } from "react";
import Paper from "@material-ui/core/Paper"
import { Palette } from '@devexpress/dx-react-chart';
import {
  Chart,
  PieSeries,
  Legend,
  Title
} from '@devexpress/dx-react-chart-material-ui';
import Teammate from '../Teammate/Teammate'
import {Link} from 'react-router-dom'
export default function FeaturedInfo() {
  const currentUser = useSelector(state=>state.user.currentUser)
  const [stats,setStats] = useState({})
  useEffect(()=>{
  const getUserStats= async()=>{
     try {
       const res = await axios.get(`https://aastudms.herokuapp.com/api/folder/stats/${currentUser._id}`,{
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
const data = [
  {name:"document",value:stats?.document||0},
  {name:"folder",value:stats?.folder||0},
  {name:"department",value:currentUser?.role?.length}
] 
  return (
    <>
    <div className="featured">
      <Link to="/documents" className="link">
      <div className="featuredItem" style={{backgroundColor:"#fb2929"}}>
        <span className="featuredTitle">Total Document</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{stats?.document}</span>
        </div>
      </div>
      </Link>
      
      <Link to="/documents" className="link">
      <div className="featuredItem" style={{backgroundColor:"#ffd13b"}}>
        <span className="featuredTitle">Total Folder</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{stats?.folder}</span>
        </div>
      </div>
      </Link>
      
      <Link to="/documents" className="link">
      <div className="featuredItem" style={{backgroundColor:"#00aeff"}}>
        <span className="featuredTitle">Total Department </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{currentUser.role.length}</span>
        </div>
      </div>
      </Link>
    </div>
    <div className="chart_user">
    <Paper style={{flex:0.65}}>
        <Chart
          data={data}
        >
           <Palette scheme={['#fb2929', '#ffd13b', '#00aeff']} />
          <PieSeries
            valueField="value"
            argumentField="name"
          />
           <Legend />
        </Chart>
      </Paper>
      <div className="team_mate">
        <Teammate/>
      </div>
    </div>
    </>
  );
}
