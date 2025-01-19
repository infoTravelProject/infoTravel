'use client';
import Button from "@/components/Button";
import Link from "next/link";
import {useState} from "react";
import {GlobalProvider, useGlobalContext} from "@/components/context/GlobalContext";
import {useRouter} from "next/navigation";

export default function Login(){
    const {login} = useGlobalContext();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handlePasswordChange = (e) => {
        setPassword(e);
    }
    const handleEmailChange = (e) => {
        setEmail(e);
    }
    const handleSubmit = async () => {

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const data = await response.json();

            if (data && data.token){
                login(data.data, data.token);
                router.push("/");
            }

        } catch (err) {
            console.log(err.message);
        } finally {
            console.log(false);
        }
    };
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
                    <label className={"font-inter text-white/[0.9] text-xl mb-4"}>Log in to your account</label>
                    <Button type={"input"} inputPlaceholder={"Enter email"} label={"Email"} required={true} onChange={handleEmailChange}/>
                    <div className={"flex flex-col gap-2"}>
                        <Button type={"input"} inputType={"password"} inputPlaceholder={"Enter password"} label={"password"} required={true}
                                onChange={handlePasswordChange} onSelect={handleSubmit}/>
                        <div><Link href={"#"} className={"text-white/[0.8] hover:text-it-amber transition"}>Forgot password?</Link></div>
                    </div>
                    <div className={"w-full flex flex-col items-end gap-2"}>
                        <button><Button type={"button-contrast"} text={"Log in"} onPress={handleSubmit}/></button>
                        <div className={"font-inter text-sm font-light"}>
                            <Link href={"/signup"} className={"text-white/[0.8] hover:text-it-blue transition"}>No account? Create one!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
Login.getLayout = function getLayout(page) {
    return (<GlobalProvider>{page}</GlobalProvider>);
}