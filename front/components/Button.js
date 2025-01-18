import Image from 'next/image'
import { FaSearch } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import {useState, useEffect, useRef} from "react";

const Button = ({type, text, color, icon, inputType, inputPlaceholder, selectData, selectDefault, selectType, label, required, onSelect, onPress}) => {

    let hex;
    const [dropdownToggle, setDropdownToggle] = useState(false);
    const [selectedOption, setSelectedOption] = useState(()=>{
        if(typeof selectDefault === undefined) return null;
        else if(selectDefault === "disabled" || selectDefault==="off") return false;
        else if(selectDefault === "on") return true;
        else return selectDefault;
    });
    const dropdownRef = useRef(null);
    const selectHandler = (item)=>{
        if(typeof onSelect === "function"){
            onSelect(item);
        }
    }
    const buttonHandler = (item)=>{
        if(typeof onPress === "function"){
            onPress(item);
        }
    }

    //<This is used to hide the dropdown when clicked off>
    useEffect(() => {
        function handler(e){
            if(dropdownRef.current) {
                if(!dropdownRef.current.contains(e.target)) {
                    setDropdownToggle(false);
                }
            }
        }
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        }
    })
    //</>

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
            type = "button";
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

    //DEFAULT VALUES IF PROPERTY NOT SET
    if (typeof text === "undefined") text="Button text here";
    if (typeof inputPlaceholder === "undefined") inputPlaceholder = "";
    if (typeof label === "undefined") label = "";

    switch(type) {
        case "button-contrast":
            return (
                <div className="w-fit rounded-full p-0.5" style={{backgroundColor: hex}}>
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
            if(selectData === undefined || selectData.length === 0) {
                return(<div>NO DATA</div>);
            }
            return (
                <div ref={dropdownRef} className="relative flex flex-col min-w-fit h-fit font-inter font-normal text-sm text-white/[0.9]">

                    <label className="relative w-fit pb-1 text-xs">
                        <span className="text-white/[0.5] pr-2">{label.toUpperCase()}</span>
                        <span className={`${required ? 'text-it-amber' : 'text-transparent'} absolute right-0`}>*</span>
                    </label>

                    <button className={`flex justify-between items-center bg-it-background rounded-md border-none ring-2
                    ${!dropdownToggle ? 'ring-white/[0.4]' : color === "blue" ? 'ring-it-blue' : color === "amber" ? 'ring-it-amber' : color === "red" ? 'ring-it-red-light' : 'ring-white'}`}
                            onClick={()=>{setDropdownToggle(!dropdownToggle)}}>
                        <span className="pl-6 pr-16">{selectedOption ? selectedOption.label : "Select"}</span>
                        <div className="w-10 h-10 flex items-center justify-center p-0.5">
                            <FaChevronDown className={`w-full h-full p-2.5 rounded-r-md text-black 
                            ${selectType === "simple" && dropdownToggle && color === "blue" ? 'scale-y-[-1] text-it-blue' :
                                selectType === "simple" && dropdownToggle && color === "amber" ? 'scale-y-[-1] text-it-amber' :
                                    selectType === "simple" && dropdownToggle && color === "red" ? 'scale-y-[-1] text-it-red-light' :
                                        selectType === "simple" && dropdownToggle && color === "white" ? 'scale-y-[-1] text-white/[0.9]' : 
                                            selectType === "simple" && !dropdownToggle ? 'text-white/[0.4]' : 
                                                dropdownToggle ? 'scale-y-[-1] bg-white/[0.8]' : 'bg-white/[0.4]'}`}/>
                        </div>
                    </button>

                    <div className={`${dropdownToggle ? 'visible' : 'hidden'} absolute z-40 w-full max-h-64 overflow-y-auto overscroll-contain top-16 flex flex-col bg-it-background/[0.6] backdrop-blur mt-2 rounded-md border-none ring-2 ring-white/[0.6]
                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-transparent
                    ${color==="blue"?'[&::-webkit-scrollbar-thumb]:bg-it-blue':color==="amber"?'[&::-webkit-scrollbar-thumb]:bg-it-amber':color==="red"?'[&::-webkit-scrollbar-thumb]:bg-it-red-light':'[&::-webkit-scrollbar-thumb]:bg-white'}`}>
                        {selectData.map((item) => (
                            <button className={`flex items-center mr-1 hover:bg-black/[0.2] ${JSON.stringify(selectedOption) === JSON.stringify(item) ? 'bg-black/[0.2] hover:text-white/[0.6]' : ''}`}
                                type={"submit"} key={item.id} value={item.value} onClick={()=>{
                                setSelectedOption(item);
                                setDropdownToggle(false);
                                selectHandler(item);
                            }}>
                                <div className={`w-1 h-10 ml-0.5 ${JSON.stringify(selectedOption) === JSON.stringify(item) ? color === "blue" ? 'bg-it-blue' : color === "amber" ? 'bg-it-amber' : color === "red" ? 'bg-it-red-light' : 'bg-white/[0.8]' : ''}`}></div>
                                <div className="py-3 w-fit pl-4">{item.label}</div>
                            </button>
                        ))}
                    </div>

                </div>
            );
        case "input":
            switch (inputType){
                case "search":
                    return(
                        <div className="relative flex items-center text-white/[0.4] focus-within:text-white/[0.9]">
                            <FaSearch className="w-5 h-5 absolute ml-3 pointer-events-none"/>
                            <input
                            type="text"
                            autoComplete="off"
                            placeholder={inputPlaceholder}
                            className={`pr-3 pl-10 py-2 font-inter font-medium placeholder-white/[0.4] text-white/[0.9] rounded-full w-full border-none ring-2 ring-white/[0.4] focus:outline-none 
                            ${color==="blue" ? 'focus:ring-it-blue' : color==="amber" ? 'focus:ring-it-amber' : color==="red" ? 'focus:ring-it-red-light' : 'focus:ring-white/[0.9]'} transition focus:placeholder-transparent`}/>
                        </div>
                    );
                case "search-button":
                    return(
                        <div className="relative flex items-center text-white/[0.4] focus-within:text-white/[0.9]">
                            <FaSearch className="w-5 h-5 absolute ml-3 pointer-events-none"/>
                            <input
                            type="text"
                            autoComplete="off"
                            placeholder={inputPlaceholder}
                            className={`pr-3 pl-10 py-2 font-inter font-medium placeholder-white/[0.4] text-white/[0.9] rounded-full w-full border-none ring-2 ring-white/[0.4] focus:outline-none 
                            ${color==="blue" ? 'focus:ring-it-blue' : color==="amber" ? 'focus:ring-it-amber' : color==="red" ? 'focus:ring-it-red-light' : 'focus:ring-white/[0.9]'} transition focus:placeholder-transparent`}/>
                            <button className="absolute right-0 w-10 h-10 rounded-full bg-white/[0.4] hover:bg-white/[0.9] hover:-rotate-90 transition flex items-center justify-center scale-90">
                            <IoIosArrowForward className="text-black rotate-90 w-6 h-6 pl-0.5"/>
                            </button>
                        </div>
                    );
                case "password":

                    //TODO: hide/show password on eye-button click

                    return (
                        <div className="flex flex-col">
                            <label className="relative w-fit pb-1 text-xs">
                                <span className="text-white/[0.5] pr-2">{label.toUpperCase()}</span>
                                <span className={`${required ? 'text-it-amber' : 'text-transparent'} absolute right-0`}>*</span>
                            </label>
                            <div className="relative flex items-center text-white/[0.4] focus-within:text-white/[0.9]">
                                <input
                                type="password"
                                id="password"
                                autoComplete="off"
                                placeholder={inputPlaceholder}
                                className={`pr-3 pl-6 py-2 font-inter font-medium placeholder-white/[0.4] text-white/[0.9] rounded-full w-full border-none ring-2 ring-white/[0.4] focus:outline-none 
                                ${color==="blue" ? 'focus:ring-it-blue' : color==="amber" ? 'focus:ring-it-amber' : color==="red" ? 'focus:ring-it-red-light' : 'focus:ring-white/[0.9]'} transition focus:placeholder-transparent`}/>
                            </div>
                        </div>
                    );
                case "textarea":
                    return (
                        <div className="flex flex-col">
                            <label className="relative pb-1 text-xs">
                                <span className="text-white/[0.5] pr-2">{label.toUpperCase()}</span>
                                <span className={`${required ? 'text-it-amber' : 'text-transparent'} absolute right-0`}>*</span>
                            </label>
                            <div className="text-white/[0.4] focus-within:text-white/[0.9]">
                                <textarea
                                    autoComplete="off"
                                    placeholder={inputPlaceholder}
                                    defaultValue={selectDefault}
                                    className={`pr-3 pl-6 py-2 font-inter font-medium placeholder-white/[0.4] text-white/[0.9] rounded-2xl min-h-24 max-h-96 min-w-64 w-full border-none ring-2 ring-white/[0.4] focus:outline-none 
                                ${color === "blue" ? 'focus:ring-it-blue' : color === "amber" ? 'focus:ring-it-amber' : color === "red" ? 'focus:ring-it-red-light' : 'focus:ring-white/[0.9]'} transition focus:placeholder-transparent`}/>
                            </div>
                        </div>
                    );
                default:
                case "none":
                    return (
                        <div className="flex flex-col">
                            <label className="relative w-fit pb-1 text-xs">
                                <span className="text-white/[0.5] pr-2">{label.toUpperCase()}</span>
                                <span className={`${required ? 'text-it-amber' : 'text-transparent'} absolute right-0`}>*</span>
                            </label>
                            <div className="text-white/[0.4] focus-within:text-white/[0.9]">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    placeholder={inputPlaceholder}
                                    defaultValue={selectDefault}
                                    className={`pr-3 pl-6 py-2 font-inter font-medium placeholder-white/[0.4] text-white/[0.9] rounded-full w-full border-none ring-2 ring-white/[0.4] focus:outline-none 
                                ${color === "blue" ? 'focus:ring-it-blue' : color === "amber" ? 'focus:ring-it-amber' : color === "red" ? 'focus:ring-it-red-light' : 'focus:ring-white/[0.9]'} transition focus:placeholder-transparent`}/>
                            </div>
                        </div>
                    );
            }
            break;
        case "logout":
            return (
                <div
                    className="w-fit flex flex-row items-center bg-black/[0.25] rounded-full cursor-pointer transition hover:bg-black/[0.35] hover:border-amber-600 border-transparent border-2">
                    <div className="w-8 h-8 flex flex-col justify-center ml-8">
                        <Image src={"/logout.png"} width={500} height={500} alt={"?"} className="scale-75"/>
                    </div>
                    <div className="pr-10 pl-2 py-3 font-inter font-normal text-white/[0.9] text-lg">{text}</div>
                </div>
            );
        case "toggle":
            return (
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={!!selectedOption} className="sr-only peer" disabled={selectDefault==="disabled" || selectDefault==="enabled"}
                           onChange={()=>{setSelectedOption(!selectedOption)}}/>
                    <div className={`w-11 h-6 bg-gray-500 rounded-full peer
                    ${color==="blue"?'peer-checked:bg-blue-500':color==="amber"?'peer-checked:bg-it-amber':color==="red"?'peer-checked:bg-it-red-light':'peer-checked:bg-gray-700'}`}></div>
                    <div className="absolute left-0.5 top-0.5 scale-90 bg-white border-none rounded-full w-5 h-5 transition-all peer-checked:translate-x-5"></div>
                </label>
            );
        case "toggle-contrast":
            return (
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={!!selectedOption} className="sr-only peer" disabled={selectDefault==="disabled" || selectDefault==="enabled"}
                           onChange={()=>{setSelectedOption(!selectedOption)}}/>
                    <div className={`w-11 h-6 bg-it-background rounded-full peer border-none ring-1
                    ${color==="blue"?'ring-it-blue':color==="amber"?'ring-it-amber':color==="red"?'ring-it-red-light':'ring-white'}
                    ${color==="blue"?'peer-checked:bg-blue-500':color==="amber"?'peer-checked:bg-it-amber':color==="red"?'peer-checked:bg-it-red-light':'peer-checked:bg-gray-700'}`}></div>
                    <div className="absolute left-0.5 top-0.5 scale-90 bg-white border-none rounded-full w-5 h-5 transition-all peer-checked:translate-x-5 peer-checked:scale-100"></div>
                </label>
            );
        default:
        case "button":
            return (
                <div className="w-fit rounded-full" style={{backgroundColor: hex}}>
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