import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../services/axiosConfig";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  BookOpen,
  User,
  Edit2,
  Trash2,
  Bookmark,
  ChevronRight
} from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  category: string;
}

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(true);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const isLoggedIn = () => !!localStorage.getItem("token");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setUsername(user);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    api
      .get("/Books")
      .then((r) => {
        setBooks(r.data);
        setTimeout(() => setIsLoading(false), 300);
      })
      .catch(() => {
        alert("Error fetching books!");
        setIsLoading(false);
      });
  }, []);

  const filteredBooks = books.filter(
    (b) =>
      (b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())) &&
      (categoryFilter === "" || b.category === categoryFilter)
  );

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      api.delete(`/Books/${id}`).then(() => {
        setBooks((prev) => prev.filter((b) => b.id !== id));
      });
    }
  };

  const getCategoryColor = () => "bg-teal-100 text-teal-800";

  const categories = [
    "All Categories",
    "Fiction",
    "Non-Fiction",
    "Science",
    "Biography",
    "History",
    "Other",
  ];

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Position dropdown fixed under the button
  const dropdownTop =
    dropdownRef.current?.getBoundingClientRect().bottom || 0;
  const dropdownLeft =
    dropdownRef.current?.getBoundingClientRect().left || 0;
  const dropdownWidth =
    dropdownRef.current?.getBoundingClientRect().width || 256;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* ========================= HEADER ========================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl shadow-md">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                  Book Catalog
                </h1>
              </div>
              <p className="text-slate-600 text-lg">
                Explore and manage your library collection
              </p>
            </div>

            {isLoggedIn() && username && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-white/30"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Welcome back</p>
                  <p className="font-semibold text-slate-800">{username}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* ========================= STATS ========================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Total Books", value: books.length, icon: <BookOpen /> },
              { label: "Showing", value: filteredBooks.length, icon: <Filter /> },
              {
                label: "Categories",
                value: new Set(books.map((b) => b.category)).size,
                icon: <Bookmark />,
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-white/50 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-emerald-100 rounded-xl text-emerald-700">{stat.icon}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ========================= FILTERS ========================= */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-10">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50">
            <div className="flex flex-col lg:flex-row gap-6">

              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Search Books
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by title or author..."
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:border-teal-300 transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* CATEGORY DROPDOWN (GLOBAL & FIXED) */}
              <div className="lg:w-64 relative" ref={dropdownRef}>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Filter by Category
                </label>

                {/* Button */}
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full flex justify-between items-center pl-4 pr-4 py-3.5 bg-white border-2 border-teal-300 rounded-xl cursor-pointer shadow-sm focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 font-medium"
                >
                  {categoryFilter || "All Categories"}
                  <ChevronRight
                    className={`w-5 h-5 text-teal-600 transform transition-transform ${
                      showDropdown ? "rotate-180" : "rotate-90"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================= BOOK GRID ========================= */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/50 rounded-2xl p-6 shadow-lg border border-white/50 animate-pulse"></div>
              ))}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No books found</h3>
              <p className="text-slate-600">
                {search || categoryFilter
                  ? "Try adjusting your search or filter criteria"
                  : "Start by adding some books to your collection"}
              </p>
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-white/60 hover:border-teal-300 transition-all hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                          {book.title}
                        </h3>
                        <p className="text-slate-600 text-sm mt-1">by {book.author}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor()}`}>
                        {book.category}
                      </span>
                    </div>

                    <p className="text-slate-700 mb-6 line-clamp-3">
                      {book.description || "No description available"}
                    </p>

                    {isLoggedIn() && (
                      <div className="flex justify-end gap-2">
                        {/* Edit Button with sophisticated sliding hover effect */}
                        <Link to={`/edit/${book.id}`}>
                          <button className="relative px-4 py-2 bg-[#065F46] text-white rounded-xl overflow-hidden transition-all duration-300 shadow-md text-sm flex items-center gap-2 group/btn hover:shadow-lg">
                            <span className="relative z-10 flex items-center gap-2">
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </span>
                            {/* Elegant sliding background effect */}
                            <span className="absolute inset-0 w-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 transition-all duration-300 ease-out group-hover/btn:w-full"></span>
                            {/* Shine effect on hover */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                          </button>
                        </Link>

                        {/* Delete Button with sophisticated sliding hover effect */}
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="relative px-4 py-2 bg-[#b91c1c] text-white rounded-xl overflow-hidden transition-all duration-300 shadow-md text-sm flex items-center gap-2 group/btn hover:shadow-lg"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </span>
                          {/* Elegant sliding background effect */}
                          <span className="absolute inset-0 w-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 transition-all duration-300 ease-out group-hover/btn:w-full"></span>
                          {/* Shine effect on hover */}
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      {/* ========================= GLOBAL DROPDOWN (FIXED) ========================= */}
      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[9999] bg-white shadow-xl rounded-xl border border-teal-200 overflow-hidden"
            style={{
              top: dropdownTop,
              left: dropdownLeft,
              width: dropdownWidth,
            }}
          >
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => {
                  setCategoryFilter(cat === "All Categories" ? "" : cat);
                  setShowDropdown(false);
                }}
                className="px-4 py-3 text-slate-800 hover:bg-teal-50 cursor-pointer transition font-medium"
              >
                {cat}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BookList;