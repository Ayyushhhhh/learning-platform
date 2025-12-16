"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowRight, BarChart2, Brain, CheckCircle, Play, Layers, TrendingUp, Users, Rocket, Star, Quote, Target, Building2, Video, GraduationCap, BookOpenCheck, Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import { useRef, MouseEvent, useState, useEffect } from "react";

function CounterItem({ value, suffix, label, icon }: { value: number, suffix: string, label: string, icon: React.ReactNode }) {
  const springValue = useSpring(0, { bounce: 0, duration: 2000 });
  const rounded = useTransform(springValue, (latest) => Math.floor(latest));

  // Trigger animation when in view (simple effect)
  useEffect(() => {
    springValue.set(value);
  }, [springValue, value]);

  return (
    <div className="text-center group cursor-default">
      <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300 bg-slate-50 p-4 rounded-full w-16 h-16 mx-auto items-center shadow-sm">
        {icon}
      </div>
      <div className="text-4xl font-black text-slate-800 mb-1 flex justify-center items-end">
        <motion.span>{rounded}</motion.span>
        <span className="text-emerald-500">{suffix}</span>
      </div>
      <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">{label}</div>
    </div>
  );
}

function HeroSlider({ images }: { images: { src: string, title: string, desc: string }[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 w-full h-full"
        >
          <img src={images[index].src} alt={images[index].title} className="object-cover w-full h-full" />
          <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-bold text-white mb-2"
            >
              {images[index].title}
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-slate-200 text-lg"
            >
              {images[index].desc}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === index ? 'w-8 bg-emerald-500' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}

function HeroCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`glass-card-premium relative overflow-hidden rounded-3xl p-8 group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main className="min-h-screen selection:bg-emerald-100 overflow-x-hidden bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col pt-32 pb-20 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100 via-slate-50 to-white" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          {/* Radial Fade for Grid */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>

          {/* Animated Glow Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -40, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-[120px]"
          />
        </div>

        {/* Parallax Rocket Watermark */}
        <motion.div
          style={{ y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] pointer-events-none"
        >
          <Rocket size={1000} strokeWidth={0.5} className="text-emerald-900 rotate-12" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">

          <div className="text-center max-w-4xl mx-auto mb-16 relative">
            {/* Decorative Sparkles behind text */}
            <div className="absolute top-0 right-10 text-yellow-400 animate-pulse delay-700 opacity-60"><Star size={24} fill="currentColor" /></div>
            <div className="absolute bottom-10 left-10 text-emerald-400 animate-pulse delay-1000 opacity-60"><Star size={18} fill="currentColor" /></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-emerald-100 shadow-sm mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-semibold text-emerald-800 tracking-wide uppercase">AI-Powered Intelligence</span>
            </motion.div>

            <h1 className="text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Ultimate Platform</span> <br />
              for IITM BS Degree.
            </h1>

            <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light">
              Join 500+ paid learners optimizing their CGPA with AI-driven testing and prediction.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-emerald-900 rounded-full hover:bg-emerald-800 hover:shadow-2xl hover:-translate-y-1 focus:outline-none overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Start Learning <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/mocks"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 transition-all bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-emerald-200"
              >
                <Play className="mr-2 w-5 h-5 text-emerald-600 fill-current" />
                Free Mock Test
              </Link>
            </div>
          </div>

          {/* Hero Image Slider */}
          <div className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 aspect-[21/9] bg-slate-900 group">
            <HeroSlider images={[
              { src: "/banner-1.png", title: "Live Exam Dashboard", desc: "Real-time performance tracking with detailed granular analytics." },
              { src: "/slider-2.png", title: "Interactive Live Classes", desc: "Master complex topics with our expert-led sessions." },
              { src: "/slider-3.png", title: "Vibrant Community", desc: "Join thousands of learners helping each other succeed." }
            ]} />
          </div>

        </div>
      </section>

      {/* Holographic Floating Stats Strip */}
      <div className="relative z-20 -mt-24 mx-4">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card-premium p-10 rounded-3xl shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-500">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            <div className="flex flex-wrap justify-around gap-8 relative z-10">
              {[
                { value: 500, suffix: "+", label: "Paid Learners", icon: <Users className="text-emerald-500" /> },
                { value: 14000, suffix: "+", label: "Watch Hours", icon: <Play className="text-blue-500" /> },
                { value: 5, suffix: "/5", label: "Community Rating", icon: <Star className="text-yellow-500" /> },
                { value: 100, suffix: "%", label: "S-Grade Target", icon: <Target className="text-purple-500" /> }
              ].map((s, i) => (
                <CounterItem key={i} {...s} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* "Trusted By" / Ecosystem Section to Fill Space */}
      <section className="py-12 bg-slate-50 border-b border-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 uppercase tracking-widest mb-12">Empowering students from</p>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 transition-all duration-700">
            {/* IIT Madras Logo Mimic */}
            <div className="flex items-center gap-3 group">
              <div className="p-2 bg-slate-900 text-white rounded-lg shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-slate-500/30 transition-all">
                <Building2 size={24} />
              </div>
              <span className="text-2xl font-black text-slate-800 tracking-tighter">IIT Madras</span>
            </div>

            {/* NPTEL Logo Mimic */}
            <div className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all">
                <Video size={24} />
              </div>
              <span className="text-2xl font-bold text-slate-800 tracking-tight">NPTEL</span>
            </div>

            {/* BS Degree Logo Mimic */}
            <div className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-indigo-500/30 transition-all">
                <GraduationCap size={24} />
              </div>
              <span className="text-2xl font-bold text-slate-800">BS Degree</span>
            </div>

            {/* GATE Aspirants Logo Mimic */}
            <div className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all">
                <BookOpenCheck size={24} />
              </div>
              <span className="text-2xl font-bold text-slate-800">GATE <span className="font-bold">Aspirants</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Community Love Testimonials */}
      <section className="py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-emerald-100 rounded-full blur-3xl -z-10"></div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Loved by the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Community</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium">Don't just take our word for it. Here is what students say.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Ashutox09", date: "3 months ago", text: "Thank you Ayush Bhai for everything. You made stats so easy!" },
              { name: "Brahmanboy0019", date: "10 months ago", text: "Thank u so much for saving us during the OPPEs." },
              { name: "VishalSingh", date: "6 months ago", text: "Your teaching justifies the title IITM guru, superb work! The concepts are crystal clear." },
              { name: "EverythingAlways", date: "8 months ago", text: "Bhai bahut mast video banaye ho, sare concepts clear hue!" },
              { name: "Draweatrepeat", date: "6 months ago", text: "Superb explanation, thank you. Helped me crack the End Term." },
              { name: "Goolu", date: "10 months ago", text: "You got a subscriber bhaiya! Best channel for BS Degree." }
            ].map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative"
              >
                <Quote className="absolute top-6 right-6 text-emerald-100 w-10 h-10 fill-current" />
                <p className="text-slate-700 mb-6 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                    <span className="text-xs text-slate-400">{t.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid - Asymmetric */}
      <section id="features" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <HeroCard className="md:col-span-2 bg-gradient-to-br from-emerald-50 to-white overflow-hidden/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="flex gap-8 items-start relative z-10">
              <div className="flex-shrink-0 p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-200 text-white transform group-hover:scale-110 transition-transform duration-300">
                <Layers size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Syllabus Mapping</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  We don't just show files. We map every PDF and video to the official IITM syllabus structure. Track progress at the <strong>concept level</strong>.
                </p>
              </div>
            </div>
          </HeroCard>

          <HeroCard className="bg-white">
            <div className="mb-6">
              <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-200 text-white mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Brain size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Exam Simulator</h3>
              <p className="text-slate-600">
                Generate infinite variations of OPPE questions. Never run out of practice material.
              </p>
            </div>
          </HeroCard>

          <HeroCard className="bg-white">
            <div className="mb-6">
              <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg shadow-blue-200 text-white mb-4 group-hover:-rotate-6 transition-transform duration-300">
                <BarChart2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Grade Forecaster</h3>
              <p className="text-slate-600">
                Proprietary ML models trained on 4 years of IITM data to predict your success probability.
              </p>
            </div>
          </HeroCard>

          <HeroCard className="md:col-span-2 bg-slate-900 text-white">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Week-wise Strategy</h3>
                <p className="text-slate-400 leading-relaxed text-lg mb-6">
                  Get a personalized schedule every Monday morning. We tell you exactly what to study to clear the week's content in minimum time.
                </p>
                <button className="px-6 py-2 bg-emerald-500 rounded-full font-bold text-white hover:bg-emerald-400 transition">
                  Generate My Plan
                </button>
              </div>
              <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-3 border-b border-white/10 pb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-sm font-bold">This Week</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                  <div className="h-2 bg-white/20 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </HeroCard>
        </div>
      </section>

      {/* Testimonials with Quote Styling */}
      <section id="testimonials" className="py-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm mb-6 transform hover:scale-105 transition-transform duration-300">
              <Star size={14} className="text-indigo-600 fill-current" />
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-widest">Student Success Stories</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Top 1%</span>.
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed">
              Our data-driven approach doesn't just help you pass. It helps you dominate the leaderboard.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "The concept mapping is insane. I skipped the 2-hour lectures and just used the AI summaries and Questions. Got an S in Stats.",
                author: "Aditi R.",
                grade: "CGPA 9.4"
              },
              {
                text: "Finally a platform that looks and feels like 2025. The UX is so smooth, it actually motivates me to log in and study.",
                author: "Rahul M.",
                grade: "CGPA 8.8"
              },
              {
                text: "The score prediction was scary accurate. It told me I'd get 85, I got 87. It really helps you know where you stand.",
                author: "Sneha K.",
                grade: "CGPA 9.1"
              }
            ].map((t, i) => (
              <HeroCard key={i} className="hover:-translate-y-2 transition-transform duration-500">
                <Quote className="text-emerald-200 w-12 h-12 absolute top-4 right-6 rotate-12" />
                <p className="text-lg text-slate-700 mb-8 relative z-10 font-medium">"{t.text}"</p>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <div className="font-bold text-slate-900">{t.author}</div>
                  <div className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-md font-bold">{t.grade}</div>
                </div>
              </HeroCard>
            ))}
          </div>
        </div>
      </section>

      {/* World-Class Footer */}
      <footer className="relative bg-slate-900 text-slate-300 py-20 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 mb-16">

            {/* Left Column: Brand & Links */}
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/50">
                    <Rocket className="text-white w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold text-white tracking-tight">IITM <span className="text-emerald-400">GURU</span></span>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                  The premier academic intelligence platform for the IIT Madras BS Degree. Data-driven insights for high-performance students.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Platform</h4>
                  <ul className="space-y-3">
                    <li><Link href="#features" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Features</Link></li>
                    <li><Link href="/mocks" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Mock Tests</Link></li>
                    <li><Link href="/dashboard" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Dashboard</Link></li>
                    <li><Link href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Roadmap</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Community</h4>
                  <ul className="space-y-3">
                    <li><a href="https://youtube.com/@iitmguru" target="_blank" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> YouTube Channel</a></li>
                    <li><Link href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> WhatsApp Group</Link></li>
                    <li><Link href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><ArrowRight size={14} /> Success Stories</Link></li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                {[
                  { icon: <Twitter size={20} />, href: "#" },
                  { icon: <Github size={20} />, href: "#" },
                  { icon: <Linkedin size={20} />, href: "#" },
                  { icon: <Instagram size={20} />, href: "#" },
                ].map((social, i) => (
                  <a key={i} href={social.href} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:-translate-y-1">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
              <p className="text-slate-400 mb-8">Have a question or feedback? We'd love to hear from you.</p>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Name</label>
                    <input type="text" placeholder="Your Name" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Email</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Message</label>
                  <textarea rows={4} placeholder="How can we help you?" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600 resize-none"></textarea>
                </div>
                <button type="button" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 transition-all duration-300 flex items-center justify-center gap-2 group">
                  Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-slate-700 flex flex-col sm:flex-row gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-emerald-500" />
                  <span>support@iitmguru.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-emerald-500" />
                  <span>IIT Madras, Chennai</span>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2025 IITM GURU Intelligence Systems. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-emerald-400 transition-colors">Cookie Preferences</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

