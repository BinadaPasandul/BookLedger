import { useEffect, useState } from "react";
import api from "../services/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, User, FileText, Tag, ArrowLeft, Save } from "lucide-react";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please login to edit books!");
      navigate("/login");
    }
  }, [navigate]);

  // Form states
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load current book data
  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    api.get(`/Books/${id}`, {
      headers: { Authorization: `Bearer ${token}` }, // 🔥 FIX: include token
    })
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setDescription(res.data.description);
        setCategory(res.data.category);
      })
      .catch(() => alert("Failed to load book details!"))
      .finally(() => {
        setTimeout(() => setIsLoading(false), 400);
      });
  }, [id]);

  // Submit edited data
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedBook = { id, title, author, description, category };
    const token = localStorage.getItem("token");

    api.put(`/Books/${id}`, updatedBook, {
      headers: { Authorization: `Bearer ${token}` }, // 🔥 FIX: include token
    })
      .then(() => {
        alert("Book updated successfully!");
        navigate("/books"); // 🔥 FIX: go to catalog
      })
      .catch(() => alert("Failed to update book!"))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg"
      >
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-900 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400"></div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="inline-block p-3 bg-white/10 rounded-xl backdrop-blur-sm mb-4"
            >
              <BookOpen className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-1">Edit Book Details</h2>
            <p className="text-emerald-200/80 text-sm">Update your book information</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {isLoading ? (
              <div className="space-y-5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-14 bg-slate-100 rounded-xl animate-pulse"></div>
                ))}
                <div className="h-12 bg-slate-100 rounded-xl animate-pulse"></div>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-5">

                {/* Back Button */}
                <motion.button
                  type="button"
                  onClick={() => navigate("/books")}
                  className="mb-4 flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium group transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Catalog
                </motion.button>

                {/* Title */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Book Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 pl-12 py-3.5 bg-white border border-slate-200 rounded-xl
                    focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-400
                    shadow-sm"
                    disabled={isSubmitting}
                  />
                </motion.div>

                {/* Author */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Author
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 pl-12 py-3.5 bg-white border border-slate-200 rounded-xl
                    focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-400
                    shadow-sm"
                    disabled={isSubmitting}
                  />
                </motion.div>

                {/* Description */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Description
                  </label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 pl-12 py-3.5 bg-white border border-slate-200 rounded-xl
                    focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-400
                    shadow-sm h-32 resize-none"
                    disabled={isSubmitting}
                  />
                </motion.div>

                {/* Category */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Category
                  </label>
                  <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 pl-12 py-3.5 bg-white border border-slate-200 rounded-xl
                    focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
                    disabled={isSubmitting}
                  >
                    <option value="">Select Category</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Science">Science</option>
                    <option value="Biography">Biography</option>
                    <option value="History">History</option>
                    <option value="Other">Other</option>
                  </select>
                </motion.div>

                {/* Update Button */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5
                    rounded-xl font-semibold overflow-hidden group shadow-lg hover:shadow-xl transition-all
                    duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Update Book
                        </>
                      )}
                    </span>
                  </button>
                </motion.div>

                {/* Cancel Button */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <button
                    type="button"
                    onClick={() => navigate("/books")}
                    className="w-full border border-slate-300 text-slate-700 py-3.5 rounded-xl font-medium 
                    hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm hover:shadow-md"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </motion.div>
              </form>
            )}
          </div>
        </div>

        {/* Footer Text */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} className="text-center text-slate-500 text-sm mt-6">
          Make changes and save to update your book record
        </motion.p>
      </motion.div>
    </div>
  );
}

export default EditBook;
