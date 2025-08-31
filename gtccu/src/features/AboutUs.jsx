import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">About GTCCU</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li><Link to="history" className="text-blue-600 hover:underline">Our History</Link></li>
        <li><Link to="mission" className="text-blue-600 hover:underline">Mission & Vision</Link></li>
        <li><Link to="leadership" className="text-blue-600 hover:underline">Leadership</Link></li>
      </ul>
    </div>
  );
}
