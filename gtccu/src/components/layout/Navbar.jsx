import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">GTCCU</Link>
      <ul className="hidden md:flex gap-6">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/join">Join Now</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/policies">Policies</Link></li>
      </ul>
      <button className="md:hidden"><Menu /></button>
    </nav>
  );
}
