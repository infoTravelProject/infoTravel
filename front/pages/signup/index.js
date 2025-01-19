import Button from "@/components/Button";
import Link from "next/link";
import tempLanguageData from "@/data/tempLanguageData.json";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Signup(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [region, setRegion] = useState("");
    const handleFirstNameChange = (e) => {setFirstName(e);}
    const handleLastNameChange = (e) => {setLastName(e);}
    const handleEmailChange = (e) => {setEmail(e);}
    const handlePasswordChange = (e) => {setPassword(e);}
    const handlePassword2Change = (e) => {setPassword2(e);}
    const handleRegionChange = (e) => {setRegion(e.value);}
    const handleSubmit = async () => {
        if(password === password2){
            try {
                const response = await fetch("http://localhost:8080/api/users/create", {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        region: region
                    })
                })
                const data = await response.json();
                console.log(data);

            } catch (err) {
                console.log(err.message);
            } finally {
                router.push("/login");
            }
        }
        else{
            alert("passwords don't match!");
        }
    }
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
                            <Button type={"input"} inputPlaceholder={"Enter your first name"} label={"First name"} required={true} onChange={handleFirstNameChange}/>
                            <Button type={"input"} inputPlaceholder={"Enter your last name"} label={"Last name"} required={true} onChange={handleLastNameChange}/>
                            <Button type={"select"} selectType={"simple"} selectData={tempLanguageData} label={"Region"} required={true} onSelect={handleRegionChange}/>
                        </div>
                        <div className={"flex flex-col gap-4"}>
                            <Button type={"input"} inputPlaceholder={"Enter email"} label={"Email"} required={true} onChange={handleEmailChange}/>
                            <Button type={"input"} inputType={"password"} inputPlaceholder={"Enter password"} label={"password"} required={true} onChange={handlePasswordChange}/>
                            <Button type={"input"} inputType={"password"} inputPlaceholder={"Repeat password"} label={"repeat password"} required={true} onChange={handlePassword2Change}/>
                            <div className={"w-full flex justify-end pt-10"}><button><Button type={"button-contrast"} text={"Sign up"} onPress={handleSubmit}/></button></div>
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