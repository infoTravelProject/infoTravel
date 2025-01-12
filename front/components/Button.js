import Image from 'next/image'

const Button = ({type, text, color, icon}) => {
    let hex;
    switch (color) {
        case "blue":
            hex = "#004390";
            break;
        case "amber":
            hex = "#AB4D1F";
            break;
        case "red":
            hex = "#7E1C1C";
            break;
        case "grey":
            type = "normal";
            hex = "#1E1E1E";
            break;
        default:
            if(typeof color === "undefined"){
                hex="#004390";
            }
            else{
                Array.from(color)[0] === '#' && color.length === 7 ? hex=color : hex="#004390";
            }
            break
    }
    switch(type) {
        case "contrast":
            return (
                <div className="rounded-full p-0.5" style={{backgroundColor: hex}}>
                    <div className="flex flex-row items-center pr-9 pt-1 pb-1.5 rounded-full text-sm font-normal font-inter hover:bg-black transition">
                        <div className="h-5 w-8 ml-0.5 mr-1 flex flex-row justify-end">
                            {icon && (
                                <Image src={icon} alt={"?"} width={20} height={20}/>
                            )}
                        </div>
                        {text}
                    </div>
                </div>
            );
        case "select":
            return (<div>TODO</div>);
        case "logout":
            return (
                <div className="flex flex-row items-center bg-black/[0.25] rounded-full cursor-pointer transition hover:bg-black/[0.35] hover:border-amber-600 border-transparent border-2">
                    <div className="w-8 h-8 flex flex-col justify-center ml-8">
                        <Image src={"/logout.png"} width={500} height={500} alt={"?"} className="scale-75"/>
                    </div>
                    <div className="pr-10 pl-2 py-3 font-inter font-normal text-white/[0.9] text-lg">{text}</div>
                </div>
            );
        default:
        case "normal":
            return (
                <div className="rounded-full" style={{backgroundColor: hex}}>
                    <div
                        className={`flex flex-row items-center pr-10 pt-1.5 pb-2 rounded-full ${color === "grey" ? 'text-white/[0.7]' : 'text-white'} text-sm font-normal font-inter hover:bg-[#1E1E1E]/[0.15]`}>
                        <div className="h-5 w-9 mr-1 flex flex-row justify-end">
                            {icon && (
                                <Image src={icon} alt={"?"} width={20} height={20}/>
                            )}
                        </div>
                        {text}
                    </div>
                </div>
            );
    }
}
export default Button;