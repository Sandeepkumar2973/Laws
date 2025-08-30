import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import FrontPage from "./Components/FrontPage/FrontPage";
import CreateJob from "./Components/adminlawvspage/jobpage/CreateJob.js";
import ManageJob from "./Components/adminlawvspage/jobpage/ManageJob.js";
import AllUsers from "./Components/adminlawvspage/AllUsers/AllUsers.js";
import Profile from "./Components/adminlawvspage/AdminProfile/Profile.js";
import UpdateJob from "./Components/adminlawvspage/jobpage/UpdateJob.js";
import UserApplications from "./Components/adminlawvspage/Application/Application.js";
import UserDetailPage from "./Components/adminlawvspage/AllUsers/UserDetailPage.js";
import AdminNotifications from "./Components/Navbar/Notification";
import Message from "./Components/adminlawvspage/Message/Message.js";
import SignupForm from "./Components/mootCourtpage/SignupForm";
import MootUserlogin from "./Components/mootCourtpage/MootUserLogin.js";
import UserDashboard from "./Components/mootCourtpage/UserDashboard";
import ProfileUpdate from "./Components/mootCourtpage/UserProfileUpdate";
import { TopStories } from "./Components/LawPages/TopStoryPage/TopStories";
import Library from "./Components/LawPages/Library/Library";
import { ExamPreparation } from "./Components/LawPages/ExamPreparation/ExamPreparation";
import { QAndA } from "./Components/LawPages/QueAndAns/AllQuestions.js";
import Opportunity from "./Components/LawPages/Opertunity/OpportunitySection.js";
import { LegalDraft } from "./Components/LawPages/LegalDraftPage/LegalDraft";
import ContactUs from "./Components/LawPages/ContactUs";
import UserAuthSignup from "./Components/UserPage/UserAuthSignup";
import UserAuthLogin from "./Components/UserPage/UserAuthLogin";
import AdminAuthLogin from "./Components/adminlawvspage/Adminlawvs/AdminLogin.js";
import AdminAuthForget from "./Components/adminlawvspage/Adminlawvs/Forget.js";
import AdminAuthRegister from "./Components/adminlawvspage/Adminlawvs/AdminRegister.js";
import ProtectedRoute from "./routes/ProtectedRoute";
import ForgotPassword from "./Components/mootCourtpage/ForgotPassword";
import SingleStory from "./Components/LawPages/TopStoryPage/SingleStory.js";
import SingleDraft from "./Components/LawPages/LegalDraftPage/SinglePageDraft.js";
import UserDashBoard from "./Components/UserPage/UserDashBoard.js";
import AdminHome from "./Components/adminlawvspage/AdminProfile/AdminHome.js";
import { AskQueForjudges } from "./Components/mootCourtpage/mootCourtPage/AskQueForjudges.js";
import InformationOfJudges from "./Components/mootCourtpage/mootCourtPage/InformationOfJudges.js";
import { AskQueForTeam } from "./Components/mootCourtpage/mootCourtPage/instructionpage/AskQueForTeam.js";
import { MootMap } from "./Components/mootCourtpage/mootCourtPage/instructionpage/MootMap.js";
import { MootProposition } from "./Components/mootCourtpage/mootCourtPage/instructionpage/MootProposition.js";
import { RegisterationForm } from "./Components/mootCourtpage/mootCourtPage/instructionpage/RegisterationForm.js";
import StepsToRegister from "./Components/mootCourtpage/mootCourtPage/instructionpage/StepsToRegister.js";
import { OrganizingCommittee } from "./Components/mootCourtpage/mootCourtPage/ORGANIZINGCOMMITTEE.js";
import RulesAndRegulation from "./Components/mootCourtpage/mootCourtPage/instructionpage/RulesAndRegulation.js";
import { BrochurePage } from "./Components/mootCourtpage/mootCourtPage/Brochure.js";
import VideosPage from "./Components/LawPages/Videos&News/VideosNews.js";
import UserResetPass from "./Components/UserPage/UserResetPass.js";
import AlljobsPage from "./Components/FrontPage/homepage/jobPage/AllJobsPage.js";
import { SingleJobPage } from "./Components/FrontPage/homepage/jobPage/SingleJobPage.js";
import AppliedJobPage from "./Components/UserPage/UserDtailsPage/AppliedJobPage.js";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <>
              <Route path="/" element={<FrontPage />} />
              <Route path="/update-job/:id" element={<UpdateJob />} />
              <Route path="/all-application" element={<UserApplications />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/create-job" element={<CreateJob />} />
              <Route path="/manage-job" element={<ManageJob />} />
              <Route path="/admin-profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/user-details/:id" element={<UserDetailPage />} />
              <Route
                path="/admin-notifications"
                element={<AdminNotifications />}
              />
            </>
            <Route path="/get-all-jobs" element={<AlljobsPage />} />
            <Route
              path="/get-single-job/details/:id"
              element={<SingleJobPage />}
            />
            {/* // header routes Pages */}
            <Route path="/legal-draft" element={<LegalDraft />} />
            <Route path="/drafts/:slug" element={<SingleDraft />} />
            <Route path="/top-stories" element={<TopStories />} />
            <Route path="/stories/:id" element={<SingleStory />} />
            <Route path="/library" element={<Library />} />
            <Route path="/videos-news" element={<VideosPage />} />

            <Route path="/exam-preparation" element={<ExamPreparation />} />
            <Route path="/q-and-a" element={<QAndA />} />
            <Route path="/opportunity" element={<Opportunity />} />
            {/* ............... moot court pages............. */}
            <Route
              path="/organiging_committee"
              element={<OrganizingCommittee />}
            />
            <Route path="/askque_for_judges" element={<AskQueForjudges />} />
            <Route
              path="/information_for_Judges"
              element={<InformationOfJudges />}
            />
            <Route
              path="/rulesAnd_regulation"
              element={<RulesAndRegulation />}
            />
            <Route path="/brochure_&_praposition" element={<BrochurePage />} />
            <Route path="/ask_que_for_team" element={<AskQueForTeam />} />
            <Route path="/moot_map" element={<MootMap />} />
            <Route path="/moot_proposition" element={<MootProposition />} />
            <Route
              path="/registrationfor_form"
              element={<RegisterationForm />}
            />
            <Route path="/steps_to_register" element={<StepsToRegister />} />
            {/* JobSeeker user routes          */}
            <Route path="/user-auth-signup" element={<UserAuthSignup />} />
            <Route path="/user-auth-login" element={<UserAuthLogin />} />
            <Route path="/user-auth-forget" element={<UserResetPass />} />
            <Route
              path="/user-auth-dashboard"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <UserDashBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-applied-jobs"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <AppliedJobPage />
                </ProtectedRoute>
              }
            />

            {/* Admin  routes */}
            <Route path="/admin-auth-login" element={<AdminAuthLogin />} />
            <Route path="/admin-auth-forget" element={<AdminAuthForget />} />
            <Route
              path="/admin-auth-register"
              element={<AdminAuthRegister />}
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminHome />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes  by mootusers */}
            <Route path="/moot-user-login" element={<MootUserlogin />} />
            <Route path="/moot-user-signup" element={<SignupForm />} />
            <Route path="/moot-user-forget" element={<ForgotPassword />} />
            <Route
              path="/moot-user-profile-update"
              element={<ProfileUpdate />}
            />
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
