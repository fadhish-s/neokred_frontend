import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import SignupFlow from "./pages/SignupFlow";
import SignupSuccess from "./pages/SignupSuccess";

export default function App() {
  return (
     <div className="flex flex-col h-screen w-full">
    <BrowserRouter>
      <Header />
      <div className="w-full h-screen  bg-gray-50 flex items-center justify-center px-4">
        <Routes>
          <Route index element={<Navigate to="/signup/1" replace />} />
          <Route path="/signup/:step" element={<SignupFlow />} />
          <Route path="/signup/success" element={<SignupSuccess />} />
          <Route path="*" element={<Navigate to="/signup/1" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
      </div>
  );
}
