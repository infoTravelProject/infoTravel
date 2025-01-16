import { useGlobalContext } from "../components/context/GlobalContext";
import visaData from "../data/visa_data.json";

const CountrySelector = () => {
    const { selectedCountry, setSelectedCountry } = useGlobalContext();

    return (
        <div className="flex flex-col bg-[#111111] p-6 rounded-lg items-center w-full">
            <label htmlFor="country-select" className="block text-white font-bold mb-2 text-center">
                Where are you from?
            </label>
            <select
                id="country-select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-1/2 p-2 bg-gray-700 text-white rounded-md"
            >
                {Object.keys(visaData).map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CountrySelector;
