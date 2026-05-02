import clsx from "clsx"
import moment from "moment"
import React from "react"
import { FaNewspaper } from "react-icons/fa"
import { FaArrowsToDot } from "react-icons/fa6"
import { LuClipboardEdit } from "react-icons/lu"
import {
    MdAdminPanelSettings,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdKeyboardDoubleArrowUp,
} from "react-icons/md"
import { PriorityChart, StatusChart } from "../components/Chart"         
import Loading from "../components/Loader"
import UserInfo from "../components/UserInfo"
import { useGetDashboardStatsQuery } from "../redux/slices/api/taskApiSlice"
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils"
import { motion } from "framer-motion"
import { CheckCircle2, Layout, Users as UsersIcon } from "lucide-react"

const TaskTable = ({ tasks }) => {
    const ICONS = {
        high: <MdKeyboardDoubleArrowUp />,
        medium: <MdKeyboardArrowUp />,
        low: <MdKeyboardArrowDown />,
    }

    return (
        <div className="w-full md:w-2/3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl px-6 py-6 shadow-xl border border-slate-200 dark:border-slate-800 rounded-3xl">
            <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Recent Tasks</h3>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b border-slate-100 dark:border-slate-800">
                        <tr className="text-slate-500 dark:text-slate-400 text-left text-xs uppercase tracking-wider">
                            <th className="py-4 font-bold">Task Title</th>
                            <th className="py-4 font-bold">Priority</th>
                            <th className="py-4 font-bold">Team</th>
                            <th className="py-4 font-bold hidden md:table-cell">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks?.map((task, id) => (
                            <tr key={id} className="border-b border-slate-50 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={clsx("w-2 h-2 rounded-full", TASK_TYPE[task.stage])} />
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{task.title}</p>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex items-center gap-1.5">
                                        <span className={clsx("text-base", PRIOTITYSTYELS[task.priority])}>{ICONS[task.priority]}</span>
                                        <span className="capitalize text-xs font-semibold">{task.priority}</span>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="flex -space-x-2">
                                        {task.team.map((m, index) => (
                                            <div key={index} className={clsx("w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 text-white flex items-center justify-center text-[10px] font-bold overflow-hidden", BGS[index % BGS.length])}>
                                                <UserInfo user={m} />
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-4 hidden md:table-cell">
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{moment(task?.date).fromNow()}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const UserTable = ({ users }) => {
    return (
        <div className="w-full md:w-1/3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl px-6 py-6 shadow-xl border border-slate-200 dark:border-slate-800 rounded-3xl h-fit">
            <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-white">Active Users</h3>
            <div className="space-y-4">
                {users?.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-2xl bg-white/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl text-white flex items-center justify-center text-sm font-bold bg-gradient-to-br from-primary to-secondary">
                                {getInitials(user?.name)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{user.name}</p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{user?.role}</p>
                            </div>
                        </div>
                        <div className={clsx("w-2 h-2 rounded-full", user?.isActive ? "bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" : "bg-slate-300")} />
                    </div>
                ))}
            </div>
        </div>
    )
}

const Dashboard = () => {
    const { data, isLoading } = useGetDashboardStatsQuery()

    if (isLoading) {
        return <div className="py-10"><Loading /></div>
    }

    const totals = data?.tasks || {}
    const stats = [
        { label: "Total Tasks", count: data?.totalTasks || 0, icon: <Layout size={20} />, bg: "bg-primary", shadow: "shadow-primary/20" },
        { label: "Completed", count: totals["completed"] || 0, icon: <CheckCircle2 size={20} />, bg: "bg-emerald-500", shadow: "shadow-emerald-500/20" },
        { label: "In Progress", count: totals["in progress"] || 0, icon: <LuClipboardEdit size={20} />, bg: "bg-amber-500", shadow: "shadow-amber-500/20" },
        { label: "Team", count: data?.users?.length || 0, icon: <UsersIcon size={20} />, bg: "bg-violet-500", shadow: "shadow-violet-500/20" },
    ]

    return (
        <div className="h-full py-4 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(({ icon, bg, label, count, shadow }, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-slate-900 p-6 shadow-lg border border-slate-100 dark:border-slate-800 rounded-3xl flex items-center justify-between group"
                    >
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
                            <span className="text-3xl font-black text-slate-800 dark:text-white">{count}</span>
                        </div>
                        <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all group-hover:scale-110", bg, shadow)}>
                            {icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                        <h4 className="text-lg font-bold text-slate-800 dark:text-white">Task Distribution</h4>
                        <span className="text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full">By Priority</span>
                    </div>
                    <div className="h-[300px]">
                        <PriorityChart data={data?.graphData} />
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                        <h4 className="text-lg font-bold text-slate-800 dark:text-white">Completion</h4>
                        <span className="text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full">By Status</span>
                    </div>
                    <div className="h-[300px] flex items-center justify-center relative">
                        <StatusChart data={totals} />
                        <div className="absolute flex flex-col items-center">
                            <span className="text-2xl font-black text-slate-800 dark:text-white">
                                {Math.round((totals["completed"] / data?.totalTasks) * 100) || 0}%
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Done</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tables Row */}
            <div className="flex flex-col lg:flex-row gap-6 pb-8">
                <TaskTable tasks={data?.last10Task} />
                <UserTable users={data?.users} />
            </div>
        </div>
    )
}

export default Dashboard
