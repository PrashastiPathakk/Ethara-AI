import React, { useState } from "react"
import { FaList } from "react-icons/fa"
import { MdGridView } from "react-icons/md"
import { useParams } from "react-router-dom"
import Loading from "../components/Loader"
import Title from "../components/Title"
import Button from "../components/Button"
import { IoMdAdd } from "react-icons/io"
import Tabs from "../components/Tabs"
import TaskTitle from "../components/TaskTitle"
import BoardView from "../components/BoardView"
import Table from "../components/task/Table"
import { useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice"
import { useDispatch } from "react-redux"
import { setOpenTaskModal } from "../redux/slices/authSlice"

const TABS = [
    { title: "Board View", icon: <MdGridView /> },
    { title: "List View", icon: <FaList /> },
]

const Tasks = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [selected, setSelected] = useState(0)

    const status = params?.status || ""

    const { data, isLoading } = useGetAllTaskQuery({
        strQuery: status,
        isTrashed: "",
        search: "",
    })

    return isLoading ? (
        <div className="py-10">
            <Loading />
        </div>
    ) : (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <Title title={status ? `${status} Tasks` : "Tasks"} />

                {!status && (
                    <Button
                        onClick={() => dispatch(setOpenTaskModal(true))}
                        label="Create Task"
                        icon={<IoMdAdd className="text-lg" />}
                        className="flex flex-row-reverse gap-1 items-center bg-primary text-white rounded-xl py-2 px-4 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                    />
                )}
            </div>

            <Tabs tabs={TABS} setSelected={setSelected}>
                {!status && (
                    <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4 overflow-x-auto">
                        <TaskTitle label="Backlog" className="bg-slate-500" />
                        <TaskTitle label="To Do" className="bg-blue-500" />
                        <TaskTitle
                            label="In Progress"
                            className="bg-amber-500"
                        />
                        <TaskTitle
                            label="Done"
                            className="bg-emerald-500"
                        />
                    </div>
                )}

                {selected !== 1 ? (
                    <BoardView tasks={data?.tasks} />
                ) : (
                    <div className="w-full">
                        <Table tasks={data?.tasks} />
                    </div>
                )}
            </Tabs>
        </div>
    )
}

export default Tasks
