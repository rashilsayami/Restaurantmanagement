import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Auth, Orders, Inventory, Report, Tables, Menu } from "./pages";
import Header from "./components/shared/Header";

function App() {
  return (
    <div className="min-h-screen bg-[#1f1f1f]">
      <Router>
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/report" element={<Report />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="*" element={<div className="text-white text-center p-8">Page Not Found</div>} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
