import {useRouter} from "next/router";
import { IoIosNotifications } from "react-icons/io";
import { FaPassport, FaExternalLinkAlt } from "react-icons/fa";
import { FaPersonMilitaryPointing } from "react-icons/fa6";
import { FaX, FaCheck } from "react-icons/fa6";

export default function CountryPage({ params }) {
    const router = useRouter();
    const {country} = router.query;
    return (
        <div className="text-white bg-[#121212]">
            {/* country header / background */}
            <div>
                <div
                    className="relative w-full h-[60vh] bg-cover bg-center"
                    style={{backgroundImage: "url('/london_test2.jpg')"}}
                >

                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                    <div className="absolute top-8 left-16">
                        <img
                            src="/uk_flag.png"
                            alt="Country flag"
                            className="w-18 h-16"
                        />
                    </div>

                    <div className="absolute bottom-6 left-16 text-white">
                        <h1 className="text-4xl font-inter">{country || "Country Name"}</h1>
                    </div>
                </div>
            </div>

            {/* header */}
            <div className="flex justify-between bg-[#AB4D1F] px-2 py-8 font-inter">
                <div className="ml-16 space-y-2">
                    <h2 className="text-xl font-bold">High safety risk</h2>
                    <p className="text-sm italic">Exercise a high degree of caution</p>
                </div>
                <div className="flex items-center space-x-4 text-xs border-l-2 pl-8 mr-12">
                    <div className="space-y-1">
                        <p>LAST UPDATED: <span className="font-bold">7 August 2024</span></p>
                        <p>STILL VALID: <span className="font-bold">1 day ago</span></p>
                    </div>
                    <IoIosNotifications className="w-8 h-8"/>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-16 py-8">
                {/* left column */}
                <div className="md:col-span-2 space-y-8">
                    {/* Summary */}
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Summary</h2>
                        <hr className="h-px mb-8 bg-gray-700 border-0"/>
                        <p className="text-gray-300 text-lg">
                            The United Kingdom (UK) is a captivating destination that combines rich history, vibrant
                            culture, and breathtaking landscapes. Comprised of England, Scotland, Wales, and Northern
                            Ireland, the UK offers something for every traveler. Explore iconic landmarks like London's
                            Big Ben, Edinburgh Castle, and Stonehenge, or lose yourself in the charming countryside of
                            the Lake District and Scottish Highlands. Renowned for its world-class museums, traditional
                            pubs, and diverse culinary scene, the UK seamlessly blends modernity with timeless
                            traditions. Whether you're interested in historic cities, coastal escapes, or cultural
                            festivals, the UK promises an unforgettable experience.
                        </p>
                    </div>

                    {/* We recommend */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">We recommend</h2>
                        <hr className="h-px mb-6 bg-gray-700 border-0"/>

                        <div className="relative bg-gray-800 p-12 rounded-lg overflow-hidden pt-32">
                            {/* background */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{backgroundImage: "url('/skye_test.jpg')"}}
                            ></div>

                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

                            {/* flag */}
                            <div className="absolute top-6 right-6">
                                <img
                                    src="/scotland_flag.png"
                                    alt="Scotland flag"
                                    className="w-18 h-16"
                                />
                            </div>

                            {/* text on photo */}
                            <div className="relative p-6">
                                <h3 className="text-8xl  mb-4 text-white pb-12">Skye</h3>
                                <p className="text-gray-200 text-lg pb-12">
                                    The Isle of Skye, a gem of Scotland’s Inner Hebrides, offers breathtaking landscapes
                                    that feel otherworldly. With its rugged mountains, dramatic coastlines, and iconic
                                    landmarks like the Quiraing, Fairy Pools, and Old Man of Storr, Skye is a haven for
                                    nature lovers and adventurers. Rich in history and folklore, it also boasts charming
                                    villages, medieval castles, and authentic Scottish hospitality. Whether you're
                                    hiking, stargazing, or savoring fresh local seafood, the Isle of Skye promises an
                                    unforgettable escape into wild beauty and tranquility.
                                </p>
                                {/* button */}
                                <div className="absolute bottom-2 right-2">
                                    <button
                                        className="bg-blue-600 text-white px-8 py-2 rounded-3xl text-sm hover:bg-blue-700">
                                        Open in trip planner
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* right column */}
                <div className="space-y-1">
                    <div className="bg-[#111111] p-6">
                        <h3 className="text-xl font-bold mb-4">Great Britain Pound</h3>
                        <p> TODO </p>
                    </div>

                    {/* visa */}
                    <div className="bg-green-800 p-4 text-white flex items-center space-x-4">
                        <FaPassport className="w-6 h-6"/>
                        <div>
                            <p className="font-bold">You don’t need a visa to enter</p>
                            <p className="text-sm flex items-center">
                                View visa requirements on the official website
                                <a href="#">
                                    <FaExternalLinkAlt className="ml-2 w-4 h-4"/>
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* border control */}
                    <div className="bg-green-800 p-4 text-white flex items-center space-x-4">
                        <FaPersonMilitaryPointing className="w-6 h-6"/>
                        <div>
                            <p className="font-bold">Low-restrictive border control</p>
                            <p className="text-sm">Border control should be quick and free of significant
                                difficulties</p>
                        </div>
                    </div>

                    {/* EU NATO SHENGEN */}
                    <div className="bg-[#111111] p-4 text-white flex justify-end items-center mb-4 space-x-6">
                        <div className="flex items-center space-x-2">
                            <span className="font-bold">EU</span>
                            <FaX className="text-red-600 w-4 h-4"/>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold">Schengen</span>
                            <FaX className="text-red-600 w-4 h-4"/>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-bold">NATO</span>
                            <FaCheck className="text-green-500 w-5 h-5"/>
                        </div>
                    </div>

                    {/* notification */}
                    <div className="bg-gray-800 text-white flex flex-col">
                        <div className="bg-[#414141] p-2">
                            <h4 className="ml-3 text-base font-bold text-gray-300">News and notifications</h4>
                        </div>
                        <div className="bg-[#19191a]">
                            <ul className="space-y-4 mt-1 px-4 py-4">
                                {[
                                    {label: "Safety risks", description: "get updated with new safety remarks"},
                                    {label: "Economy", description: "get economic news"},
                                    {label: "Politics", description: "get political news and updates"},
                                    {
                                        label: "Customs and Immigration",
                                        description: "Entry requirements, visa updates, or prohibited items"
                                    },
                                    {label: "Important local news", description: null},
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center space-x-4">
                                        {/* Toggle switch */}
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer"/>
                                            <div
                                                className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700"></div>
                                            <div
                                                className="absolute left-1 top-1 bg-white border border-gray-300 rounded-full w-4 h-4 transition-all peer-checked:translate-x-5 peer-checked:border-white"></div>
                                        </label>

                                        {/* text */}
                                        <div>
                                            <span className="font-bold text-gray-400 text-sm">{item.label}</span>
                                            {item.description &&
                                                <span className="text-gray-400"> - {item.description}</span>}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 px-16 py-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Safety risks</h2>
                    <hr className="h-px mb-8 bg-gray-700 border-0"/>
                    <p className="text-gray-300 text-lg">
                        In recent months, concerns about safety on UK streets have risen due to a combination of violent
                        incidents, riots, and protests, many of which are tied to tensions surrounding immigration. A
                        significant flashpoint was the stabbing attack in Southport in July 2024, which led to a wave of
                        riots targeting immigrants, asylum seekers, mosques, etc. The unrest spread across major cities,
                        including Manchester, London, and Bristol, causing extensive damage, including property damage,
                        injuries to police officers, and arrests of over 1,300 individuals.

                        While the UK remains generally safe, these events have raised concerns in specific areas where
                        riots occurred. Travelers and residents alike are advised to stay informed about local
                        conditions and avoid areas where tensions may be high.
                    </p>
                </div>
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Culture</h2>
                    <hr className="h-px mb-8 bg-gray-700 border-0"/>
                    <p className="text-gray-300 text-lg">
                        When visiting the UK, travelers should be aware of its rich cultural etiquette and customs.
                        Politeness and respect are highly valued; saying "please," "thank you," and queuing (lining up)
                        patiently are deeply ingrained in British culture. Punctuality is also important, particularly
                        for social and professional engagements. The UK boasts a diverse cultural heritage, from iconic
                        afternoon tea traditions to vibrant multicultural festivals like Notting Hill Carnival. Visitors
                        should also note that the UK consists of four distinct nations—England, Scotland, Wales, and
                        Northern Ireland—each with its own traditions, dialects, and identity. Understanding these
                        regional differences can enhance interactions and show respect for local culture. Finally, pubs
                        are central to British social life, but tipping is not mandatory, and knowing pub etiquette,
                        like ordering at the bar, is helpful. Travelers embracing these nuances will find their UK
                        experience more enriching.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 px-16 py-8">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Local cuisine</h2>
                    <hr className="h-px mb-8 bg-gray-700 border-0"/>
                    <div className="flex flex-row">
                        <div>
                            <p className="text-gray-300 mr-24 text-lg">
                                The UK’s local cuisine reflects its history, geography, and multicultural influences,
                                offering
                                travelers a variety of dishes to explore. Traditional British foods include fish and
                                chips, a
                                popular takeaway option, and Sunday roast, often served with Yorkshire pudding and
                                vegetables.
                                Regional specialties vary, such as haggis in Scotland, Welsh rarebit in Wales, and
                                Ulster fry in
                                Northern Ireland.<br/><br/>

                                For breakfast, travelers can try a full English breakfast, which typically includes
                                eggs, bacon,
                                sausage, beans, and toast. Pubs often serve classics like steak and ale pie or bangers
                                and mash
                                (sausages with mashed potatoes).<br/><br/>

                                While some may find traditional UK food simple compared to global cuisines, its
                                evolution in
                                recent years has brought a focus on fresh, locally sourced ingredients and diverse
                                influences.
                                Travelers should also be aware that tipping is not always expected in casual eateries
                                but is
                                appreciated for good service in restaurants.
                            </p>
                        </div>
                        <div className="bg-pink-300 p-24 pt-56 pr-96 bg-cover bg-no-repeat bg-fill mr-24 rounded-lg"
                             style={{backgroundImage: "url('/breakfast.jpg')"}}>
                        </div>
                    </div>

                </div>
            </div>

            {/*  POI  */}

            <div className="grid grid-cols-1 px-16 py-8">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Higher education</h2>
                    <hr className="h-px mb-8 bg-gray-700 border-0"/>
                    <div className="flex flex-row">
                        <div>
                            <p className="text-gray-300 mr-24 text-lg">
                                The UK is home to some of the world’s most prestigious higher education institutions, including Oxford, Cambridge, and University College London (UCL), attracting students from over 200 countries. Its universities are renowned for cutting-edge research, diverse academic programs, and innovative teaching. International students benefit from a wide range of scholarships, such as the Chevening and Commonwealth programs, aimed at reducing financial barriers. Popular fields of study include engineering, medicine, arts, and business. The UK's Graduate Immigration Route also allows students to remain in the country for up to two years post-graduation (or three years for doctoral graduates) to seek employment. This combination of academic excellence and opportunities for career growth makes the UK a leading destination for higher education.
                            </p>
                        </div>
                        <div className="bg-pink-300 p-24 pt-56 pr-96 bg-cover bg-no-repeat bg-fill mr-24 rounded-lg"
                             style={{backgroundImage: "url('/oxford.jpg')"}}>
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 px-16 py-8">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Local law</h2>
                    <hr className="h-px mb-8 bg-gray-700 border-0"/>
                    <p className="text-gray-300 text-lg">
                        When visiting the UK, travelers should be aware of specific laws that may differ from those in
                        their home countries. For example, drinking alcohol in public is legal in most places, but some
                        local areas (called “designated public places”) enforce restrictions, and violations can result
                        in fines. Smoking in enclosed public spaces, including pubs, restaurants, and public transport,
                        is strictly prohibited.

                        Travelers should also note that the UK has strict knife laws: carrying a knife in public without
                        a lawful reason, even a small one, can result in serious penalties. Similarly, jaywalking is not
                        an offense in the UK, unlike in some countries, so pedestrians are expected to use their
                        judgment when crossing roads without marked crossings.

                        Additionally, public behavior laws are taken seriously; public drunkenness, disorderly conduct,
                        or excessive noise can lead to fines or arrests. Travelers should also be aware of strict rules
                        regarding hate speech and online conduct, as these are criminalized under UK law. Understanding
                        these differences can help visitors avoid unintentional legal issues.
                    </p>
                    <p className="text-gray-400 flex justify-end items-center">Learn more on the official website
                        <a href="#">
                            <FaExternalLinkAlt className="ml-2 w-4 h-4"/>
                        </a></p>
                </div>
            </div>

        </div>
    );
}