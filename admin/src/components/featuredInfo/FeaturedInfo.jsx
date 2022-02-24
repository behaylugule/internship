import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo({users,departments,unvarifyUser}) {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total User</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{users.length}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Unvarify User</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{unvarifyUser.length}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Department</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{departments.length}</span>
        </div>
      </div>
    </div>
  );
}
