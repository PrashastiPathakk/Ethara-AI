import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Loading from "../components/Loader"
import { Layout, Clock, ListTodo, CheckCircle2 } from "lucide-react"
import { formatDate } from "../utils"
import clsx from "clsx"

const PublicShareView = () => {
    const { id } = useParams()
    const [task, setTask] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/task/share/${id}`)
                setTask(data.task)
            } catch (err) {
                setError(err.response?.data?.message || "Task not found or not public")
            } finally {
                setLoading(false)
            }
        }
        fetchTask()
    }, [id])

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loading /></div>
    if (error) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500 font-bold">{error}</div>

    return (
        <div className="min-h-screen bg-[#f3f4f6] dark:bg-dark-bg py-12 px-6 transition-colors">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-10 justify-center">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                        <Layout size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Ethara AI
                    </span>
                    <span className="ml-2 px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Read Only</span>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div className={clsx(
                            "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest",
                            task.priority === "high" ? "bg-red-100 text-red-600" :
                            task.priority === "medium" ? "bg-amber-100 text-amber-600" :
                            "bg-blue-100 text-blue-600"
                        )}>
                            {task.priority} Priority
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                            <Clock size={16} />
                            <span>Due: {formatDate(new Date(task.date))}</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-6 leading-tight">
                        {task.title}
                    </h1>

                    <div className="flex items-center gap-2 mb-8">
                        <div className={clsx("w-3 h-3 rounded-full", 
                            task.stage === "todo" ? "bg-blue-500" :
                            task.stage === "in progress" ? "bg-amber-500" :
                            task.stage === "done" ? "bg-emerald-500" : "bg-slate-400"
                        )} />
                        <span className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            {task.stage}
                        </span>
                    </div>

                    {task.subTasks?.length > 0 && (
                        <div className="space-y-6 mt-10 pt-10 border-t border-slate-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <ListTodo size={20} className="text-primary" />
                                Subtasks
                            </h3>
                            <div className="grid gap-3">
                                {task.subTasks.map((st, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                        {st.isCompleted ? 
                                            <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" /> : 
                                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 flex-shrink-0" />
                                        }
                                        <span className={clsx("font-medium", st.isCompleted ? "line-through text-slate-400" : "text-slate-700 dark:text-slate-200")}>
                                            {st.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                
                <p className="text-center mt-12 text-slate-400 dark:text-slate-600 text-sm">
                    This is a shared task view. <a href="/log-in" className="text-primary font-bold hover:underline">Log in</a> to manage your own projects.
                </p>
            </div>
        </div>
    )
}

export default PublicShareView
