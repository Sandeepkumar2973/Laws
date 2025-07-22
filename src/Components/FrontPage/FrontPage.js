
import Footer from "../Navbar/Footer";
import Header from "../Navbar/Header";
import AuthorSlider from "./AuthorSlider";
import BannerPage from "./LegalBanner";
import CareerHighlight from "./CareerHighlight";
import Internship from "./Internship";
import InternshipBanner from "./InternshipBanner";
import JoinRevolutionSection from "./JoinRevolutionSection";
import LatestJob from "./LatestJob";
import LibraryWebinarPage from "./LibraryWebinarPage";
import Opportunities from "./Opportunities";
import StudentCard from "./StudentCard";
import TestimonialPage from "./TestimonialCard";
import TopArticles from "./TopArticles";
import TopCompanies from "./TopCompanies";
import TopStories from "./TopStories";
import LegalBanner from "./LegalBanner";


const FrontPage = () => {
 
  
  return (
    <>
      <Header />
      <LegalBanner/>
      <AuthorSlider />
      <LatestJob />
      <Internship />
      <InternshipBanner />
      <TopStories />
      <TopArticles />
      <Opportunities />
      <TopCompanies />
      <CareerHighlight />
      {/* <StudentCard /> */}
      <JoinRevolutionSection/>
      <TestimonialPage/>
      <LibraryWebinarPage/>
      <Footer/>
      
    </>
  );
};

export default FrontPage;
