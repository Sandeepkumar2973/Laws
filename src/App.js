import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Auth/Login";
import Forget from "./Components/Auth/Forget";
import Register from "./Components/Auth/Register";
import FrontPage from "./Components/FrontPage/FrontPage";
import CreateCourse from "./Components/jobpage/CreateJob";
import ManageCourse from "./Components/jobpage/ManageJob";
import AllUsers from "./Components/AllUsers/AllUsers";
import Contact from "./Components/AllContactData/Contact";
import Profile from "./Components/AdminProfile/Profile";
import UpdateJob from "./Components/jobpage/UpdateJob";
import UserApplications from "./Components/Application/Application";
import UserDetailPage from "./Components/AllUsers/UserDetailPage";
import AdminNotifications from "./Components/Navbar/Notification";
import Message from "./Components/Message/Message";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const AdminjobInfo = sessionStorage.getItem("AdminjobInfo");
  //   if (AdminjobInfo) {
  //     const parsedUserInfo = JSON.parse(AdminjobInfo);
  //     if (parsedUserInfo.data.token) {
  //       setIsAuthenticated(true);
  //     } else {
  //       setIsAuthenticated(false);

  //     }
  //   } else {
  //     setIsAuthenticated(false);

  //   }
  // }, []);

  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            
            {/* // isAuthenticated ? ( */}
              <>
                <Route path="/" element={<FrontPage />} />
                <Route path="/update-job/:id" element={<UpdateJob />} />
                <Route path="/all-application" element={<UserApplications />} />
                <Route path="/all-users" element={<AllUsers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/create-job" element={<CreateCourse />} />
                <Route path="/message" element={<Message />} />
                {/* <Route path="/live-class" element={<Liveclass />} /> */}
                <Route path="/manage-job" element={<ManageCourse />} />
                <Route path="/admin-profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/user-details/:id" element={<UserDetailPage />} />
                <Route path="/admin-notifications" element={<AdminNotifications />} />
              </>
            {/* // ) : ( */}
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/forget" element={<Forget />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            {/* // )} */}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
