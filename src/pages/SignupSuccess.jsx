import { Link } from "react-router-dom";
import FooterNote from "../components/FooterNote";

export default function SignupSuccess() {
  return (
    <div className="text-center  space-y-8">
      <h1 className="text-8xl font-bold text-gray-300">Thank you</h1>
      <p className="text-lg text-gray-700">Your sign up is successful</p>
      <Link to="/dashboard" className="text-blue-600 underline">
        Let’s Explore
      </Link>
      <FooterNote />
    </div>
  );
}
