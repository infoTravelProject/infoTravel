const CountryPageSection = ({ title, content, image }) => (
    <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <hr className="h-px mb-8 bg-gray-700 border-0"/>
        <div className={`flex ${image ? 'flex-row' : 'flex-col'}`}>
            <div className={`${image ? 'mr-24 w-1/2' : 'w-full'}`}>
                <p className="text-gray-300 text-lg">{content}</p>
            </div>
            {image && (
                <div
                    className="bg-pink-300 p-24 pt-56 pr-96 bg-cover bg-no-repeat bg-fill ml-24 rounded-lg items-center"
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
            )}
        </div>
    </div>
);

export default CountryPageSection;
