"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const Profile = () => {
    const router = useRouter();

    const onLogout = async (e) => {
        e.preventDefault();
        const response = await axios.get("/api/users/logout");
        if (response.status === 200) {
            router.push("/login");
        }
    };

    return (
        <div className="relative min-h-screen w-full">

            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/profile.jpg"
                    alt="Full background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>


            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black/50 p-6 text-white">
                <h1 className="text-3xl font-bold mb-6 text-center">Hi there, not much to do here..!!</h1>
                <p className="text-lg text-center text-white max-w-xl mb-8">
                    This is a simple homepage because the focus of this project was primarily on understanding the authentication process rather than the frontend design.
                </p>

                <button
                    onClick={onLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-full shadow"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
