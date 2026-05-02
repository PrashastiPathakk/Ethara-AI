import clsx from "clsx"
import React, { useState } from "react"
import {
    MdAttachFile,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdKeyboardDoubleArrowUp,
    MdMoreVert,
} from "react-icons/md"
import { useSelector } from "react-redux"
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils"
import TaskDialog from "./task/TaskDialog"
import { BiMessageAltDetail } from "react-icons/bi"
import { FaList } from "react-icons/fa"
import UserInfo from "./UserInfo"
import { IoMdAdd } from "react-icons/io"
import AddSubTask from "./task/AddSubTask"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Circle, Clock } from "lucide-react"
import { getDueDateColor } from "../utils/dateUtils"
import { useToggleSubTaskMutation } from "../redux/slices/api/taskApiSlice"
import { triggerConfetti } from "../utils/confetti"
import { toast } from "sonner"

const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
}

const TaskCard = ({ task }) => {
    const { user } = useSelector((state) => state.auth)
    const [open, setOpen] = useState(false)
    const [showSubtasks, setShowSubtasks] = useState(false)

    const [toggleSubtask] = useToggleSubTaskMutation()

    const handleToggleSubtask = async (subId, isCompleted) => {
        try {
            await toggleSubtask({ id: task._id, subId }).unwrap()
            if (!isCompleted) triggerConfetti()
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }

    const completedSubtasks = task?.subTasks?.filter(st => st.isCompleted).length || 0

    return (
        <>
            <motion.div 
                whileHover={{ y: -4, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                className="w-full bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm transition-all group"
            >
                <div className="w-full flex justify-between items-start mb-3">
                    <div
                        className={clsx(
                            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            task?.priority === "high" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                            task?.priority === "medium" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" :
                            "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        )}
                    >
                        <span className="text-xs">{ICONS[task?.priority]}</span>
                        <span>{task?.priority}</span>
                    </div>

                    <TaskDialog task={task} />
                </div>

                <div className="mb-4">
                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {task?.title}
                    </h4>
                    <div className={clsx("flex items-center gap-2 text-xs font-medium", getDueDateColor(task?.date))}>
                        <Clock size={12} />
                        <span>{formatDate(new Date(task?.date))}</span>
                        {task?.category && (
                            <span className="ml-auto bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-medium text-slate-500">
                                {task.category}
                            </span>
                        )}
                    </div>
                </div>

                <div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800 mb-4" />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400" title="Activities">
                            <BiMessageAltDetail size={14} />
                            <span>{task?.activities?.length}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400" title="Subtasks">
                            <FaList size={12} />
                            <span>{completedSubtasks}/{task?.subTasks?.length}</span>
                        </div>
                    </div>

                    <div className="flex -space-x-2">
                        {task?.team?.slice(0, 3).map((m, index) => (
                            <div
                                key={index}
                                className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-primary text-white flex items-center justify-center text-[10px] font-bold overflow-hidden"
                            >
                                <UserInfo user={m} />
                            </div>
                        ))}
                        {task?.team?.length > 3 && (
                            <div className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center text-[10px] font-bold">
                                +{task.team.length - 3}
                            </div>
                        )}
                    </div>
                </div>

                {/* Subtask preview / toggle */}
                {task?.subTasks?.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-50 dark:border-slate-800/50">
                        <button 
                            onClick={() => setShowSubtasks(!showSubtasks)}
                            className="text-[10px] font-bold text-slate-400 dark:text-slate-500 hover:text-primary transition-colors flex items-center gap-1"
                        >
                            {showSubtasks ? "HIDE SUBTASKS" : "SHOW SUBTASKS"}
                        </button>

                        <AnimatePresence>
                            {showSubtasks && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden mt-2 space-y-2"
                                >
                                    {task.subTasks.map((st, i) => (
                                        <div 
                                            key={i} 
                                            className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-1 rounded transition-colors"
                                            onClick={() => handleToggleSubtask(st._id, st.isCompleted)}
                                        >
                                            {st.isCompleted ? 
                                                <CheckCircle2 size={14} className="text-emerald-500" /> : 
                                                <Circle size={14} className="text-slate-300 dark:text-slate-700" />
                                            }
                                            <span className={st.isCompleted ? "line-through opacity-50" : ""}>{st.title}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                <div className="mt-4 pt-2">
                    <button
                        onClick={() => setOpen(true)}
                        className="w-full flex items-center gap-2 text-[11px] font-bold text-slate-400 hover:text-primary transition-colors py-1 px-2 rounded-lg hover:bg-primary/5"
                    >
                        <IoMdAdd size={16} />
                        <span>ADD SUBTASK</span>
                    </button>
                </div>
            </motion.div>

            <AddSubTask open={open} setOpen={setOpen} id={task._id} />
        </>
    )
}

export default TaskCard
