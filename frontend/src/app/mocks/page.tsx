"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Search, Filter, Play, Clock, FileText, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_DATA = [
    { title: "Statistics 1 - End Term 2023", course: "Statistics 1", year: "2023", type: "End Term", duration: "120 mins" },
    { title: "Maths 1 - Quiz 1 2024", course: "Mathematics 1", year: "2024", type: "Quiz 1", duration: "45 mins" },
    { title: "Python - OPPE Mock 1", course: "Intro to Python", year: "2024", type: "OPPE", duration: "90 mins" },
    { title: "CT - Quiz 2 2022", course: "Computational Thinking", year: "2022", type: "Quiz 2", duration: "45 mins" },
    { title: "Statistics 2 - End Term 2022", course: "Statistics 2", year: "2022", type: "End Term", duration: "120 mins" },
];

export default function Mocks() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedCourse, setSelectedCourse] = useState("All");

    // Filter logic
    const filteredMocks = MOCK_DATA.filter(mock => {
        const catMatch = selectedCategory === "All" || mock.type === selectedCategory;
        const courseMatch = selectedCourse === "All" || mock.course === selectedCourse;
        return catMatch && courseMatch;
    });

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-[100px] -translate-y-1/2 -z-10 pointer-events-none" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-[100px] translate-y-1/2 -z-10 pointer-events-none" />

            <Navbar />

            <main className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-12 relative">
                    {/* Header Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-200/50 rounded-full blur-3xl -z-10"></div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-emerald-100 shadow-sm mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-emerald-800 text-xs font-bold uppercase tracking-widest">Exam Hall</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight"
                    >
                        Mock Tests & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Previous Papers</span>
                    </motion.h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Practice with real exam interfaces. Filter by course, exam type, or year.
                    </p>
                </div>

                {/* Category Selection */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                    {["All", "Quiz 1", "Quiz 2", "OPPE", "End Term"].map((cat, i) => (
                        <motion.button
                            key={cat}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelectedCategory(cat)}
                            className={`p-4 rounded-2xl font-bold transition-all duration-300 ${selectedCategory === cat
                                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200 scale-105'
                                : 'glass-card-premium text-slate-600 hover:text-emerald-600 hover:scale-105'
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search papers..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl glass-card-premium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium text-slate-700"
                        />
                    </div>
                    <div className="relative w-full md:w-72">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <select
                            className="w-full pl-12 pr-10 py-4 rounded-2xl glass-card-premium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none font-medium text-slate-700 cursor-pointer"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option value="All">All Courses</option>
                            <option value="Mathematics 1">Mathematics 1</option>
                            <option value="Statistics 1">Statistics 1</option>
                            <option value="Intro to Python">Intro to Python</option>
                            <option value="Computational Thinking">Computational Thinking</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 rotate-90" />
                    </div>
                </div>

                {/* Paper List */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMocks.map((mock, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -8 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card-premium p-6 relative group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-emerald-100/50 transition-colors"></div>

                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <FileText className="w-6 h-6 text-emerald-600" />
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${mock.type === 'End Term' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                    mock.type === 'OPPE' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                        'bg-blue-50 text-blue-700 border-blue-100'
                                    }`}>
                                    {mock.type}
                                </span>
                            </div>

                            <h3 className="font-bold text-slate-900 text-xl mb-2 group-hover:text-emerald-700 transition-colors">{mock.title}</h3>
                            <p className="text-slate-500 font-medium text-sm mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> {mock.course}
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> {mock.year}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-slate-500 font-medium mb-6 bg-slate-50/50 p-3 rounded-lg">
                                <span className="flex items-center gap-1.5"><Clock size={16} className="text-emerald-500" /> {mock.duration}</span>
                                <span className="text-slate-300">|</span>
                                <span>100 Marks</span>
                            </div>

                            <button className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/30">
                                <Play size={18} fill="currentColor" /> Attempt Now
                            </button>
                        </motion.div>
                    ))}
                </div>

                {filteredMocks.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 text-slate-400"
                    >
                        <p className="text-xl font-medium">No papers found for these filters.</p>
                        <button
                            onClick={() => { setSelectedCategory("All"); setSelectedCourse("All") }}
                            className="mt-4 text-emerald-600 font-bold hover:underline"
                        >
                            Reset Filters
                        </button>
                    </motion.div>
                )}
            </main>
        </div>
    );
}
