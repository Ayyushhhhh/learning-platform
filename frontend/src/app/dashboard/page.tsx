"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from "recharts";
import {
    BookOpen, CheckCircle, TrendingUp, AlertTriangle,
    Download, Share2, Printer, Search, PlusCircle, Clock, Zap
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Dashboard() {
    const [stats, setStats] = useState<any>(null);
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        // Mock Data mimicking the Reference Image structure
        setStats({
            overall_score: 7.8, // 7.8/10
            classification: "Excellent", // Excellent
            detection_confidence: 89.2, // 89.2%
            processing_time: 2.3, // 2.3s
            attributes: [
                { subject: "Concept Clarity", A: 82, fullMark: 100 },
                { subject: "Problem Solving", A: 68, fullMark: 100 },
                { subject: "Consistency", A: 76, fullMark: 100 },
                { subject: "Speed", A: 90, fullMark: 100 },
                { subject: "Accuracy", A: 85, fullMark: 100 },
                { subject: "Retention", A: 70, fullMark: 100 },
            ]
        });

        setCourses([
            { code: "BS101", title: "Mathematics I", progress: 85 },
            { code: "BS102", title: "Statistics I", progress: 62 },
            { code: "BS103", title: "Comp. Thinking", progress: 95 },
            { code: "BS104", title: "English I", progress: 40 },
        ]);
    }, []);

    if (!stats) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;

    const getTimeGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-emerald-100 font-sans pb-20">
            <Navbar />

            <main className="pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-slate-500 font-medium mb-1"
                        >
                            {getTimeGreeting()}, Anant
                        </motion.div>
                        <motion.div className="relative">
                            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-100/50 rounded-full blur-3xl -z-10"></div>
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl font-black text-slate-900 tracking-tight relative z-10"
                            >
                                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Intelligence Hub</span>
                            </motion.h1>
                        </motion.div>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-sm text-slate-600">
                            <Clock size={16} className="text-emerald-500" />
                            <span>Spring Term '25</span>
                        </div>
                    </div>
                </div>

                {/* Key Metrics Grid - Glassmorphism */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "Overall GPA", value: "9.2", unit: "/10", icon: <TrendingUp size={24} />, color: "emerald", trend: "+0.4 this week" },
                        { label: "Completion", value: "85", unit: "%", icon: <CheckCircle size={24} />, color: "blue", trend: "On Track" },
                        { label: "Study Streak", value: "12", unit: "Days", icon: <Zap size={24} />, color: "yellow", trend: "Top 5%" },
                        { label: "Pending Tasks", value: "4", unit: "", icon: <AlertTriangle size={24} />, color: "rose", trend: "Due Soon" }
                    ].map((metric, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl p-6 relative overflow-hidden group"
                        >
                            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity bg-${metric.color}-500 rounded-bl-3xl`}>
                                {metric.icon}
                            </div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">{metric.label}</p>
                                    <h3 className="text-3xl font-bold text-slate-800 mt-1">{metric.value}<span className="text-lg text-slate-400 font-normal">{metric.unit}</span></h3>
                                </div>
                                <div className={`p-3 bg-${metric.color}-100/50 rounded-xl text-${metric.color}-600`}>
                                    {metric.icon}
                                </div>
                            </div>
                            <div className={`inline-flex items-center text-xs font-bold px-2 py-1 rounded bg-${metric.color}-50 text-${metric.color}-700`}>
                                {metric.trend}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Chart Area */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Radar Chart for Skills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 relative overflow-hidden"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Skill Analysis</h3>
                                    <p className="text-slate-500 text-sm">AI-generated based on your recent Quiz performance.</p>
                                </div>
                                <Link href="/practice" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Improve Skills &rarr;</Link>
                            </div>

                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats.attributes}>
                                        <PolarGrid stroke="#e2e8f0" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar
                                            name="My Skills"
                                            dataKey="A"
                                            stroke="#10B981"
                                            strokeWidth={3}
                                            fill="#10B981"
                                            fillOpacity={0.3}
                                        />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Recent Activity / Course Progress */}
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Course Progress</h3>
                            <div className="space-y-6">
                                {courses.map((course, i) => (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 font-bold text-xs group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                                    {course.code}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">{course.title}</h4>
                                                    <p className="text-xs text-slate-400">Assignment due in 2 days</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-slate-700">{course.progress}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-slate-900 group-hover:bg-emerald-500 transition-all duration-500 rounded-full"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-8">
                        {/* Quick Mocks Widget */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 blur-[80px] opacity-20" />
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2">Ready for a Quiz?</h3>
                                <p className="text-slate-300 text-sm mb-6">Test your knowledge with a quick 10-min generated mock.</p>

                                <Link
                                    href="/mocks"
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                                >
                                    <PlusCircle size={18} /> Start New Mock
                                </Link>

                                <div className="mt-8 pt-6 border-t border-slate-700">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Recent Attempts</h4>
                                    <div className="space-y-3">
                                        {[
                                            { name: "Stats I - Wk 4", score: "8/10", color: "text-emerald-400" },
                                            { name: "Math I - Wk 2", score: "6/10", color: "text-yellow-400" },
                                        ].map((mock, i) => (
                                            <div key={i} className="flex justify-between text-sm">
                                                <span className="text-slate-300">{mock.name}</span>
                                                <span className={`font-bold ${mock.color}`}>{mock.score}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Export / Actions */}
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Actions</h3>
                            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition text-slate-700 text-sm font-medium mb-2">
                                <Printer size={18} /> Download Transcript
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition text-slate-700 text-sm font-medium">
                                <Share2 size={18} /> Share Profile
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
