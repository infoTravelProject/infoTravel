import Image from "next/image";

const CountryPageSection = ({ title, content, image }) => (
    <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 h-fit">{title}</h2>
        <hr className="h-px mb-8 bg-gray-700 border-0"/>
        <div className={`flex flex-col xl:flex-row w-full justify-between items-center`}>
            <div className={`${!!image ? 'xl:w-3/4' : ''}`}>
                <p className="text-gray-300 text-lg">{content}</p>
            </div>
            {image && (
                <div className={"xl:pl-36 h-full pt-24 xl:pt-0"}><Image src={image} alt={"?"} height={600} width={600}/></div>
            )}
        </div>
    </div>
);

export default CountryPageSection;
