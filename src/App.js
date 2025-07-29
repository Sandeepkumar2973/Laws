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
import MootUserlogin from "./Components/mootCourtpage/UserLogin";
import UserDashboard from "./Components/mootCourtpage/UserDashboard";
import ProfileUpdate from "./Components/mootCourtpage/UserProfileUpdate";
import { TopStories } from "./Components/LawPages/TopStoryPage/TopStories";
import  Library  from "./Components/LawPages/Library/Library";
import { ExamPreparation } from "./Components/LawPages/ExamPreparation/ExamPreparation";
import { QAndA } from "./Components/LawPages/QueAndAns/AllQuestions.js";
import  Opportunity  from "./Components/LawPages/Opertunity/OpportunitySection.js";
import { LegalDraft } from "./Components/LawPages/LegalDraftPage/LegalDraft";
import ContactUs from "./Components/LawPages/ContactUs";
import UserAuthSignup from "./Components/UserPage/UserAuthSignup";
import UserAuthLogin from "./Components/UserPage/UserAuthLogin";
import AdminAuthLogin from "./Components/Adimpage/Auth/AdminLogin";
import AdminAuthForget from "./Components/Adimpage/Auth/Forget";
import AdminAuthRegister from "./Components/Adimpage/Auth/AdminRegister";
import { UserAuthForgetPass } from "./Components/UserPage/UserAuthFogetPass";
import ProtectedRoute from "./routes/ProtectedRoute";
import MultiSpeakerForm from "./Components/mootCourtpage/MultiSpeakerForm";
import ForgotPassword from "./Components/mootCourtpage/ForgotPassword";
import SingleStory from "./Components/LawPages/TopStoryPage/SingleStory.js";
import SingleDraft from "./Components/LawPages/LegalDraftPage/SinglePageDraft.js";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const userInfo = localStorage.getItem("MootUserInfo");
  //   console.log(userInfo, "userInfo");
  //   if (userInfo) {
  //     const parsedUserInfo = JSON.parse(userInfo);
  //     if (parsedUserInfo.token) {
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
              <Route path="/moot-user-signup" element={<SignupForm />} />
              {/* <Route path="/moot-MultiSpeakerForm" element={<MultiSpeakerForm />} /> */}
              <Route
                path="/moot-user-profile-update"
                element={<ProfileUpdate />}
              />
              <Route path="/update-job/:id" element={<UpdateJob />} />
              <Route path="/all-application" element={<UserApplications />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/create-job" element={<CreateCourse />} />
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
              <Route path="/moot-user-login" element={<MootUserlogin />} />
              <Route path="/moot-user-forget" element={<ForgotPassword />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
            {/* // )} */}
            {/* // header routes Pages */}
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/legal-draft" element={<LegalDraft />} />
            <Route path="/drafts/:id" element={<SingleDraft />} />

            <Route path="/top-stories" element={<TopStories />} />
            <Route path="/stories/:id" element={<SingleStory />} />
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
            {/* Protected Routes  by mootusers */}
            <Route
              path="/moot-user-dashboard"
              element={
                <ProtectedRoute allowedRoles={["mootUser"]}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
