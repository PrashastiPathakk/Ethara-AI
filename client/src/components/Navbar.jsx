import React from "react"
import { MdOutlineSearch } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { setOpenSidebar } from "../redux/slices/authSlice"
import UserAvatar from "./UserAvatar"
import NotificationPanel from "./NotificationPanel"
import ThemeToggle from "./ThemeToggle"
import { Search, Menu } from "lucide-react"

const Navbar = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    return (
        <div className="flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-3 sticky z-20 top-0 transition-colors">
            <div className="flex gap-4 items-center">
                <button
                    onClick={() => dispatch(setOpenSidebar(true))}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:hidden transition-colors"
                >
                    <Menu size={24} />
                </button>

                <div className="hidden sm:flex w-64 lg:w-[400px] items-center py-2 px-4 gap-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/5 transition-all group">
                    <Search className="text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search tasks, teams..."
                        className="flex-1 outline-none bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-700 dark:text-slate-200 text-sm"
                    />
                    <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[10px] font-bold text-slate-400">
                        <span className="text-xs">/</span>
                    </kbd>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <ThemeToggle />
                <NotificationPanel />
                <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />
                <UserAvatar />
            </div>
        </div>
    )
}

export default Navbar
