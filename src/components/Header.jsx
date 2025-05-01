import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-50 shadow-sm h-16 flex items-center px-6">
      <div className="flex-1">
        <img src="/logo.jpg" alt="Neokred" className="h-15" /> 
      </div>
      <NavLink
        to="/login"
        className="px-4 py-1 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50"
      >
        Login
      </NavLink>
    </header>
  );
}
