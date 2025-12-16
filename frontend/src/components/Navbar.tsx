"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Rocket } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 top-0 left-0 transition-all duration-300">
            <div className="absolute inset-0 glass-panel border-b border-emerald-100/50 shadow-sm" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                            <Rocket className="text-white w-6 h-6" />
                        </div>
                        <Link href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                            IITM <span className="text-emerald-600">GURU</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-1 items-center bg-white/50 backdrop-blur-md px-2 py-1.5 rounded-full border border-gray-100 shadow-sm">
                        {[
                            { name: 'Features', href: '#features' },
                            { name: 'Analytics', href: '#analytics' },
                            { name: 'Practice', href: '/practice' },
                            { name: 'Mocks', href: '/mocks' },
                            { name: 'Testimonials', href: '#testimonials' },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-5 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <a href="https://youtube.com/@iitmguru" className="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition">
                            Go to Channel
                        </a>
                        <Link
                            href="/dashboard"
                            className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:scale-105 transition-all duration-200"
                        >
                            Start Learning
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-emerald-600 p-2">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden absolute w-full bg-white border-b border-gray-100 shadow-xl">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link href="#features" className="block px-4 py-3 rounded-lg hover:bg-emerald-50 text-base font-medium text-gray-700">Features</Link>
                        <Link href="#analytics" className="block px-4 py-3 rounded-lg hover:bg-emerald-50 text-base font-medium text-gray-700">Analytics</Link>
                        <Link href="/dashboard" className="block px-4 py-3 rounded-lg bg-emerald-600 text-white text-base font-bold text-center mt-4">Login / Dashboard</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
