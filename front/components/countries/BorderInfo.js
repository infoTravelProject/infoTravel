import { FaPersonMilitaryPointing } from "react-icons/fa6";

const BorderInfo = ({ description, details }) => (
    <div className="bg-green-800 p-4 text-white flex items-center space-x-4">
        <FaPersonMilitaryPointing className="w-6 h-6" />
        <div>
            <p className="font-bold">{description}</p>
            <p className="text-sm">{details}</p>
        </div>
    </div>
);

export default BorderInfo;
