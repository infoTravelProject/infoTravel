import { useRouter } from "next/router";
import countries from "../../../data/countries.json";
import attractionsData from "../../../data/attractions_all_countries.json";
import CountryHeader from "../../../components/countries/CountryHeader";
import HeaderBar from "../../../components/countries/HeaderBar";
import CountryPageSection from "../../../components/countries/CountryPageSection";
import RecommendationCard from "../../../components/countries/RecommendationCard";
import VisaInfo from "../../../components/countries/VisaInfo";
import BorderInfo from "../../../components/countries/BorderInfo";
import MembershipInfo from "../../../components/countries/MembershipInfo";
import CurrencyInfo from "../../../components/countries/CurrencyInfo";
import Notifications from "../../../components/countries/Notifications";
import AttractionsGallery from "../../../components/countries/AttractionsGallery";
import CountrySelector from "../../../components/CountrySelector";
import {useEffect, useState} from "react";
import {notFound} from "next/navigation";
import {useGlobalContext} from "@/components/context/GlobalContext";



export default function CountryPage() {
    const router = useRouter();
    const [countryDBData, setCountryDBData] = useState(null);
    const [selectedCountryDBData, setSelectedCountryDBData] = useState(null);
    const { selectedCountry, setSelectedCountry } = useGlobalContext();
    const { country } = router.query;

    const normalizeCountryName = (name) => {
        return name?.toLowerCase().replace(/^the\s+/i, "").trim();
    };


    const normalizedCountry = normalizeCountryName(country);

    useEffect(() => {
        if (!normalizedCountry) return;

        const fetchData = async () => {
            try {
                console.log(normalizedCountry);
                const response = await fetch(`http://localhost:8080/api/country/name/${encodeURIComponent(normalizedCountry)}`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Country not found");
                }

                const countryFromDBData = await response.json();
                setCountryDBData(countryFromDBData.data);
                console.log(countryFromDBData);
                console.log(countryDBData);
            } catch (error) {
                console.log(error);
            } finally {
                // Optional cleanup or final actions
            }
        };

        fetchData();
    }, [normalizedCountry]);

    useEffect(() => {
        if (!selectedCountry) return;

        const fetchData = async () => {
            try {
                console.log(selectedCountry);
                const response = await fetch(`http://localhost:8080/api/country/name/${encodeURIComponent(selectedCountry)}`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error("Country not found");
                }

                const countryFromDBData = await response.json();
                setSelectedCountryDBData(countryFromDBData.data);
                console.log(countryFromDBData);
                console.log(selectedCountryDBData);
            } catch (error) {
                console.log(error);
            } finally {
                // Optional cleanup or final actions
            }
        };

        fetchData();
    }, [selectedCountry]);

    const normalizedCountries = Object.entries(countries).reduce((acc, [key, value]) => {
        acc[normalizeCountryName(key)] = value;
        return acc;
    }, {});

    const countryData = normalizedCountries[normalizedCountry] || null;

    const normalizedAttractionsData = Object.entries(attractionsData).reduce((acc, [key, value]) => {
        acc[normalizeCountryName(key)] = value;
        return acc;
    }, {});
    const countryAttractions = normalizedAttractionsData[normalizedCountry] || [];

    if (!countryData) {
        return <p className="text-white">Country data not found.</p>;
    }

    return (
        <div className="text-white bg-[#121212]">
            {/* Render only if countryDBData is available */}
            {countryDBData ? (
                <>
                    {/* Country header */}
                    <CountryHeader
                        countryName={countryDBData.name}
                        flagSrc={countryDBData.flagUrl}
                        backgroundSrc={countryData.background}
                    />

                    {/* Header bar */}
                    <HeaderBar {...countryData.risk} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-16 py-8">
                        {/* Left column */}
                        <div className="md:col-span-2 space-y-8">
                            <CountryPageSection title="Summary" content={countryData.summary} />
                            <RecommendationCard {...countryData.recommendation} />
                        </div>

                        {/* Right column */}
                        <div className="space-y-1">
                            <CountrySelector currentCountry={normalizedCountry} />
                            <CurrencyInfo
                                currency={!!countryDBData ? countryDBData.currency.toLowerCase() : "pln"}
                                toCurrency={!!selectedCountryDBData ? selectedCountryDBData.currency.toLowerCase() : "pln"}
                            />
                            <VisaInfo currentCountry={normalizedCountry} />
                            <BorderInfo {...countryData.borderControl} />
                            <MembershipInfo memberships={countryData.memberships} />
                            <Notifications items={countryData.notifications} />
                        </div>
                    </div>

                    {/* Gallery of attractions */}
                    <div className="px-16 py-4">
                        <h2 className="text-2xl font-bold mb-2">Recommended Points of Interest</h2>
                        <hr className="h-px mb-12 bg-gray-700 border-0" />
                        <AttractionsGallery attractions={countryAttractions} />
                    </div>

                    {/* Additional sections */}
                    <div className="px-16 py-8 mb-8">
                        {countryData.sections.map((section, index) => (
                            <CountryPageSection key={index} {...section} />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-white">Loading country data...</p>
            )}
        </div>
    );
}