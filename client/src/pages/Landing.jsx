import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { 
    ArrowRight, 
    CheckCircle2, 
    Trello, 
    Briefcase, 
    Layers, 
    Smartphone, 
    Globe, 
    BarChart3, 
    Users2,
    CheckSquare,
    Clock,
    Zap
} from "lucide-react"
import ThemeToggle from "../components/ThemeToggle"

const Landing = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0c10] text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden">
            {/* Top Bar - Very Corporate */}
            <div className="bg-[#1a3b5d] text-white py-2 px-6 text-center text-xs font-medium tracking-wide">
                🚀 Ethara AI Enterprise is here. Scale your team to 1000+ members today. <span className="underline cursor-pointer ml-2">Learn more</span>
            </div>

            {/* Navigation - Shifted layout */}
            <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between px-6 lg:px-12 py-4 max-w-[1400px] mx-auto">
                    <div className="flex items-center gap-10">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
                                <Briefcase size={20} />
                            </div>
                            <span className="text-xl font-black tracking-tight text-slate-800 dark:text-white">
                                ETHARA<span className="text-blue-600">PRO</span>
                            </span>
                        </Link>
                        
                        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-400">
                            <a href="#solutions" className="hover:text-blue-600 transition-colors">Solutions</a>
                            <a href="#features" className="hover:text-blue-600 transition-colors">Infrastructure</a>
                            <a href="#pricing" className="hover:text-blue-600 transition-colors">Enterprise</a>
                            <a href="#about" className="hover:text-blue-600 transition-colors">Company</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link to="/log-in" className="hidden sm:block text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors px-4">
                            Login
                        </Link>
                        <Link to="/log-in" className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
                            Register Free
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Left Aligned & Illustrative */}
            <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-40 bg-white dark:bg-[#0a0c10]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-8">
                            <Globe size={14} /> Global Workspace 2.0
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] mb-8">
                            A Complete <span className="text-blue-600 italic">Business</span> <br /> 
                            Management Ecosystem.
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mb-10">
                            Stop switching between 20 different apps. EtharaPro brings tasks, collaboration, CRM, and automation into one unified platform built for high-performance teams.
                        </p>
                        <div className="flex flex-wrap items-center gap-5">
                            <Link to="/log-in" className="px-10 py-4 rounded-lg bg-blue-600 text-white text-lg font-black shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all">
                                Get Started Now
                            </Link>
                            <div className="flex items-center gap-3 text-slate-500">
                                <div className="flex -space-x-2">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-xs font-bold">Trusted by 4.5M users</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-1 relative w-full"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-800">
                            <img 
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
                                alt="Platform Overview" 
                                className="w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent pointer-events-none" />
                        </div>
                        {/* Floating elements */}
                        <div className="absolute -top-6 -left-6 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 hidden sm:block animate-bounce-slow">
                            <BarChart3 className="text-blue-600" size={32} />
                        </div>
                        <div className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 hidden sm:block">
                            <CheckSquare className="text-emerald-500" size={32} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Alternating Feature Sections - Completely different from grid */}
            <section id="solutions" className="py-24 bg-slate-100 dark:bg-[#0d1117]">
                <div className="max-w-[1200px] mx-auto px-6 space-y-32">
                    
                    {/* Block 1 */}
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1">
                            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-8 shadow-lg shadow-blue-600/20">
                                <Layers size={28} />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Advanced Project Structures</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8">
                                Organize work into hierarchies that match your business logic. From high-level milestones to granular subtasks, EtharaPro provides the flexibility your team needs to stay organized.
                            </p>
                            <ul className="space-y-4">
                                {["Multi-level subtasks", "Gantt chart visualization", "Time-tracking & reporting"].map(item => (
                                    <li key={item} className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 size={18} className="text-blue-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
                             <img 
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                                alt="Feature 1" 
                                className="rounded-xl shadow-inner"
                             />
                        </div>
                    </div>

                    {/* Block 2 - Reversed */}
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
                        <div className="flex-1">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/20">
                                <Users2 size={28} />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Omni-Channel Collaboration</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8">
                                Communicating with your team shouldn't happen in a separate app. Our built-in collaboration engine integrates chats, video calls, and document sharing directly into your task workflow.
                            </p>
                            <Link to="/log-in" className="text-blue-600 font-black flex items-center gap-2 hover:gap-4 transition-all">
                                Discover all collaboration tools <ArrowRight size={20} />
                            </Link>
                        </div>
                        <div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
                             <img 
                                src="https://images.unsplash.com/photo-1522071823991-b1ae5e6a3048?auto=format&fit=crop&q=80&w=1000" 
                                alt="Feature 2" 
                                className="rounded-xl shadow-inner"
                             />
                        </div>
                    </div>

                </div>
            </section>

            {/* Infrastructure Specs - Grid with icons on the left */}
            <section id="features" className="py-24 bg-white dark:bg-[#0a0c10]">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl lg:text-5xl font-black mb-6">Engineered for Reliability</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg">
                            Behind the beautiful interface lies a powerhouse of infrastructure designed to handle enterprise-level demands without breaking a sweat.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                        <SpecItem 
                            icon={<Smartphone size={24} />}
                            title="Mobile Sync"
                            text="Fully responsive mobile app for iOS and Android."
                        />
                         <SpecItem 
                            icon={<Zap size={24} />}
                            title="Instant Updates"
                            text="Real-time WebSocket communication for team sync."
                        />
                         <SpecItem 
                            icon={<Clock size={24} />}
                            title="Audit Logs"
                            text="Every change is tracked for complete transparency."
                        />
                         <SpecItem 
                            icon={<Globe size={24} />}
                            title="99.9% Uptime"
                            text="Distributed server architecture for maximum reliability."
                        />
                    </div>
                </div>
            </section>

            {/* Footer - Professional Corporate Style */}
            <footer className="bg-[#1a3b5d] text-white py-20">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                        <div className="col-span-2">
                             <Link to="/" className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white">
                                    <Briefcase size={18} />
                                </div>
                                <span className="text-lg font-black tracking-tight">ETHARA<span className="text-blue-400">PRO</span></span>
                            </Link>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                                The ultimate business management ecosystem for modern teams. Built with passion by Ethara AI Corp.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-blue-400">Products</h4>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li className="hover:text-white cursor-pointer transition-colors">Task Manager</li>
                                <li className="hover:text-white cursor-pointer transition-colors">CRM</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Collaboration</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Video Calls</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-blue-400">Resources</h4>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
                                <li className="hover:text-white cursor-pointer transition-colors">API Reference</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Community</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Marketplace</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-blue-400">Company</h4>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-700 flex flex-col md:row items-center justify-between gap-4 text-xs text-slate-500 font-bold uppercase tracking-widest">
                        <span>© 2024 Ethara AI Corporation. All rights reserved.</span>
                        <div className="flex gap-6">
                            <span>Twitter</span>
                            <span>LinkedIn</span>
                            <span>Facebook</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

const SpecItem = ({ icon, title, text }) => (
    <div className="flex items-start gap-4 p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300">
        <div className="p-3 rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-600/20">
            {icon}
        </div>
        <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-2">{title}</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{text}</p>
        </div>
    </div>
)

export default Landing
