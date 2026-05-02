import React from "react"
import TaskCard from "./TaskCard"
import { motion } from "framer-motion"

const BoardView = ({ tasks }) => {
    const stages = ["backlog", "todo", "in progress", "done"]

    const stageColors = {
        backlog: "bg-slate-500",
        todo: "bg-blue-500",
        "in progress": "bg-yellow-500",
        done: "bg-emerald-500",
    }

    return (
        <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((stage, index) => (
                <div key={index} className="flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${stageColors[stage]}`} />
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                {stage}
                            </h3>
                            <span className="ml-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full">
                                {tasks?.filter((t) => t.stage === stage).length || 0}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 min-h-[200px]">
                        {tasks
                            ?.filter((task) => task.stage === stage)
                            .map((task, idx) => (
                                <motion.div
                                    key={task._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <TaskCard task={task} />
                                </motion.div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BoardView
