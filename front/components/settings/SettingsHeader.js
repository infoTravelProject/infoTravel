import Image from "next/image";

const SettingsHeader = () => (
    <div className="bg-white/[0.03] h-56 flex flex-col">
        <div className="relative flex flex-row justify-center">
            <div className="w-28 h-28 mt-5">
                <Image src={"/user_white.png"} alt={"?"} width={512} height={512} />
            </div>
            <div className="absolute right-1/2 translate-x-20 w-7 h-7 mt-24">
                <Image src={"/edit.png"} alt={"?"} width={512} height={512} />
            </div>
        </div>
        <div className="text-center text-4xl mt-2 font-inter font-thin">Welcome, Example!</div>
    </div>
);
export default SettingsHeader;