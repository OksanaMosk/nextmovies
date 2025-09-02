'use server';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { cookies } from "next/headers";

type RegisterResult = {
    redirectTo?: string;
    error?: string;
};

export const registerAction = async (formData: FormData): Promise<RegisterResult> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();

        (await cookies()).set("authToken", token, { httpOnly: true, path: "/" });
        (await cookies()).set("userEmail", email, { httpOnly: true, path: "/" });
        console.log("Token set in cookie:", token);
        return { redirectTo: "/movies" };
    }
    catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Registration failed";
        return { error: message };

    }
};
