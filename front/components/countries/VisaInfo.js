import { useGlobalContext } from "../context/GlobalContext";
import visaData from "../../data/visa_data.json";
import { FaPassport, FaExternalLinkAlt } from "react-icons/fa";
import { useState } from "react";

const normalizeCountryName = (name) => {
    return name?.toLowerCase().replace(/^the\s+/i, "").trim();
};

const visaStatusMap = {
    "Visa not required": "bg-green-600",
    "Visa-free": "bg-green-600",
    "Visa required": "bg-red-600",
    "Visa on arrival": "bg-yellow-500",
    "eVisa": "bg-blue-500",
    "Freedom of movement": "bg-indigo-500",
    "Admission refused": "bg-gray-600",
    "ESTA required": "bg-purple-600",
    "ETIAS required": "bg-purple-600",
    "Electronic Travel Authorization": "bg-cyan-500",
    Unknown: "bg-gray-800"
};


const getVisaClass = (details) => {
    if (!details) return visaStatusMap["Unknown"];
    const normalizedDetails = details.toLowerCase();

    if (normalizedDetails.includes("visa not required") || normalizedDetails.includes("visa-free")) {
        return visaStatusMap["Visa-free"];
    }
    if (normalizedDetails.includes("visa required")) {
        return visaStatusMap["Visa required"];
    }
    if (normalizedDetails.includes("visa on arrival")) {
        return visaStatusMap["Visa on arrival"];
    }
    if (normalizedDetails.includes("evisa")) {
        return visaStatusMap["eVisa"];
    }
    if (normalizedDetails.includes("freedom of movement")) {
        return visaStatusMap["Freedom of movement"];
    }
    if (normalizedDetails.includes("admission refused")) {
        return visaStatusMap["Admission refused"];
    }
    if (normalizedDetails.includes("esta required") || normalizedDetails.includes("etias required")) {
        return visaStatusMap["ETIAS required"];
    }
    if (normalizedDetails.includes("Electronic Travel Authorization")) {
        return visaStatusMap["Electronic Travel Authorization"];
    }
    return visaStatusMap["Unknown"];
};


const VisaInfo = ({ currentCountry }) => {
    const { selectedCountry } = useGlobalContext();
    const [showTooltip, setShowTooltip] = useState(false);

    const normalizedCurrentCountry = normalizeCountryName(currentCountry);
    const normalizedVisaData = Object.entries(visaData).reduce((acc, [key, value]) => {
        acc[normalizeCountryName(key)] = value;
        return acc;
    }, {});

    const visaRequirements = normalizedVisaData[normalizeCountryName(selectedCountry)]?.find(
        (entry) => normalizeCountryName(entry.destination) === normalizedCurrentCountry
    );

    const visaStatus = visaRequirements?.details || "Unknown";
    const visaClass = getVisaClass(visaRequirements?.details);

    return (
        <div className="w-full mt-4">
            {visaStatus !== "Unknown" && (
                <div
                    className={`relative p-4 text-white flex items-center space-x-4 rounded-md ${visaClass}`}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <FaPassport className="w-6 h-6" />
                    <div>
                        <p className="font-bold">{visaStatus}</p>
                        <p className="text-sm flex items-center">
                            View visa requirements on the official website
                            <a href="https://example.com" className="ml-2">
                                <FaExternalLinkAlt className="w-4 h-4" />
                            </a>
                        </p>
                    </div>

                    {/* Tooltip */}
                    {showTooltip && (
                        <div className="absolute top-[-60px] right-4 w-64 bg-gray-900 text-white text-sm p-3 rounded-md shadow-lg z-10 border-2 border-amber-600">
                            <p>
                                <strong>Details:</strong> {visaRequirements?.details || "N/A"}
                            </p>
                            <p>
                                <strong>Allowed Stay:</strong> {visaRequirements?.allowed_stay || "N/A"}
                            </p>
                            <p>
                                <strong>Notes:</strong> {visaRequirements?.notes || "N/A"}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VisaInfo;
