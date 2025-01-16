import { useGlobalContext } from "../components/context/GlobalContext";
import visaData from "../data/visa_data.json";


const normalizeCountryName = (name) => {
    return name?.toLowerCase().replace(/^the\s+/i, "").trim();
};


const normalizeVisaData = (data) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
        acc[normalizeCountryName(key)] = value.map((entry) => ({
            ...entry,
            destination: normalizeCountryName(entry.destination),
        }));
        return acc;
    }, {});
};

const CountrySelector = ({ currentCountry }) => {
    const { selectedCountry, setSelectedCountry } = useGlobalContext();

    const normalizedVisaData = normalizeVisaData(visaData);
    const normalizedCurrentCountry = normalizeCountryName(currentCountry);

    console.log("Normalized current country:", normalizedCurrentCountry);
    console.log("Sample normalized visa data:", Object.keys(normalizedVisaData).slice(0, 5)); // Wyświetl pierwsze 5 krajów
    console.log("Sample destinations for a country:", normalizedVisaData["afghanistan"]);

    const validCountries = Object.keys(normalizedVisaData).filter((country) =>
        normalizedVisaData[country]?.some(
            (entry) =>
                entry.destination === normalizedCurrentCountry &&
                entry.details?.trim()
        )
    );

    console.log("Valid countries:", validCountries);

    if (!validCountries.length) {
        return (
            <div className="flex flex-col bg-[#111111] p-6 rounded-lg items-center w-full">
                <p className="text-white text-center">
                    No visa information available for this country.
                </p>
            </div>
        );
    }

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
                {validCountries.map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CountrySelector;
