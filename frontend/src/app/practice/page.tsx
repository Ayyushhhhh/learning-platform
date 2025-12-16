"use client";
// Force Rebuild


import { useState } from "react";
import Navbar from "@/components/Navbar";
import {
    Brain, CheckCircle, RefreshCw, ChevronRight, AlertCircle,
    BookOpen, FileText, Download, MessageSquare, ArrowLeft,
    GraduationCap, Layers, Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data for Hierarchy ---
const COURSE_HIERARCHY = {
    "Foundation": [
        { id: "math1", name: "Mathematics 1" },
        { id: "stats1", name: "Statistics 1" },
        { id: "ct", name: "Computational Thinking" },
        { id: "english1", name: "English 1" },
        { id: "math2", name: "Mathematics 2" },
        { id: "stats2", name: "Statistics 2" },
        { id: "python", name: "Intro to Python" },
        { id: "english2", name: "English 2" },
    ],
    "Diploma": [
        // Diploma in Programming
        { id: "dbms", name: "DBMS" },
        { id: "pdsa", name: "PDSA (Python Algos)" },
        { id: "appdev1", name: "App Dev 1" },
        { id: "appdev2", name: "App Dev 2" },
        { id: "java", name: "Java Programming" },
        { id: "sc", name: "System Commands" },
        // Diploma in Data Science
        { id: "mlf", name: "ML Foundations" },
        { id: "mlt", name: "ML Techniques" },
        { id: "mlp", name: "ML Practice" },
        { id: "bdm", name: "Business Data Mgmt" },
        { id: "ba", name: "Business Analytics" },
        { id: "tds", name: "Tools in Data Science" },
    ],
    "Degree": [
        { id: "dl", name: "Deep Learning" },
        { id: "ai", name: "AI Search Methods" },
        { id: "nlp", name: "Natural Language Processing" },
        { id: "bigdata", name: "Big Data" },
        { id: "rl", name: "Reinforcement Learning" },
        { id: "cv", name: "Computer Vision" },
        { id: "sp", name: "Speech Technology" },
        { id: "market", name: "Market Research" },
    ]
};

const WEEKS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function Practice() {
    // --- State ---
    const [level, setLevel] = useState<string | null>(null);
    const [subject, setSubject] = useState<any | null>(null);
    const [week, setWeek] = useState<number | null>(null);
    const [mode, setMode] = useState<"menu" | "quiz">("menu"); // menu = drilling down, quiz = active

    // Quiz State
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState<any>(null);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [aiChatOpen, setAiChatOpen] = useState(false);
    const [aiResponse, setAiResponse] = useState("");

    // --- Actions ---

    const handleLevelSelect = (l: string) => {
        setLevel(l);
        setSubject(null);
        setWeek(null);
    };

    const handleSubjectSelect = (s: any) => {
        setSubject(s);
        setWeek(null);
    };

    const startQuiz = async (w: number) => {
        setWeek(w);
        setMode("quiz");
        await generateQuestion();
    };

    const generateQuestion = async () => {
        setLoading(true);
        setQuestion(null);
        setSelectedOption(null);
        setShowExplanation(false);
        setAiChatOpen(false);
        setAiResponse("");

        try {
            // Real backend call
            const res = await fetch("http://localhost:8000/api/ai/generate-question", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic_id: 1, // Mock mapping
                    difficulty: "Medium"
                })
            });
            const data = await res.json();
            setQuestion(data);
        } catch (e) {
            console.error("Failed to generate", e);
        } finally {
            setLoading(false);
        }
    };

    const askAI = async () => {
        setAiChatOpen(true);
        setAiResponse("Thinking...");
        // Simulate AI thinking
        setTimeout(() => {
            setAiResponse(`Here is a detailed breakdown for this ${subject?.name || 'Topic'} question.\n\nThe key concept here is understanding the core formula. \n\n1. Analyze the input values.\n2. Apply the theorem.\n3. Calculate the result.\n\nThe reason option ${question?.correct_option + 1} is correct is because... (AI Explanation would go here)`);
        }, 1500);
    };

    // --- Renderers ---

    const renderBreadcrumbs = () => (
        <div className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-8 overflow-x-auto whitespace-nowrap">
            <button onClick={() => { setLevel(null); setSubject(null); setMode("menu") }} className="hover:text-emerald-500 transition">Practice</button>
            {level && <><ChevronRight size={14} /> <button onClick={() => { setSubject(null); setMode("menu") }} className="hover:text-emerald-500 transition">{level}</button></>}
            {subject && <><ChevronRight size={14} /> <button onClick={() => { setMode("menu") }} className="hover:text-emerald-500 transition">{subject.name}</button></>}
            {mode === "quiz" && <><ChevronRight size={14} /> <span className="text-emerald-600">Week {week} Quiz</span></>}
        </div>
    );

    const renderLevelSelection = () => (
        <div className="grid lg:grid-cols-3 gap-8">
            {[
                {
                    title: "Foundation Level",
                    icon: BookOpen,
                    color: "from-blue-500 to-cyan-500",
                    desc: "Master the basics. Build your academic stronghold.",
                    stats: "8 Courses • 96 Weeks"
                },
                {
                    title: "Diploma Level",
                    icon: Layers,
                    color: "from-emerald-500 to-teal-500",
                    desc: "Core Logic. Data Science & Application Development.",
                    stats: "12 Courses • 144 Weeks"
                },
                {
                    title: "Degree Level",
                    icon: GraduationCap,
                    color: "from-purple-500 to-indigo-500",
                    desc: "Advanced AI. Specializations & Capstone Projects.",
                    stats: "4+ Electives • Research"
                }
            ].map((l, i) => (
                <motion.button
                    key={l.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => handleLevelSelect(l.title.split(" ")[0])}
                    className="group relative overflow-hidden rounded-3xl bg-white p-8 text-left shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 border border-slate-100"
                >
                    {/* Background Gradients */}
                    <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${l.color} opacity-5 group-hover:opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all duration-500`}></div>

                    <div className="relative z-10 flex flex-col h-full">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300`}>
                            <l.icon size={32} />
                        </div>

                        <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">{l.title}</h3>
                        <p className="text-slate-500 font-medium text-lg mb-8 leading-relaxed">{l.desc}</p>

                        <div className="mt-auto border-t border-slate-100 pt-6 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{l.stats}</span>
                            <div className={`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300`}>
                                <ChevronRight size={20} />
                            </div>
                        </div>
                    </div>
                </motion.button>
            ))}
        </div>
    );

    const renderFeatures = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-24 grid md:grid-cols-3 gap-8 border-t border-slate-200 pt-16"
        >
            <div className="text-center px-4">
                <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Brain size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">AI-Powered Adaptation</h3>
                <p className="text-slate-500 leading-relaxed">Questions evolve with your performance. We target your weak spots to maximize your GPA.</p>
            </div>
            <div className="text-center px-4">
                <div className="w-16 h-16 mx-auto bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                    <Award size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Exam-Grade Content</h3>
                <p className="text-slate-500 leading-relaxed">Practise with questions that match the exact difficulty and pattern of IITM End Terms.</p>
            </div>
            <div className="text-center px-4">
                <div className="w-16 h-16 mx-auto bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <MessageSquare size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Explanations</h3>
                <p className="text-slate-500 leading-relaxed">Stuck on a doubt? Get instant, detailed step-by-step logic from our fine-tuned AI Tutor.</p>
            </div>
        </motion.div>
    );

    const renderSubjectSelection = () => (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSE_HIERARCHY[level as keyof typeof COURSE_HIERARCHY]?.map((s, i) => (
                <motion.button
                    key={s.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleSubjectSelect(s)}
                    className="glass-card-premium p-6 flex items-center gap-4 group hover:bg-emerald-50/30 transition-colors"
                >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        <BookOpen size={20} />
                    </div>
                    <span className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{s.name}</span>
                    <ChevronRight className="ml-auto text-slate-300 group-hover:text-emerald-500" />
                </motion.button>
            ))}
        </div>
    );

    const renderWeekSelection = () => (
        <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Select Week for {subject.name}</h2>
            <div className="grid md:grid-cols-2 gap-4">
                {WEEKS.map((w) => (
                    <div key={w} className="glass-card-premium p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                                {w}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">Week {w}</h4>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Practice Content</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => window.open(`http://localhost:8000/api/pdf/generate/${subject?.id}_week${w}`, "_blank")}
                                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 text-sm font-bold hover:bg-slate-200 transition flex items-center gap-2"
                            >
                                <Download size={14} /> PDF
                            </button>
                            <button
                                onClick={() => startQuiz(w)}
                                className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition flex items-center gap-2 shadow-lg shadow-emerald-200"
                            >
                                <Brain size={14} /> Top 50 AI Qns
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderQuiz = () => (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => setMode("menu")} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition">
                    <ArrowLeft size={18} /> Back to Weeks
                </button>
                <div className="px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase">
                    {subject.name} • Week {week}
                </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                {question ? (
                    <motion.div
                        key={question.question_text} // force re-render
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card-premium p-8 md:p-10 border-t-4 border-t-emerald-500 relative"
                    >
                        {/* ... existing question card content ... */}
                        <div className="flex justify-between items-start mb-8">
                            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                AI Generated
                            </span>
                            <span className="text-emerald-600 font-bold flex items-center gap-2 cursor-pointer hover:underline" onClick={generateQuestion}>
                                <RefreshCw size={14} /> Refresh
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-800 leading-relaxed mb-10">
                            {question.question_text}
                        </h2>

                        <div className="space-y-4 mb-10">
                            {question.options.map((opt: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedOption(idx)}
                                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group ${selectedOption === idx
                                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900 shadow-sm'
                                        : 'border-transparent bg-slate-50 hover:bg-white hover:border-emerald-200 hover:shadow-md'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${selectedOption === idx ? 'border-emerald-500' : 'border-slate-300 group-hover:border-emerald-400'
                                        }`}>
                                        {selectedOption === idx && <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm" />}
                                    </div>
                                    <span className="font-medium text-lg">{opt}</span>
                                </button>
                            ))}
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-100 pt-6">
                            <button
                                onClick={askAI}
                                className="text-indigo-600 font-bold flex items-center gap-2 hover:bg-indigo-50 px-4 py-2 rounded-lg transition"
                            >
                                <MessageSquare size={18} /> Ask AI to Explain
                            </button>

                            {selectedOption !== null && !showExplanation && (
                                <button
                                    onClick={() => setShowExplanation(true)}
                                    className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg"
                                >
                                    Check Answer
                                </button>
                            )}
                        </div>

                        {/* Explanation Area */}
                        {showExplanation && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-6 p-6 bg-slate-50 rounded-2xl">
                                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                    {selectedOption === question.correct_option ? <CheckCircle className="text-emerald-500" /> : <AlertCircle className="text-red-500" />}
                                    Explanation
                                </h4>
                                <p className="text-slate-600 leading-relaxed">{question.explanation}</p>
                            </motion.div>
                        )}

                        {/* AI Chat Modal / Area */}
                        {aiChatOpen && (
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-6 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl relative">
                                <div className="absolute -top-3 left-8 w-6 h-6 bg-indigo-50 border-t border-l border-indigo-100 transform rotate-45"></div>
                                <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                                    <Brain size={18} /> IITM Guru AI
                                </h4>
                                <p className="text-indigo-800 leading-relaxed whitespace-pre-line">
                                    {aiResponse}
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <div className="text-center py-20">
                        {loading ? (
                            <>
                                <RefreshCw className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4" />
                                <p className="text-slate-500 font-medium">Generating your custom question...</p>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                                <p className="text-slate-500 font-medium mb-4">Something went wrong.</p>
                                <button onClick={generateQuestion} className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition">
                                    Try Again
                                </button>
                            </>
                        )}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-50">
            {/* Background Glow */}
            <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <Navbar />

            <main className="pt-28 pb-12 px-4 max-w-7xl mx-auto min-h-[80vh]">
                {/* Page Header */}
                <div className="text-center mb-10 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-200/50 rounded-full blur-2xl -z-10"></div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">AI Adaptive <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Practice</span></h1>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto font-medium">Drill down into your course content with AI-powered assistance.</p>
                </div>

                {renderBreadcrumbs()}

                <AnimatePresence mode="wait">
                    {!level && (
                        <motion.div key="level" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            {renderLevelSelection()}
                            {renderFeatures()}
                        </motion.div>
                    )}

                    {level && !subject && (
                        <motion.div key="subject" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <h2 className="text-2xl font-black text-slate-900 mb-6">Select Subject</h2>
                            {renderSubjectSelection()}
                        </motion.div>
                    )}

                    {subject && mode === "menu" && (
                        <motion.div key="week" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            {renderWeekSelection()}
                        </motion.div>
                    )}

                    {mode === "quiz" && (
                        <motion.div key="quiz" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            {renderQuiz()}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

