import { useEffect, useState } from "react";
import api from "../services/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, User, FileText, Tag, ArrowLeft, Save } from "lucide-react";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Redirect unauthenticated users to login page
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please login to edit books!");
      navigate("/login");
    }
  }, [navigate]);

  // Form state for book details
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing book details when page opens
  useEffect(() => {
    setIsLoading(true);
    api.get(`/Books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setDescription(response.data.description);
        setCategory(response.data.category);
      })
      .catch(() => alert("Failed to load book details!"))
      .finally(() => {
        setTimeout(() => setIsLoading(false), 300);
      });
  }, [id]);

  // Submit edited book data
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedBook = { id, title, author, description, category };

    api
      .put(`/Books/${id}`, updatedBook)
      .then(() => {
        alert("Book updated successfully!");
        setTimeout(() => navigate("/"), 500);
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
        {/* Container Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-shadow duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-900 p-8 text-center relative overflow-hidden">
            {/* Animated Top Border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400"></div>
            
            {/* Icon */}
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
                {/* Back to Catalog Button */}
                <motion.button
                  type="button"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                  onClick={() => navigate("/")}
                  className="mb-4 flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium group transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Catalog
                </motion.button>

                {/* Title Input */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="group"
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Book Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter book title"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 pl-12 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-400 shadow-sm hover:border-emerald-300 transition-all group-hover:shadow-md disabled:bg-slate-50"
                      disabled={isSubmitting}
                    />
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:via-emerald-500/5 group-hover:to-emerald-500/0 transition-all -z-10"></div>
                  </div>
                </motion.div>

                {/* Author Input */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="group"
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Author
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter author name"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-4 pl-12 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-400 shadow-sm hover:border-emerald-300 transition-all group-hover:shadow-md disabled:bg-slate-50"
                      disabled={isSubmitting}
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:via-emerald-500/5 group-hover:to-emerald-500/0 transition-all -z-10"></div>
                  </div>
                </motion.div>

                {/* Description Textarea */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="group"
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Description
                  </label>
                  <div className="relative">
                    <textarea
                      placeholder="Enter book description"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 pl-12 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-400 shadow-sm hover:border-emerald-300 transition-all group-hover:shadow-md h-32 resize-none disabled:bg-slate-50"
                      disabled={isSubmitting}
                    />
                    <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:via-emerald-500/5 group-hover:to-emerald-500/0 transition-all -z-10"></div>
                  </div>
                </motion.div>

                {/* Category Select */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="group"
                >
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Category
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 pl-12 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm hover:border-emerald-300 transition-all group-hover:shadow-md appearance-none disabled:bg-slate-50"
                      disabled={isSubmitting}
                    >
                      <option value="" className="text-slate-400">Select Category</option>
                      <option value="Fiction" className="text-slate-700">Fiction</option>
                      <option value="Non-Fiction" className="text-slate-700">Non-Fiction</option>
                      <option value="Science" className="text-slate-700">Science</option>
                      <option value="Biography" className="text-slate-700">Biography</option>
                      <option value="History" className="text-slate-700">History</option>
                      <option value="Other" className="text-slate-700">Other</option>
                    </select>
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-2 h-2 border-r-2 border-b-2 border-slate-400 transform rotate-45"></div>
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:via-emerald-500/5 group-hover:to-emerald-500/0 transition-all -z-10"></div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-semibold overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    {/* Sliding background effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                    {/* Shine effect */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
                  </button>
                </motion.div>

                {/* Cancel Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full border border-slate-300 text-slate-700 py-3.5 rounded-xl font-medium hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm hover:shadow-md"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </motion.div>
              </form>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.4 }}
          className="text-center text-slate-500 text-sm mt-6"
        >
          Make changes and save to update your book record
        </motion.p>
      </motion.div>
    </div>
  );
}

export default EditBook;