"use client";

import React, { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import Button from "@/components/Button";

const ExchangeRate = ({ initialFromCurrency, initialToCurrency }) => {
    const [fromCurrency, setFromCurrency] = useState(initialFromCurrency);
    const [toCurrency, setToCurrency] = useState(initialToCurrency);
    const [data, setData] = useState([]);
    const [currentRate, setCurrentRate] = useState(null);

    // Update currencies when props change
    useEffect(() => {
        setFromCurrency(initialFromCurrency);
        setToCurrency(initialToCurrency);
    }, [initialFromCurrency, initialToCurrency]);

    const getPastDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 1; i <= 29; i++) {
            const pastDate = new Date(today);
            pastDate.setDate(today.getDate() - i);
            const formattedDate = pastDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
            dates.push(formattedDate);
        }
        return dates.reverse();
    };

    useEffect(() => {
        async function fetchCurrencyData() {
            // Skip fetching data if both currencies are the same
            if (fromCurrency === toCurrency) {
                const sameCurrencyData = getPastDates().map((date) => ({
                    date,
                    rate: 1,
                }));
                setData(sameCurrencyData);
                setCurrentRate(1);
                return;
            }

            const dates = getPastDates();
            const fetchedData = [];

            for (const date of dates) {
                try {
                    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${fromCurrency}.json`;
                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const jsonData = await response.json();
                    const rate = jsonData?.[fromCurrency]?.[toCurrency];

                    if (rate !== undefined) {
                        fetchedData.push({
                            date,
                            rate,
                        });
                    }
                } catch (error) {
                    console.error(`Failed to fetch data for date ${date}:`, error);
                }
            }

            try {
                const todayUrl = `https://api.exconvert.com/fetchOne?access_key=8c8b801b-b7ce438d-778ff807-739845bd&from=${fromCurrency}&to=${toCurrency}`;
                const todayResponse = await fetch(todayUrl);

                if (!todayResponse.ok) {
                    throw new Error(`HTTP error! status: ${todayResponse.status}`);
                }

                const todayData = await todayResponse.json();
                const todayRate = todayData?.result?.[toCurrency?.toUpperCase()] || null;

                if (todayRate !== null) {
                    const formattedToday = {
                        date: new Date().toISOString().split("T")[0],
                        rate: parseFloat(todayRate.toFixed(3)),
                    };

                    fetchedData.push(formattedToday);
                    setCurrentRate(formattedToday.rate);
                }
            } catch (error) {
                console.error("Failed to fetch today's data:", error);
            }

            setData(fetchedData);
        }

        fetchCurrencyData();
    }, [fromCurrency, toCurrency]); // Ensure data fetch runs when currencies change

    // Handle switch comparison
    const handleSwitchComparison = () => {
        setFromCurrency(toCurrency || "usd");
        setToCurrency(fromCurrency || "pln");
    };

    return (
        <div className="bg-transparent text-white p-4 rounded">
            <div className="flex flex-col items-center">
                {/* Current Rate and Switch Button */}
                <div className="mb-4 flex items-center w-full justify-end gap-10 lg:gap-5 xl:gap-10 2xl:gap-20">
                    <div className="text-xl font-inter font-bold text-green-400">
                        {`1 ${fromCurrency?.toUpperCase() || "N/A"} = ${
                            currentRate || "N/A"
                        } ${toCurrency?.toUpperCase() || "N/A"}`}
                    </div>
                    <button>
                        <Button
                            type={"button-contrast"}
                            onPress={handleSwitchComparison}
                            color={"#0a6c0f"}
                            text={"Switch"}
                        />
                    </button>
                </div>
                <div className="flex items-center justify-center h-[320px] w-full">
                    {data.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#00FF8C" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#00FF8C" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(date) => {
                                        const d = new Date(date);
                                        const month = d
                                            .toLocaleString("default", { month: "short" })
                                            .toUpperCase();
                                        const day = d.getDate();
                                        return `${month} ${day}`;
                                    }}
                                />
                                <YAxis
                                    tickFormatter={(tick) => tick.toFixed(2)}
                                    domain={["auto", "auto"]}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "rgb(10,18,23)",
                                        color: "#fff",
                                        borderRadius: "5px",
                                        padding: "5px",
                                    }}
                                    formatter={(value, name, props) => {
                                        const displayDate =
                                            props.payload?.date || "N/A";
                                        return [`${value} ${toCurrency?.toUpperCase() || "N/A"}`, `Date: ${displayDate}`];
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="rate"
                                    stroke="#00FF8C"
                                    strokeWidth={2}
                                    fill="url(#colorArea)"
                                    isAnimationActive
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div>Loading exchange rate data...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExchangeRate;
