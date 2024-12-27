import { useRouter } from "next/router";
import countries from "../../data/countries.json";
import CountryHeader from "../../components/CountryHeader";
import HeaderBar from "../../components/HeaderBar";
import CountryPageSection from "../../components/CountryPageSection";
import RecommendationCard from "../../components/RecommendationCard";
import VisaInfo from "../../components/VisaInfo";
import BorderInfo from "../../components/BorderInfo";
import MembershipInfo from "../../components/MembershipInfo";
import CurrencyInfo from "../../components/CurrencyInfo";
import Notifications from "../../components/Notifications";

export default function CountryPage() {
    const router = useRouter();
    const { country } = router.query;

    const countryData = countries[country] || null;

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
                    <CurrencyInfo
                        currencyName="Great Britain Pound"
                        todo="Exchange rates available soon"
                    />
                    <VisaInfo {...countryData.visa} />
                    <BorderInfo {...countryData.borderControl} />
                    <MembershipInfo memberships={countryData.memberships} />
                    <Notifications items={countryData.notifications} />
                </div>
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