import React, { useState } from "react";
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    defs,
    linearGradient,
    stop
} from "recharts";

// Sample data for 30 days
const sampleData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(2025, 0, i + 1); // January 2025
    const effectiveDate = date.toISOString().split("T")[0];
    const cena = (4 + Math.random() * 0.2).toFixed(3); // Random values around 4.0
    return { effectiveDate, cena: parseFloat(cena) };
});

const ExchangeRate = (props) => {

    return (
        <div className="bg-transparent text-white p-4 rounded" style={{ fontFamily: 'Helvetica', color: "red"}}>
            <div className="flex items-center justify-center h-[320px] w-full">
                <div style={{ width: "100%", height: "100%" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sampleData}>
                            <defs>
                                <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#00FF8C" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#00FF8C" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="0" horizontal={true} vertical={false} />
                            <XAxis
                                dataKey="effectiveDate"
                                axisLine={true}
                                tickLine={true}
                                tick={{ fontSize: 14, fontFamily: 'Helvetica'}}
                                minTickGap={15}
                                tickFormatter={(date) => {
                                    const d = new Date(date);
                                    const month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
                                    const day = d.getDate();
                                    return `${month} ${day}`;
                                }}
                                ticks={sampleData.filter((_, index) => index === 9 || index === 19).map(item => item.effectiveDate)}
                            />
                            <YAxis
                                domain={["auto", "auto"]}
                                tickCount={4}
                                tick={{ fontSize: 12 }}
                                tickFormatter={(tick) => tick.toFixed(2)}
                                axisLine={true}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgb(10,18,23)",
                                    color: "#fff",
                                    borderRadius: "5px",
                                    padding: "5px",
                                }}
                                formatter={(value, name, props) => {
                                    const displayDate = props.payload.date ||
                                        props.payload.effectiveDate ||
                                        "N/A";
                                    return [`${value} PLN on ${displayDate}`];
                                }}
                            />
                            <Area
                                type="linear"
                                dataKey="cena"
                                stroke="#00FF8C"
                                strokeWidth={2}
                                fill="url(#colorArea)"
                                isAnimationActive={true}
                                animationDuration={500}
                                dot={{ r:4 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default ExchangeRate;