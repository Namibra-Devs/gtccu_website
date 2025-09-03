import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@features/LandingPage";
import JoinNow from "@features/JoinNow";
import Services from "@features/Services";
import AboutUs from "@features/AboutUs";
import Contact from "@features/Contact";
import Reports from "@features/Reports";
import News from "@features/News";
import Jobs from "@features/Jobs";
import Policies from "@features/Policies";
import Layout from "@components/layout/Layout";
import MakeEnquiryPage from "@sections/MakeEnquiryPage";
import OpenAccountPage from "@sections/OpenAccountPage";
import LoansPage from "../components/sections/LoansPage";
import InvestmentsPage from "../components/sections/InvestmentsPage";
import SharesPage from "../components/sections/SharesPage";
import WhoWeArePage from "../components/sections/WhoWeArePage";
import OurTeamPage from "../components/sections/OurTeamPage";
import OurBoardPage from "../components/sections/OurBoardPage";
import ByeLawsPage from "../components/sections/ByeLawsPage";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/join/*" element={<JoinNow />} />
          <Route path="/services/*" element={<Services />} />
          <Route path="/about/*" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/news" element={<News />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/join/enquiry" element={<MakeEnquiryPage />} />
          <Route path="/join/open" element={<OpenAccountPage />} />
          <Route path="/services/loans" element={<LoansPage />} />
          <Route path="/services/investments" element={<InvestmentsPage />} />
          <Route path="/services/shares" element={<SharesPage />} />
          <Route path="/about/who-we-are" element={<WhoWeArePage />} />
          <Route path="/about/team" element={<OurTeamPage />} />
          <Route path="/about/board" element={<OurBoardPage />} />
          <Route path="/about/byelaws" element={<ByeLawsPage />} />
          <Route path="/about/board" element={<OurBoardPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
