import Image from 'next/image'
import { FaSearch } from "react-icons/fa";

const Button = ({type, text, color, icon, inputType, inputPlaceholder}) => {

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
                color = "blue";
            }
            else{
                Array.from(color)[0] === '#' && color.length === 7 ? hex=color : hex="#004390";
            }
            break
    }

    if (typeof text === "undefined") text="Button text here";
    if (typeof inputPlaceholder === "undefined") inputPlaceholder = "";

    switch(type) {
        case "contrast":
            return (
                <div className="rounded-full p-0.5" style={{backgroundColor: hex}}>
                    <div className="flex flex-row items-center pr-9 py-1.5 rounded-full text-sm font-normal font-inter hover:bg-black transition">
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
        case "input":
            switch (inputType){
                default:
                case "search":
                    return(
                        <div className="relative flex items-center text-white/[0.4] focus-within:text-white/[0.9]">
                            <FaSearch className="w-5 h-5 absolute ml-3 pointer-events-none"/>
                            <input
                            type="text"
                            name="search"
                            autoComplete="off"
                            placeholder={inputPlaceholder}
                            aria-label="Search"
                            className={`pr-3 pl-10 py-2 font-inter font-medium placeholder-white/[0.4] text-white/[0.9] rounded-full w-full border-none ring-2 ring-white/[0.4] focus:outline-none 
                            ${color==="blue" ? 'focus:ring-it-blue' : color==="amber" ? 'focus:ring-it-amber' : color==="red" ? 'focus:ring-it-red-light' : 'focus:ring-white/[0.9]'} transition focus:placeholder-transparent`}/>
                        </div>
                    );
            }
            break;
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
                        className={`flex flex-row items-center pr-10 py-2 rounded-full ${color === "grey" ? 'text-white/[0.7]' : 'text-white'} text-sm font-normal font-inter hover:bg-[#1E1E1E]/[0.15]`}>
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