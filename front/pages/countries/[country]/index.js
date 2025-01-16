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

export default function CountryPage() {
    const router = useRouter();
    const { country } = router.query;

    const countryData = countries[country] || null;
    const countryAttractions = attractionsData[country] || [];

    if (!countryData) {
        return <p className="text-white">Country data not found.</p>;
    }

    return (
        <div className="text-white bg-[#121212]">
            {/* Country header */}
            <CountryHeader
                countryName={country}
                flagSrc={countryData.flag}
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
                    <CountrySelector />
                    <CurrencyInfo
                        currencyName="Great Britain Pound"
                        todo="Exchange rates available soon"
                    />
                    {/*<VisaInfo {...countryData.visa} />*/}
                    <VisaInfo currentCountry={country}/>
                    <BorderInfo {...countryData.borderControl} />
                    <MembershipInfo memberships={countryData.memberships} />
                    <Notifications items={countryData.notifications} />
                </div>
            </div>

            {/* Gallery of attractions */}
            <div className="px-16 py-4">
                <h2 className="text-2xl font-bold mb-2">Recommended Points of Interest</h2>
                <hr className="h-px mb-12 bg-gray-700 border-0"/>
                <AttractionsGallery attractions={countryAttractions}/>
            </div>

            {/* Additional sections */}
            <div className="px-16 py-8 mb-8">
                {countryData.sections.map((section, index) => (
                    <CountryPageSection key={index} {...section} />
                ))}
            </div>
        </div>
    );
}
