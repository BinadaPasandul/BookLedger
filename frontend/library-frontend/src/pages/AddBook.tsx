import { useState, useEffect } from "react";
import api from "../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

function AddBook() {
  const navigate = useNavigate();

  // Redirect user to login if not authenticated
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please login to add books!");
      navigate("/login");
    }
  }, [navigate]);

  // Form fields
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = { title, author, description, category };

    api.post("/Books", newBook)
      .then(() => {
        alert("Book added successfully!");
        navigate("/");
      })
      .catch(() => alert("Failed to add book. (Check login status)"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-teal-50 via-white to-emerald-50 relative">

      {/* Clean geometric background pattern */}
      <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/crossword.png')] opacity-10 pointer-events-none"></div>

      {/* Card Container */}
      <div className="relative w-full max-w-lg bg-white/80 backdrop-blur-md border border-white/50 shadow-2xl rounded-3xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 p-6 flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Add New Book
          </h2>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              placeholder="Book Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm 
              focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-400"
            />

            <input
              type="text"
              placeholder="Author"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm 
              focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-400"
            />

            <textarea
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm h-32 
              focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-400"
            />

            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm 
              focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-700"
            >
              <option value="">Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="Biography">Biography</option>
              <option value="History">History</option>
              <option value="Other">Other</option>
            </select>

            {/* Button */}
            <button
              type="submit"
              className="relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white 
              py-3 rounded-xl font-semibold overflow-hidden group shadow-md hover:shadow-xl 
              transition-all duration-300"
            >
              <span className="relative z-10">Add Book</span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 
              translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r 
              from-transparent via-white/10 to-transparent -translate-x-full 
              group-hover:translate-x-full transition-transform duration-700"></span>
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
