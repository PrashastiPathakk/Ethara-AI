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
import { Layout, ShieldCheck, Mail, Lock } from "lucide-react"

const Login = () => {
    const { user } = useSelector((state) => state.auth)
    const { theme } = useSelector((state) => state.theme)
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
        <div className="w-full min-h-screen flex items-center justify-center bg-white dark:bg-dark-bg transition-colors duration-300 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-6 relative z-10"
            >
                <div className="flex flex-col items-center mb-8">
                    <Link to="/landing" className="flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30">
                            <Layout size={28} />
                        </div>
                        <span className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Ethara AI
                        </span>
                    </Link>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome back</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Enter your credentials to access your account</p>
                </div>

                <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
                    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                        <Textbox
                            placeholder="email@example.com"
                            type="email"
                            name="email"
                            label="Email Address"
                            className="w-full rounded-xl bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                            register={register("email", {
                                required: "Email Address is required!",
                            })}
                            error={errors.email ? errors.email.message : ""}
                        />
                        
                        <div className="relative">
                            <Textbox
                                placeholder="your password"
                                type="password"
                                name="password"
                                label="Password"
                                className="w-full rounded-xl bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                                register={register("password", {
                                    required: "Password is required!",
                                })}
                                error={errors.password ? errors.password.message : ""}
                            />
                            <Link to="#" className="absolute right-0 top-0 text-xs text-primary hover:underline font-medium">
                                Forgot?
                            </Link>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center py-2">
                                <Loading />
                            </div>
                        ) : (
                            <Button
                                type="submit"
                                label="Sign In"
                                className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5 active:scale-[0.98]"
                            />
                        )}
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Don't have an account?{" "}
                            <Link to="#" className="text-primary font-bold hover:underline">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-4 text-slate-400 dark:text-slate-600">
                    <div className="flex items-center gap-1 text-xs">
                        <ShieldCheck size={14} />
                        <span>AES-256 Encryption</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <div className="text-xs">
                        &copy; 2026 Ethara AI Inc.
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Login
