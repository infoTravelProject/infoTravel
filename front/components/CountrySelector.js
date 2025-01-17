import { useGlobalContext } from "@/components/context/GlobalContext";
import visaData from "../data/visa_data.json";
import Button from "@/components/Button";

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

    const validCountries = Object.keys(normalizedVisaData).filter((country) =>
        normalizedVisaData[country]?.some(
            (entry) =>
                entry.destination === normalizedCurrentCountry &&
                entry.details?.trim()
        )
    );
    const jsonArray = validCountries.map((item) =>({
        id: item.toString(),
        value: item.toString(),
        label: item.toString()
    }));
    function mapper(data, value){
        let returnItem;
        data.map(item => {
            if(item.value === value){
                returnItem = item;
            }
        });
        return returnItem;
    }
    function submitHandler(e){
        setSelectedCountry(e.value);
    }

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
            <div className={"w-1/2"}>
                <Button type={"select"} selectType={"simple"} label={"show information for:"}
                        selectData={jsonArray} selectDefault={mapper(jsonArray, selectedCountry)} onSelect={submitHandler}/>
            </div>
        </div>
    );
};

export default CountrySelector;
