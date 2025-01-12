import ProfileHeader from "@/components/profile/ProfileHeader";
import Head from "next/head";


export default function ProfilePage(){

    return (
        // <div className="bg-[#111111] min-h-screen min-w-screen">
        <div>
            <Head>
                <title>Profile - infoTravel</title>
            </Head>
            <ProfileHeader />
            <div className="bg-black bg-gradient-to-t from-black/0 to-[#1F90E0]/[0.12] min-h-screen min-w-screen">

            </div>
        </div>
    )
}