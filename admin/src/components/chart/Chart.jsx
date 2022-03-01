import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from 'axios'
import {useState,useEffect,useMemo} from 'react'
export default function Chart({ title, data, dataKey, grid }) {

  const MONTH = useMemo(()=>[
    "Jun",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "sep",
    "Ocu",
    "Nov",
    "Dec"
  ],[])
  const [stats,setStats] = useState([])
  useEffect(()=>{
  const getUserStats= async()=>{
     try {
       const res = await axios.get('https://aastudms.herokuapp.com/api/users/stats',{
         headers:{
           token:`Bearer ${localStorage.getItem("token")}`
         }
       })
       res.data.map(item=>{
        setStats(prev=>[...prev,{name:MONTH[item._id-1],"Active User":item.total}])
       })
      
     } catch (error) {
       
     }
  }
  getUserStats()
  },[MONTH])

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={stats}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
