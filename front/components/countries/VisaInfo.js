import { FaPassport, FaExternalLinkAlt } from "react-icons/fa";

const VisaInfo = ({ description, link }) => (
    <div className="bg-green-800 p-4 text-white flex items-center space-x-4">
        <FaPassport className="w-6 h-6" />
        <div>
            <p className="font-bold">{description}</p>
            <p className="text-sm flex items-center">
                View visa requirements on the official website
                <a href={link}>
                    <FaExternalLinkAlt className="ml-2 w-4 h-4" />
                </a>
            </p>
        </div>
    </div>
);

export default VisaInfo;
