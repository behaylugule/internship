import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import FeaturedInfo from "../../Components/featuredInfo/FeaturedInfo"
const Home = () => {
    const user = useSelector(state=>state.user.currentUser)
    return (
        <div>
             {!user.isVarify && <Redirect to="/unvarify"/>}
             <FeaturedInfo />
        </div>
    )
}

export default Home
