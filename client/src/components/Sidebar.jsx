import React from "react"
import {
    MdDashboard,
    MdOutlineAddTask,
    MdOutlinePendingActions,
    MdSettings,
    MdTaskAlt,
} from "react-icons/md"
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { setOpenSidebar, setOpenTaskModal } from "../redux/slices/authSlice"
import clsx from "clsx"
import { Layout, CheckCircle2, Clock, Users, Trash2, Settings, ListTodo, Briefcase } from "lucide-react"

const linkData = [
    {
        label: "Dashboard",
        link: "dashboard",
        icon: <Layout size={20} />,
    },
    {
        label: "Tasks",
        link: "tasks",
        icon: <ListTodo size={20} />,
    },
    {
        label: "Completed",
        link: "completed/completed",
        icon: <CheckCircle2 size={20} />,
    },
    {
        label: "In Progress",
        link: "in-progress/in progress",
        icon: <Clock size={20} />,
    },
    {
        label: "To Do",
        link: "todo/todo",
        icon: <Clock size={20} />,
    },
    {
        label: "Team",
        link: "team",
        icon: <Users size={20} />,
    },
    {
        label: "Trash",
        link: "trashed",
        icon: <Trash2 size={20} />,
    },
]

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth)
    const { theme } = useSelector((state) => state.theme)

    const dispatch = useDispatch()
    const location = useLocation()

    const path = location.pathname.split("/")[1]

    const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5)

    const closeSidebar = () => {
        dispatch(setOpenSidebar(false))
    }

    const NavLink = ({ el }) => {
        const isActive = path === el.link.split("/")[0]
        return (
            <Link
                to={el.link}
                onClick={closeSidebar}
                className={clsx(
                    "w-full flex gap-3 px-4 py-2.5 rounded-xl items-center text-sm font-medium transition-all duration-200 group",
                    isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary"
                )}
            >
                <span className={clsx("transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-400 group-hover:text-primary")}>
                    {el.icon}
                </span>
                <span>{el.label}</span>
            </Link>
        )
    }

    return (
        <div className="w-full h-full flex flex-col gap-8 p-6 bg-white dark:bg-slate-900 transition-colors">
            <Link to="/" className="flex gap-2 items-center px-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <Briefcase size={22} />
                </div>
                <span className="text-xl font-black tracking-tight text-slate-800 dark:text-white uppercase">
                    Ethara<span className="text-blue-600">Pro</span>
                </span>
            </Link>

            <div className="flex-1 flex flex-col gap-y-2">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-4 mb-2">Main Menu</p>
                {sidebarLinks.map((link) => (
                    <NavLink el={link} key={link.label} />
                ))}
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                {user?.isAdmin && (
                    <button 
                        onClick={() => dispatch(setOpenTaskModal(true))}
                        className="w-full flex gap-3 px-4 py-3 rounded-xl items-center text-sm font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 active:scale-95"
                    >
                        <MdOutlineAddTask size={20} />
                        <span>Quick Add Task</span>
                    </button>
                )}
                <Link 
                    to="/settings"
                    className="w-full flex gap-3 px-4 py-2.5 rounded-xl items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary transition-all group"
                >
                    <Settings size={20} className="text-slate-400 group-hover:text-primary" />
                    <span>Settings</span>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
