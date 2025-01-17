import Button from "@/components/Button";

const ToggleBox = ({type, text})=>{
    if(typeof text === "undefined") text = "Label text here";

    if(type==="disabled" || type==="enabled"){
        return(
            <div className="w-full h-12 mt-1 bg-white/[0.1] flex flex-row items-center justify-between px-12 pointer-events-none opacity-50">
                <span className="font-inter text-white/[0.9] text-base font-light">{text}</span>
                <Button type={"toggle-contrast"} color={"blue"} selectDefault={type}/>
            </div>
        );
    }
    else if(type==="on" || type==="off" || type === true || type === false){
        return(
            <div className="w-full h-12 mt-1 bg-white/[0.2] flex flex-row items-center justify-between px-12">
                <span className="font-inter text-white/[0.9] text-base font-light">{text}</span>
                <Button type={"toggle-contrast"} color={"blue"} selectDefault={type}/>
            </div>
        );
    }
    else{
        return(
            <div className="w-full h-12 mt-1 bg-white/[0.2] flex flex-row items-center justify-between px-12">
                <span className="font-inter text-white/[0.9] text-base font-light">{text}</span>
                <Button type={"toggle-contrast"} color={"blue"}/>
            </div>
        );
    }
}
export default ToggleBox;