import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<h1>TACO App - Frontend</h1>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
