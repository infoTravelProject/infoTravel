import { FaX, FaCheck } from "react-icons/fa6";

const MembershipInfo = ({ memberships }) => (
    <div className="bg-[#111111] p-4 text-white flex justify-end items-center mb-4 space-x-6">
        {Object.entries(memberships).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
                <span className="font-bold">{key}</span>
                {value ? (
                    <FaCheck className="text-green-500 w-5 h-5" />
                ) : (
                    <FaX className="text-red-600 w-4 h-4" />
                )}
            </div>
        ))}
    </div>
);

export default MembershipInfo;
