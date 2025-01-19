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
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import ExchangeRate from "@/pages/countries/[country]/ExchangeRate";

export default function CountryPage() {
    const router = useRouter();
    const [countryDBData, setCountryDBData] = useState(null);
    const { country } = router.query;

    const normalizeCountryName = (name) => {
        return name?.toLowerCase().replace(/^the\s+/i, "").trim();
    };

    const normalizedCountry = normalizeCountryName(country);

    const normalizedCountries = Object.entries(countries).reduce((acc, [key, value]) => {
        acc[normalizeCountryName(key)] = value;
        return acc;
    }, {});

    // Use useEffect to set countryDBData only once
    useEffect(() => {
        setCountryDBData({
            message: "Country retrieved successfully",
            status: 200,
            data: {
                countryId: 179,
                name: "United Kingdom",
                code: "GB",
                flagUrl: "https://flagcdn.com/w320/gb.png",
                region: "Northern Europe",
                subregion: "Northern Europe",
                population: 67886,
                area: 242495,
                capital: "London",
                currency: "GBP",
                officialLanguage: "English",
            },
            timestamp: 1737242205602,
        });
    }, []); // Empty dependency array ensures this runs only once

    const countryData = {
        risk: {
            riskLevel: "High safety risk",
            description: "Exercise a high degree of caution",
            lastUpdated: "7 August 2024",
            stillValid: "1 day ago",
        },
        background: "/london_test2.jpg",
        summary: "The United Kingdom (UK) is a captivating destination...",
        recommendation: {
            title: "Skye",
            description: "The Isle of Skye...",
            image: "/skye_test.jpg",
            flag: "/scotland_flag.png",
            buttonText: "Open in trip planner",
        },
        borderControl: {
            description: "Low-restrictive border control",
            details: "Border control should be quick...",
        },
        memberships: {
            EU: false,
            Schengen: false,
            NATO: true,
        },
        notifications: [
            { label: "Safety risks", description: "Get updated with new safety remarks" },
            { label: "Economy", description: "Get economic news" },
            { label: "Politics", description: "Get political news and updates" },
            { label: "Customs and Immigration", description: "Entry requirements..." },
            { label: "Important local news", description: null },
        ],
        sections: [
            {
                title: "Safety risks",
                content: "In recent months, concerns about safety...",
                image: null,
            },
            {
                title: "Culture",
                content: "When visiting the UK, travelers should...",
                image: null,
            },
            {
                title: "Local cuisine",
                content: "The UK’s local cuisine reflects its history...",
                image: "/breakfast.jpg",
            },
            {
                title: "Higher education",
                content: "The UK is home to some of the world’s most prestigious...",
                image: "/oxford.jpg",
            },
        ],
    };

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
            {countryDBData ? (
                <>
                    <CountryHeader
                        countryName={countryDBData.data.name}
                        flagSrc={countryDBData.data.flagUrl}
                        backgroundSrc={countryData.background}
                    />
                    <HeaderBar {...countryData.risk} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-16 py-8">
                        <div className="md:col-span-2 space-y-8">
                            <CountryPageSection title="Summary" content={countryData.summary} />
                            <RecommendationCard {...countryData.recommendation} />
                        </div>
                        <div className="space-y-1">
                            <ExchangeRate/>

                            <CountrySelector currentCountry={normalizedCountry} />
                            <CurrencyInfo
                                currencyName="Great Britain Pound"
                                todo="Exchange rates available soon"
                            />
                            <VisaInfo currentCountry={normalizedCountry} />
                            <BorderInfo {...countryData.borderControl} />
                            <MembershipInfo memberships={countryData.memberships} />
                            <Notifications items={countryData.notifications} />
                        </div>
                    </div>
                    <div className="px-16 py-4">
                        <h2 className="text-2xl font-bold mb-2">Recommended Points of Interest</h2>
                        <hr className="h-px mb-12 bg-gray-700 border-0" />
                        <AttractionsGallery attractions={countryAttractions} />
                    </div>
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