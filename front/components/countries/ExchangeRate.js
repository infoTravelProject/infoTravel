"use client"

import React, {useEffect, useState} from "react";
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
import {ReflectAdapter as axios} from "next/dist/server/web/spec-extension/adapters/reflect";

const ExchangeRate = ({ fromCurrency }) => {
    // Zamienic na wymagana walute
    const toCurrency = "pln"
    const [data, setData] = useState([]);

    // Helper function to calculate date for the past days
    function getPastDates() {
        const dates = [];
        const today = new Date();
        for (let i = 1; i <= 29; i++) {
            const pastDate = new Date(today);
            pastDate.setDate(today.getDate() - i);
            const formattedDate = pastDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            dates.push(formattedDate);
        }
        return dates.reverse();
    }

    useEffect(() => {
        async function fetchCurrencyData() {
            const dates = getPastDates();
            const fetchedData = [];

            for (const date of dates) {
                try {
                    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${fromCurrency}.json`;
                    console.log(url);
                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();

                    // Structure the object with base and rate
                    const formattedData = {
                        date: date,
                        rate: data[fromCurrency][toCurrency]
                    };

                    console.log("Formatted: ", data)

                    fetchedData.push(formattedData);
                } catch (error) {
                    console.error(`Failed to fetch data for date ${date}:`, error);
                }
            }

            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

            try {
                const url = `https://api.exconvert.com/fetchOne?access_key=8c8b801b-b7ce438d-778ff807-739845bd&from=${fromCurrency}&to=${toCurrency}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Structure the object with base and rate
                const formattedData = {
                    date: formatDate(new Date()),
                    rate: data.result[toCurrency.toUpperCase()].toFixed(3),
                };

                fetchedData.push(formattedData);
            } catch (error) {
                console.error(`Failed to fetch data for today`, error);
            }

            setData(fetchedData)
            console.log(fetchedData);
        }

        fetchCurrencyData();
    }, []);

    return (
        <div className="bg-transparent text-white p-4 rounded" style={{ fontFamily: 'Helvetica', color: "red"}}>
            <div className="flex items-center justify-center h-[320px] w-full">
                <div style={{ width: "100%", height: "100%" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#00FF8C" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#00FF8C" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="0" horizontal={true} vertical={false} />
                            <XAxis
                                dataKey="date"
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
                                ticks={data.filter((_, index) => index === 9 || index === 19).map(item => item.effectiveDate)}
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
                                dataKey="rate"
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