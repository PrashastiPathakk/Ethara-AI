import { isToday, isPast, isFuture, format } from "date-fns"

export const getDueDateColor = (date) => {
    if (!date) return "text-slate-500"
    const d = new Date(date)
    if (isPast(d) && !isToday(d)) return "text-red-500"
    if (isToday(d)) return "text-orange-500"
    if (isFuture(d)) return "text-emerald-500"
    return "text-slate-500"
}

export const formatDatePretty = (date) => {
    if (!date) return ""
    return format(new Date(date), "MMM d, yyyy")
}
