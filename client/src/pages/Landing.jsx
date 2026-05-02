import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle, Layout, Share2, Shield, Zap } from "lucide-react"
import ThemeToggle from "../components/ThemeToggle"

const Landing = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-dark-bg text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                        <Layout size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Ethara AI
                    </span>
                </div>
                <div className="flex items-center gap-6">
                    <ThemeToggle />
                    <Link to="/log-in" className="px-5 py-2 rounded-full font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                        Log in
                    </Link>
                    <Link to="/log-in" className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 inline-block">
                            New: Real-time collaborative tasks ✨
                        </span>
                        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                            Manage tasks with <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                                superhuman efficiency
                            </span>
                        </h1>
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10">
                            Ethara AI is the fastest way to organize your work, collaborate with your team, and ship faster. Modern, fast, and beautiful.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/log-in" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white text-lg font-bold shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group">
                                Start for free
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                View Demo
                            </button>
                        </div>
                    </motion.div>

                    {/* Mockup Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-20 relative"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mx-auto max-w-5xl">
                           <div className="h-8 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                           </div>
                           <div className="p-1">
                                <img 
                                    src="https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=2000" 
                                    alt="Dashboard Preview" 
                                    className="w-full rounded-b-xl grayscale-[0.2] opacity-90"
                                />
                           </div>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 blur-3xl rounded-full -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/20 blur-3xl rounded-full -z-10" />
                    </motion.div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Built for modern teams</h2>
                        <p className="text-slate-500 dark:text-slate-400">Everything you need to manage projects at scale.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<Zap className="text-yellow-500" />}
                            title="Blazing Fast"
                            description="Real-time updates and lightning fast interactions. No more waiting for spinners."
                        />
                        <FeatureCard 
                            icon={<Share2 className="text-primary" />}
                            title="Collaborative"
                            description="Share tasks with public read-only links or work together in private workspaces."
                        />
                        <FeatureCard 
                            icon={<Shield className="text-accent" />}
                            title="Secure"
                            description="JWT-based authentication and role-based access control for your peace of mind."
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

const FeatureCard = ({ icon, title, description }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300"
    >
        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            {description}
        </p>
    </motion.div>
)

export default Landing
