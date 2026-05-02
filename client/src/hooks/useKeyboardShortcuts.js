import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useKeyboardShortcuts = (setOpenTaskModal) => {
    const navigate = useNavigate()

    useEffect(() => {
        const handleKeyDown = (e) => {
            // N for New Task
            if (e.key.toLowerCase() === "n" && !["input", "textarea"].includes(document.activeElement.tagName.toLowerCase())) {
                e.preventDefault()
                setOpenTaskModal(true)
            }

            // / for Search focus
            if (e.key === "/" && !["input", "textarea"].includes(document.activeElement.tagName.toLowerCase())) {
                e.preventDefault()
                const searchInput = document.querySelector('input[placeholder*="Search"]')
                if (searchInput) searchInput.focus()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [navigate, setOpenTaskModal])
}
