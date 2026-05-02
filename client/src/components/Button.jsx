import clsx from "clsx"
import React from "react"

const Button = ({ icon, className, label, type, onClick = () => {}, disabled = false }) => {
    return (
        <button
            type={type || "button"}
            disabled={disabled}
            className={clsx(
                "flex items-center justify-center gap-2 px-4 py-2.5 outline-none rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                className
            )}
            onClick={onClick}
        >
            {icon && <span className="text-current">{icon}</span>}
            {label && <span>{label}</span>}
        </button>
    )
}

export default Button
