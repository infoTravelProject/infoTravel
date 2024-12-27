const RecommendationCard = ({ title, description, image, flag, buttonText }) => (
    <div>
        <h2 className="text-2xl font-bold mb-4">We recommend</h2>
        <hr className="h-px mb-6 bg-gray-700 border-0"/>

        <div className="relative bg-gray-800 p-12 rounded-lg overflow-hidden pt-32">
            {/* background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>

            {/* flag */}
            <div className="absolute top-6 right-6">
                <img src={flag} alt="Recommendation flag" className="w-18 h-16" />
            </div>

            {/* content */}
            <div className="relative p-6">
                <h3 className="text-8xl mb-4 text-white pb-12">{title}</h3>
                <p className="text-gray-200 text-lg pb-12">{description}</p>
                <div className="absolute bottom-2 right-2">
                    <button
                        className="bg-blue-600 text-white px-8 py-2 rounded-3xl text-sm hover:bg-blue-700"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default RecommendationCard;
