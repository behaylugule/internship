import "./widgetLg.css";
import {useState,useEffect} from 'react'
import {userMethod} from '../../requiestMethod'
import {format} from 'timeago.js'
export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  const [order, setOrder] = useState([])
  useEffect(()=>{
    
  },[])

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {order.map(o=>(
           <tr className="widgetLgTr" key={o._id}>
           <td className="widgetLgUser">
             <span className="widgetLgName">${o.userId}</span>
           </td>
           <td className="widgetLgDate">{format(o.createdAt)}</td>
           <td className="widgetLgAmount">{o.amount}</td>
           <td className="widgetLgStatus">
             <Button type={o.status} />
           </td>
         </tr>
        ))}
        
      </table>
    </div>
  );
}
