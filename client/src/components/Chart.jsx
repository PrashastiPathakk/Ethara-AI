import React from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from "chart.js"
import { Bar, Doughnut } from "react-chartjs-2"
import { useSelector } from "react-redux"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
)

export const PriorityChart = ({ data }) => {
    const { theme } = useSelector((state) => state.theme)
    const isDark = theme === "dark"

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                },
                ticks: {
                    color: isDark ? "#94a3b8" : "#64748b",
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: isDark ? "#94a3b8" : "#64748b",
                },
            },
        },
    }

    const chartData = {
        labels: data?.map((item) => item.name) || [],
        datasets: [
            {
                label: "Tasks",
                data: data?.map((item) => item.total) || [],
                backgroundColor: [
                    "#6366f1", // indigo
                    "#a855f7", // violet
                    "#10b981", // emerald
                    "#f59e0b", // amber
                ],
                borderRadius: 8,
            },
        ],
    }

    return <Bar options={options} data={chartData} />
}

export const StatusChart = ({ data }) => {
    const { theme } = useSelector((state) => state.theme)
    const isDark = theme === "dark"

    const chartData = {
        labels: Object.keys(data || {}),
        datasets: [
            {
                data: Object.values(data || {}),
                backgroundColor: [
                    "#64748b", // backlog (slate)
                    "#3b82f6", // todo (blue)
                    "#f59e0b", // in progress (amber)
                    "#10b981", // done (emerald)
                ],
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    }

    const options = {
        cutout: "70%",
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: isDark ? "#94a3b8" : "#64748b",
                    usePointStyle: true,
                    padding: 20,
                },
            },
        },
    }

    return <Doughnut data={chartData} options={options} />
}
