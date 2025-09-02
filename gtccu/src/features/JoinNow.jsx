import { Routes, Route } from "react-router-dom";

import MakeEnquiryPage from "../components/sections/MakeEnquiryPage";
import OpenAccountPage from "../components/sections/OpenAccountPage";


export default function JoinNow() {
  return (
    <Routes>
      <Route index element={<JoinNowMain />} />
      <Route path="enquiry" element={<MakeEnquiryPage />} />
      <Route path="open" element={<OpenAccountPage />} />
      <Route path="savings" element={<JoinNowMain />} />
    
    </Routes>
  );
}