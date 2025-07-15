import { NextResponse } from "next/server";
import Connection from "@/database/config";

Connection();


export const GET = async (NextRequest) => {
    try {

        const reponse = NextResponse.json({ message: "logout successful", success: true });

        reponse.cookies.set('token', "", { httpOnly: true, secure: true, expires: new Date(0), path: '/', });
        return reponse;

    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", { status: 500 })
    }
}