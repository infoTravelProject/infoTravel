import Link from "next/link";
import Image from "next/image";

const SelectorBox = ({title, isActive, link, icon}) =>(
    <Link href={link}>
        <div className={`mt-1 w-full h-14 text-white/[0.8] text-xl ${isActive ? 'cursor-default bg-black/[0.25]' : 'cursor-pointer hover:bg-black/[0.15]'}`}>
            <div className={`flex flex-row items-center h-full`}>
                <div className={`w-1.5 h-14 ${isActive ? 'bg-[#E06F1F]' : 'bg-transparent'}`}></div>
                <div className="h-8 w-8 ml-6">
                    <Image src={icon} width={500} height={500} alt="?" className="scale-75 opacity-85"/>
                </div>
                <div className="ml-5">{title}</div>
            </div>
        </div>
    </Link>
);
export default SelectorBox;