import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Owners from "./pages/Owner";
import Students from "./pages/Student";
import './index.css';
import OwnerProperties from "./pages/Properties";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/admin/owners" element={<Owners />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/properties" element={<OwnerProperties />} />

      </Routes>
    </Router>
  );
}

export default App;
