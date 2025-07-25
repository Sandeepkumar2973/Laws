import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Adimpage/Auth/AdminLogin";
import Forget from "./Components/Adimpage/Auth/Forget";
import Register from "./Components/Adimpage/Auth/AdminRegister";
import FrontPage from "./Components/FrontPage/FrontPage";
import CreateCourse from "./Components/jobpage/CreateJob";
import ManageCourse from "./Components/jobpage/ManageJob";
import AllUsers from "./Components/AllUsers/AllUsers";
// import Contact from "./Components/AllContactData/Contact";
import Profile from "./Components/AdminProfile/Profile";
import UpdateJob from "./Components/jobpage/UpdateJob";
import UserApplications from "./Components/Application/Application";
import UserDetailPage from "./Components/AllUsers/UserDetailPage";
import AdminNotifications from "./Components/Navbar/Notification";
import Message from "./Components/Message/Message";
import SignupForm from "./Components/mootCourtpage/SignupForm";
import Userlogin from "./Components/mootCourtpage/UserLogin";
import UserDashboard from "./Components/mootCourtpage/UserDashboard";
import ProfileUpdate from "./Components/mootCourtpage/UserProfileUpdate";
import { TopStories } from "./Components/LawPages/TopStoryPage/TopStories";
import { Library } from "./Components/LawPages/Library";
import { ExamPreparation } from "./Components/LawPages/ExamPreparation";
import { QAndA } from "./Components/LawPages/QAndA";
import { Opportunity } from "./Components/LawPages/Opportunity";
import { LegalDraft } from "./Components/LawPages/LegalDraftPage/LegalDraft";
import ContactUs from "./Components/LawPages/ContactUs";
import UserAuthSignup from "./Components/UserPage/UserAuthSignup";
import UserAuthLogin from "./Components/UserPage/UserAuthLogin";
import AdminAuthLogin from "./Components/Adimpage/Auth/AdminLogin";
import AdminAuthForget from "./Components/Adimpage/Auth/Forget";
import AdminAuthRegister from "./Components/Adimpage/Auth/AdminRegister";
import { UserAuthForgetPass } from "./Components/UserPage/UserAuthFogetPass";

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
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/user-profile-update" element={<ProfileUpdate />} />
              <Route path="/update-job/:id" element={<UpdateJob />} />
              <Route path="/all-application" element={<UserApplications />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/create-job" element={<CreateCourse />} />
              <Route path="/message" element={<Message />} />
              {/* <Route path="/live-class" element={<Liveclass />} /> */}
              <Route path="/manage-job" element={<ManageCourse />} />
              <Route path="/admin-profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/user-details/:id" element={<UserDetailPage />} />
              <Route
                path="/admin-notifications"
                element={<AdminNotifications />}
              />
            </>
            {/* // ) : ( */}
            <>
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/user-login" element={<Userlogin />} />
              <Route path="/forget" element={<Forget />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
            {/* // )} */}
            {/* // header routes Pages */}
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/legal-draft" element={<LegalDraft />} />
            <Route path="/top-stories" element={<TopStories />} />
            <Route path="/library" element={<Library />} />
            <Route path="/exam-preparation" element={<ExamPreparation />} />
            <Route path="/q-and-a" element={<QAndA />} />
            <Route path="/opportunity" element={<Opportunity />} />
            {/* JobSeeker user routes          */}
            <Route path="/user-auth-signup" element={<UserAuthSignup />} />
            <Route path="/user-auth-login" element={<UserAuthLogin />} />
            <Route path="/user-auth-forget" element={<UserAuthForgetPass />} />
            {/* Admin  routes */}
            <Route path="/admin-auth-login" element={<AdminAuthLogin />} />
            <Route path="/admin-auth-forget" element={<AdminAuthForget />} />
            <Route
              path="/admin-auth-register"
              element={<AdminAuthRegister />}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
