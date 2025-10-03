import React from "react"
import {
    AreaChart as RechartsAreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts"

const data = [
    { name: "Jan", uv: 4000 },
    { name: "Feb", uv: 3000 },
    { name: "Mar", uv: 2000 },
    { name: "Apr", uv: 2780 },
    { name: "May", uv: 1890 },
    { name: "Jun", uv: 2390 },
    { name: "Jul", uv: 3490 },
]

export const AreaChart = () => {
    return (
        <RechartsAreaChart
            width={300}   
            height={150}     
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
            </defs>

            {/* X axis bên dưới */}
            <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
            />

            {/* Y axis bên phải */}
            <YAxis
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
            />

            <Tooltip
                contentStyle={{ fontSize: 12 }}
                cursor={{ stroke: "#ccc", strokeWidth: 1 }}
            />

            <Area
                type="monotone"
                dataKey="uv"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
                dot={false}        // bỏ mấy cái chấm
                activeDot={false}  // bỏ chấm khi hover
            />
        </RechartsAreaChart>
    )
}