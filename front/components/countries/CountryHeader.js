const CountryHeader = ({ countryName, flagSrc, backgroundSrc }) => (
    <div
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundSrc})` }}
    >
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.7] to-transparent"></div>
        <div className="absolute top-8 left-16">
            <img src={flagSrc} alt={`${countryName} flag`} className="w-18 h-16" />
        </div>
        <div className="absolute bottom-6 left-16 text-white">
            <h1 className="text-4xl font-inter">{countryName || "Country Name"}</h1>
        </div>
    </div>
);

export default CountryHeader;
