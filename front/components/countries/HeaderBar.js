import { IoIosNotifications } from "react-icons/io";

const HeaderBar = ({ riskLevel, description, lastUpdated, stillValid }) => (
    <div className="flex justify-between bg-[#AB4D1F] px-2 py-8 font-inter">
        <div className="ml-16 space-y-2">
            <h2 className="text-xl font-bold">{riskLevel || "Unknown"}</h2>
            <p className="text-sm italic">{description || "Unknown"}</p>
        </div>
        <div className="flex items-center space-x-4 text-xs border-l-2 pl-8 mr-12">
            <div className="space-y-1">
                <p>
                    LAST UPDATED: <span className="font-bold">{lastUpdated || "Unknown"}</span>
                </p>
                <p>
                    STILL VALID: <span className="font-bold">{stillValid || "Unknown"}</span>
                </p>
            </div>
            <IoIosNotifications className="w-8 h-8" />
        </div>
    </div>
);


export default HeaderBar;
