import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import { useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {getUsers,getDepartments,getNotification} from '../../redux/apiCall'


export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
     getUsers(dispatch)
  }, [dispatch])
  useEffect(() => {
    getDepartments(dispatch)
 }, [dispatch])
 useEffect(() => {
  getNotification(dispatch)
}, [dispatch])
  const users = useSelector(state=>state.users.users)
  const departments =useSelector(state=>state.departments.departments)
  const unvarifyUser = useSelector(state=>state.varifyUsers.varifyUsers)
  return (
    <div className="home">
       <FeaturedInfo users={users}
        departments={departments} unvarifyUser={unvarifyUser} />
       <Chart data={users} title="User Analytics" grid dataKey="Active User"/>
    </div>
  );
}
