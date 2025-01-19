import Button from "@/components/Button";
import Link from "next/link";
import tempLanguageData from "@/data/tempLanguageData.json";

export default function Signup(){
    return(
        <div className={"bg-it-airport bg-cover bg-center"}>
            <div className={"backdrop-blur w-screen h-screen flex justify-center items-center"}>
                <div className={"absolute top-0 w-screen h-fit flex justify-center pt-16 pb-20 bg-gradient-to-b from-black/[0.3] to-transparent"}>
                    <div className="ml-8 text-7xl">
                        <span className="text-white font-BraahOne">info</span>
                        <span className="text-it-blue font-BraahOne">Travel</span>
                    </div>
                </div>
                <div className={"flex flex-col justify-center items-center p-12 bg-neutral-900 gap-y-6 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(0,0,0,0.8)] transition"}>
                    <label className={"font-inter text-white/[0.9] text-xl mb-4"}>Create a new account</label>
                    <div className={"flex gap-24"}>
                        <div className={"flex flex-col gap-4"}>
                            <Button type={"input"} inputPlaceholder={"Enter your first name"} label={"First name"} required={true}/>
                            <Button type={"input"} inputPlaceholder={"Enter your last name"} label={"Last name"} required={true}/>
                            <Button type={"select"} selectType={"simple"} selectData={tempLanguageData} label={"Region"} required={true}/>
                        </div>
                        <div className={"flex flex-col gap-4"}>
                            <Button type={"input"} inputPlaceholder={"Enter email"} label={"Email"} required={true}/>
                            <Button type={"input"} inputType={"password"} inputPlaceholder={"Enter password"} label={"password"} required={true}/>
                            <Button type={"input"} inputType={"password"} inputPlaceholder={"Repeat password"} label={"repeat password"} required={true}/>
                            <div className={"w-full flex justify-end pt-10"}><button><Button type={"button-contrast"} text={"Sign up"}/></button></div>
                            <div className={"w-full flex justify-end"}><Link href={"/login"} className={"text-white/[0.8] hover:text-it-blue transition"}>No account? Create one!</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
Signup.getLayout = function getLayout(page) {
    return page;
}