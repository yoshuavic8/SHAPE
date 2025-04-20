"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "./server";

export async function createServerActionClient() {
    return createServerSupabaseClient();
}

export async function getSession() {
    // 🛡️ Amankan dari pemanggilan saat build atau client-side
    if (typeof window !== "undefined") return null;
    if (
        process.env.NODE_ENV === "production" &&
        process.env.NEXT_PHASE === "phase-production-build"
    ) {
        return null;
    }

    try {
        const supabase = await createServerActionClient();
        const { data } = await supabase.auth.getSession();
        return data.session;
    } catch (error) {
        console.error("Error getting session:", error);
        return null;
    }
}

export async function signIn(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = await createServerActionClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    redirect("/dashboard");
}

export async function signUp(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;

    const supabase = await createServerActionClient();

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            },
        },
    });

    if (error) {
        return { error: error.message };
    }

    // Create user profile
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        await supabase.from("user_profiles").insert({
            id: user.id,
            full_name: fullName,
            email: email,
        });

        // Create empty questionnaire results
        await supabase.from("questionnaire_results").insert({
            user_id: user.id,
            spiritual_gifts: {},
            heart_desire: {},
            personality: {},
            experiences: {},
            is_completed: false,
        });
    }

    redirect("/dashboard");
}

export async function signOut() {
    const supabase = await createServerActionClient();
    await supabase.auth.signOut();
    redirect("/");
}
