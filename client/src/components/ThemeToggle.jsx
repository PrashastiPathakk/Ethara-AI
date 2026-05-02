import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "../redux/slices/themeSlice"
import { Sun, Moon } from "lucide-react"

const ThemeToggle = () => {
    const dispatch = useDispatch()
    const { theme } = useSelector((state) => state.theme)

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        dispatch(setTheme(newTheme))
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }

    React.useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300"
        >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    )
}

export default ThemeToggle
