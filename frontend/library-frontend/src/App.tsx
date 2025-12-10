import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); // detect page to disable buttons

  // Check login state when app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");

    if (token && user) {
      setLoggedIn(true);
      setUsername(user);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  return (
    <>
      {/* ========================= NAVBAR ========================= */}
      <nav className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 shadow-2xl px-8 py-5 relative z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* ---- Logo + Title ---- */}
          <Link to="/" className="flex items-center gap-3 group">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Book Ledger
              </h1>
              <p className="text-xs text-emerald-300 font-medium">
                Library Management System
              </p>
            </div>
          </Link>

          {/* ---- Navigation Links ---- */}
          <div className="flex items-center gap-8">

            {/* Book Catalog Link */}
            <Link
              to="/"
              className="text-slate-200 hover:text-white font-medium transition-colors duration-300 relative group"
            >
              <span className="flex items-center gap-2">Book Catalog</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* 🌿 Add Book (Minimal underline style) */}
            {loggedIn && (
              <Link
                to="/add"
                className="text-slate-200 hover:text-white font-medium transition-colors duration-300 relative group"
              >
                <span className="flex items-center gap-2">Add New Book</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            )}

            {/* ✨ User Badge */}
            {loggedIn && (
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/20 hover:border-emerald-400/40 hover:bg-white/15 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className="text-emerald-200 font-semibold text-sm tracking-wide capitalize">
                  {username}
                </span>
              </div>
            )}

            {/* Sign In & Register Buttons */}
            {!loggedIn && (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className={`text-slate-200 font-medium px-4 py-2.5 rounded-xl border border-white/20 
                  transition-all duration-300 
                  ${location.pathname === "/login"
                    ? "opacity-50 pointer-events-none"
                    : "hover:bg-white/10 hover:text-white"}`}
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className={`font-medium px-5 py-2.5 rounded-xl 
                  transition-all duration-300 shadow-lg
                  ${location.pathname === "/register"
                    ? "bg-slate-200 text-slate-600 opacity-50 pointer-events-none"
                    : "bg-white text-slate-900 hover:bg-slate-100 hover:shadow-xl hover:-translate-y-0.5"}`}
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Logout Button */}
            {loggedIn && (
              <button
                onClick={handleLogout}
                className="relative px-4 py-2.5 rounded-xl font-medium overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300 text-white bg-gradient-to-r from-emerald-600 to-teal-600"
              >
                <span className="relative z-10">Logout</span>
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ========================= MAIN CONTENT + ROUTES ========================= */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
            <Route path="/login" element={<Login onLogin={(u) => { setLoggedIn(true); setUsername(u); }} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>

      {/* ========================= FOOTER ========================= */}
      <footer className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 text-white py-8 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold">Book Ledger</h2>
          <p className="text-slate-400 mt-2">Library Management System</p>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>© {new Date().getFullYear()} Created by Binada. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
