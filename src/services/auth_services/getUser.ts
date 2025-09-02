'use server';

import {cookies} from "next/headers";
import { IUser } from "@/models/IUser";

export async function getUser(): Promise<IUser | null> {
    const token = (await cookies()).get("authToken")?.value;
    if (!token) return null;
    const email = (await cookies()).get("userEmail")?.value;

    return {
        email,
        token,
    } as IUser;
}
