import { Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment, useRef } from "react"
import { IoClose } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"
import { Toaster } from "sonner"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Login from "./pages/Login"
import Landing from "./pages/Landing"
import PublicShareView from "./pages/PublicShareView"
import TaskDetails from "./pages/TaskDetails"
import Tasks from "./pages/Tasks"
import Trash from "./pages/Trash"
import Users from "./pages/Users"
import Dashboard from "./pages/Dashboard"
import { setOpenSidebar, setOpenTaskModal } from "./redux/slices/authSlice"
import AddTask from "./components/task/AddTask"
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts"

function Layout() {
    const { user, isTaskModalOpen } = useSelector((state) => state.auth)
    const { theme } = useSelector((state) => state.theme)
    const location = useLocation()
    const dispatch = useDispatch()

    useKeyboardShortcuts((val) => dispatch(setOpenTaskModal(val)))

    return user ? (
        <div className={clsx("w-full h-screen flex flex-col md:flex-row transition-colors duration-300", theme === "dark" ? "bg-dark-bg text-white" : "bg-[#f3f4f6]")}>
            <div className="w-1/5 h-screen bg-white dark:bg-slate-900 sticky top-0 hidden md:block border-r border-slate-200 dark:border-slate-800">
                <Sidebar />
            </div>

            <MobileSidebar />

            <div className="flex-1 overflow-y-auto">
                <Navbar />

                <div className="p-4 2xl:px-10">
                    <Outlet />
                </div>
            </div>

            <AddTask 
                open={isTaskModalOpen} 
                setOpen={(val) => dispatch(setOpenTaskModal(val))} 
            />
        </div>
    ) : (
        <Navigate to="/landing" state={{ from: location }} replace />
    )
}

const MobileSidebar = () => {
    const { isSidebarOpen } = useSelector((state) => state.auth)
    const mobileMenuRef = useRef(null)
    const dispatch = useDispatch()

    const closeSidebar = () => {
        dispatch(setOpenSidebar(false))
    }

    return (
        <>
            <Transition
                show={isSidebarOpen}
                as={Fragment}
                enter="transition-opacity duration-700"
                enterFrom="opacity-x-10"
                enterTo="opacity-x-100"
                leave="transition-opacity duration-700"
                leaveFrom="opacity-x-100"
                leaveTo="opacity-x-0"
            >
                {(ref) => (
                    <div
                        ref={(node) => (mobileMenuRef.current = node)}
                        className={clsx(
                            "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
                            isSidebarOpen ? "translate-x-0" : "translate-x-full"
                        )}
                        onClick={() => closeSidebar()}
                    >
                        <div className="bg-white dark:bg-slate-900 w-3/4 h-full">
                            <div className="w-full flex justify-end px-5 mt-5">
                                <button
                                    onClick={() => closeSidebar()}
                                    className="flex justify-end items-end dark:text-white"
                                >
                                    <IoClose size={25} />
                                </button>
                            </div>

                            <div className="-mt-10">
                                <Sidebar />
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </>
    )
}

function App() {
    const { theme } = useSelector((state) => state.theme)

    return (
        <main className={clsx("w-full min-h-screen transition-colors duration-300", theme === "dark" ? "dark bg-dark-bg" : "bg-[#f3f4f6]")}>
            <Routes>
                <Route path="/landing" element={<Landing />} />
                <Route path="/share/:id" element={<PublicShareView />} />
                <Route element={<Layout />}>
                    <Route
                        index
                        path="/"
                        element={<Navigate to="/dashboard" />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/completed/:status" element={<Tasks />} />
                    <Route path="/in-progress/:status" element={<Tasks />} />
                    <Route path="/todo/:status" element={<Tasks />} />
                    <Route path="/team" element={<Users />} />
                    <Route path="/trashed" element={<Trash />} />
                    <Route path="/task/:id" element={<TaskDetails />} />
                </Route>

                <Route path="/log-in" element={<Login />} />
            </Routes>

            <Toaster richColors />
        </main>
    )
}

export default App