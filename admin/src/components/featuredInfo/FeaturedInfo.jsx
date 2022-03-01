import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function FeaturedInfo({users,departments,unvarifyUser}) {
  return (
    <div className="featured">
      <Link to="/users" className="link">
        <div className="featuredItem" style={{backgroundColor:"#1b7400"}}>
          <span className="featuredTitle">Total User</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">{users.length}</span>
          </div>
        </div>
      </Link>
      <Link to="/varify" className="link">
      <div className="featuredItem" style={{backgroundColor:"#fb4700"}}>
        <span className="featuredTitle">Unvarify User</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{unvarifyUser.length}</span>
        </div>
      </div>
      </Link>
      <Link to="/departments" className="link">
      <div className="featuredItem" style={{backgroundColor:"#00aeff"}}>
        <span className="featuredTitle">Total Department</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{departments.length}</span>
        </div>
      </div>
      </Link>
      
    </div>
  );
}
