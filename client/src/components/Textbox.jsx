import React from "react"
import clsx from "clsx"

const Textbox = React.forwardRef(
    ({ type, placeholder, label, className, register, name, error }, ref) => {
        return (
            <div className="w-full flex flex-col gap-1.5">
                {label && (
                    <label htmlFor={name} className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                        {label}
                    </label>
                )}

                <div className="relative">
                    <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        ref={ref}
                        {...register}
                        aria-invalid={error ? "true" : "false"}
                        className={clsx(
                            "w-full bg-white dark:bg-slate-800 px-4 py-3 border border-slate-200 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100 outline-none text-sm transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl",
                            error ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "",
                            className
                        )}
                    />
                </div>
                {error && (
                    <span className="text-xs text-red-500 mt-1 ml-1 font-medium">
                        {error}
                    </span>
                )}
            </div>
        )
    }
)
export default Textbox
