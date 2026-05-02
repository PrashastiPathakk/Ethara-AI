import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"
import Textbox from "../components/Textbox"
import Button from "../components/Button"
import { useSelector, useDispatch } from "react-redux"
import { useLoginMutation } from "../redux/slices/api/authApiSlice"
import { toast } from "sonner"
import { setCredentials } from "../redux/slices/authSlice"
import Loading from "../components/Loader"
import { motion } from "framer-motion"
import { Briefcase, ShieldCheck, Mail, Lock, ArrowRight } from "lucide-react"

const Login = () => {
    const { user } = useSelector((state) => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation()

    const submitHandler = async (data) => {
        try {
            const result = await login(data).unwrap()
            dispatch(setCredentials(result))
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || error.message)
        }
    }

    useEffect(() => {
        user && navigate("/dashboard")
    }, [user])

    return (
        <div className="w-full min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#0a0c10] transition-colors duration-500">
            {/* Left Side - Hero/Info (New Layout) */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#1a3b5d] p-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                    <Link to="/landing" className="flex items-center gap-2 mb-16">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                            <Briefcase size={24} />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-white">
                            ETHARA<span className="text-blue-400">PRO</span>
                        </span>
                    </Link>

                    <h1 className="text-5xl font-black text-white leading-tight mb-8">
                        The world's most <br />
                        powerful <span className="text-blue-400">business</span> <br />
                        platform.
                    </h1>
                    <p className="text-blue-100/70 text-lg max-w-md leading-relaxed">
                        Join over 4.5 million organizations that use EtharaPro to manage tasks, automate workflows, and grow their business.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-8 text-blue-200/50 text-sm font-bold uppercase tracking-widest">
                    <span>99.9% Uptime</span>
                    <span>•</span>
                    <span>ISO 27001 Certified</span>
                    <span>•</span>
                    <span>GDPR Compliant</span>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="lg:hidden flex justify-center mb-10">
                        <Link to="/landing" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                <Briefcase size={20} />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">
                                ETHARA<span className="text-blue-600">PRO</span>
                            </span>
                        </Link>
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Sign in to EtharaPro</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Enter your business credentials to continue</p>
                    </div>

                    <div className="space-y-8">
                        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                            <div className="space-y-4">
                                <Textbox
                                    placeholder="work-email@company.com"
                                    type="email"
                                    name="email"
                                    label="Business Email"
                                    className="w-full h-12 rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:ring-blue-600/20"
                                    register={register("email", {
                                        required: "Business Email is required!",
                                    })}
                                    error={errors.email ? errors.email.message : ""}
                                />
                                
                                <div className="relative">
                                    <Textbox
                                        placeholder="••••••••"
                                        type="password"
                                        name="password"
                                        label="Password"
                                        className="w-full h-12 rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:ring-blue-600/20"
                                        register={register("password", {
                                            required: "Password is required!",
                                        })}
                                        error={errors.password ? errors.password.message : ""}
                                    />
                                    <Link to="#" className="absolute right-0 top-0 text-xs text-blue-600 hover:underline font-bold">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                                <label htmlFor="remember" className="text-sm font-medium text-slate-500 dark:text-slate-400">Remember this device</label>
                            </div>

                            {isLoading ? (
                                <div className="flex justify-center py-2">
                                    <Loading />
                                </div>
                            ) : (
                                <Button
                                    type="submit"
                                    label="Secure Login"
                                    icon={<ArrowRight size={18} />}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-black shadow-xl shadow-blue-600/20 transition-all flex flex-row-reverse items-center justify-center gap-2 group"
                                />
                            )}
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-[#0a0c10] px-4 text-slate-500 font-bold tracking-widest">Enterprise Auth</span></div>
                        </div>

                        <p className="text-center text-sm text-slate-500 dark:text-slate-400 font-medium">
                            New to EtharaPro?{" "}
                            <Link to="#" className="text-blue-600 font-black hover:underline">
                                Start 30-day Free Trial
                            </Link>
                        </p>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-6 text-slate-400 dark:text-slate-600">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            <span>Encrypted Session</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <div className="text-[10px] font-bold uppercase tracking-wider">
                            v4.2.0-stable
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Login
