import { NextRequest } from "next/server";
import User from "@/models/user";
import bcryptjs from 'bcryptjs';
import Connection from "@/database/config";

Connection();


export const POST = async (NextRequest) => {
    try {
        //For getting payload
        const body = await NextRequest.json();

        //Object destructuring
        const { name, username, password } = body;

        if (!name || !username || !password) {
            return new Response("name, username and password is required", { status: 401 });
        }

        const user = await User.findOne({ username });
        if (user) {
            return new Response("Username already exists", { status: 400 });
        }

        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name,
            username,
            password: hashedPassword
        })

        await newUser.save();

        return new Response("user saved successfully", { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", { status: 500 })
    }
}