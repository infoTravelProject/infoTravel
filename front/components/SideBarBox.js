import Image from 'next/image'

const SideBarBox = ({title, icon, isActive}) => (
    <div className={`mt-1 w-full h-14 bg-black/[0.25] text-white/[0.8] text-xl ${isActive ? 'cursor-default' : 'cursor-pointer hover:bg-black/[0.35]'}`}>
        <div className={`flex flex-row items-center ${isActive ? 'bg-gradient-to-l from-it-blue/[0.1] to-transparent' : 'bg-transparent'} h-full`}>
            <div className="h-8 w-8 ml-8">
                <Image src={icon} width={500} height={500} alt="?" className="scale-75 opacity-85"/>
            </div>
            <div className="ml-5">{title}</div>
            <div className={`absolute right-0 w-1.5 h-14 ${isActive ? 'bg-it-blue' : 'bg-transparent'}`}></div>
        </div>
    </div>
);
export default SideBarBox;