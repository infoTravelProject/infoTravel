const Label = ({text, color}) => {
    if(typeof text === "undefined") text = "Label"
    return (
        <div className="w-full h-fit pt-16 pb-6">
            <p className="font-inter font-extralight text-white/[0.8] text-lg">{text}</p>
            <hr className={`${color === "blue" ? 'border-it-blue' : color === "amber" ? 'border-it-amber' : color === "red" ? 'border-it-red-light' : 'border-white/[0.8]'}`}/>
        </div>
    );
};
export default Label;