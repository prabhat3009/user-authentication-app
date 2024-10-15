import { NextRequest, NextResponse } from "next/server";

import User from "@/models/user";
import bcryptjs from 'bcryptjs';
import Connection from "@/database/config";
import jwt from "jsonwebtoken";

Connection();


export const POST = async (NextRequest) => {
    try {
        //For getting payload
        const body = await NextRequest.json();

        //Object destructuring
        const { username, password } = body;

        if (!username || !password) {
            return new Response("username and password is required", { status: 401 });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return new Response("Username does not exists", { status: 404 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return new Response("Incorrect Password", { status: 400 });
        }

        const tokenData = {
            username: user.username,
            id: user._id
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: '1d' });

        const reponse = NextResponse.json({ message: "login successful" });

        reponse.cookies.set('token', token, { httpOnly: true });
        return reponse;

    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", { status: 500 })
    }
}