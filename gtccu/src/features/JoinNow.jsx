import { Link } from "react-router-dom";

export default function JoinNow() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Join GTCCU</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li><Link to="savings" className="text-blue-600 hover:underline">Savings Account</Link></li>
        <li><Link to="loans" className="text-blue-600 hover:underline">Loan Application</Link></li>
        <li><Link to="membership" className="text-blue-600 hover:underline">Membership Info</Link></li>
      </ul>
    </div>
  );
}
