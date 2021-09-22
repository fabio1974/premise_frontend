import {Route} from "react-router-dom";
import SideBar from "./sideBar";
import Users from "../pages/users";
import Posts from "../pages/posts";


const DashBoard = ({match}) => {

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <SideBar/>

            <Route path="/admin/users" component={Users}/>
            <Route path="/admin/posts" component={Posts}/>

        </div>
    )

}

export default DashBoard
