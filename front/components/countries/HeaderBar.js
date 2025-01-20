import { IoIosNotifications } from "react-icons/io";

const HeaderBar = ({ riskLevel, description, lastUpdated, stillValid }) => {
    let color = "#8e3b1d"
    const safetyDescription = [{
        0: {label: "You're fine", description: "No safety concerns", color: "bg-green-900"},
        1: {label: "Generally safe", description: "No significant safety risks", color: "bg-[#2a6c22]"},
        2: {label: "Low safety risk", description: "Exercise basic safety precautions", color: "bg-lime-800"},
        3: {label: "Medium safety risk", description: "A degree of caution is advised", color: "bg-[#705e19]"},
        4: {label: "High safety risk", description: "Exercise a high degree of caution", color: "bg-[#8c4f16]"},
        5: {label: "Very high safety risk", description: "Travel only if necessary", color: "bg-[#8a2e1e]"},
        6: {label: "Do not travel!", description: "Very dangerous for any type of travel", color: "bg-it-red"},
        7: {label: "Good luck", description: "Godspeed", color: "bg-red-950"}
    }];

    const calculateTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const differenceInSeconds = Math.floor((now - date) / 1000);
        const units = [
            { label: "year", seconds: 60 * 60 * 24 * 365 },
            { label: "month", seconds: 60 * 60 * 24 * 30 },
            { label: "week", seconds: 60 * 60 * 24 * 7 },
            { label: "day", seconds: 60 * 60 * 24 },
            { label: "hour", seconds: 60 * 60 },
            { label: "minute", seconds: 60 },
            { label: "second", seconds: 1 },
        ];
        for (const unit of units) {
            const interval = Math.floor(differenceInSeconds / unit.seconds);
            if (interval >= 1) {
                return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
            }
        }
        return "just now";
    };

    return (
        <div className={`flex flex-col lg:flex-row justify-center lg:justify-between ${safetyDescription[0][riskLevel].color || 'bg-neutral-800'} px-2 py-8 font-inter text-white/[0.9]`}>
            <div className="lg:ml-16 space-y-1 flex flex-col items-center lg:items-start flex-none">
                <h2 className="text-xl font-bold">{safetyDescription[0][riskLevel].label || "Unknown"}</h2>
                <p className="text-sm font-normal">{safetyDescription[0][riskLevel].description || "Unknown"}</p>
            </div>
            <div className="flex justify-center lg:justify-end items-center space-x-4 mr-12 mt-10 lg:mt-0">
                <div className={"w-3/5 lg:w-2/5 italic flex text-sm text-white/[0.8] min-w-64"}>{"\""}<div>{description&& description+"\""}</div></div>
                <div className="flex flex-col space-y-1 text-xs border-l-2 border-white/[0.7] pl-8 py-1 flex-none">
                    <p>
                        LAST UPDATED: <span className="font-semibold text-sm">{calculateTime(lastUpdated) || "Unknown"}</span>
                    </p>
                    <p>
                        STILL VALID: <span className="font-semibold text-sm">{calculateTime(stillValid) || "Unknown"}</span>
                    </p>
                </div>
                <IoIosNotifications className="w-8 h-8"/>
            </div>
        </div>
    );
};


export default HeaderBar;
