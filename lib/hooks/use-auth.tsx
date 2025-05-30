"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    signIn: (
        email: string,
        password: string,
        redirectTo?: string
    ) => Promise<{ error: string | null }>;
    signUp: (
        email: string,
        password: string,
        fullName: string
    ) => Promise<{ error: string | null }>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Get session on initial load
        const getInitialSession = async () => {
            setIsLoading(true);

            try {
                const {
                    data: { session },
                } = await supabase.auth.getSession();
                setSession(session);
                setUser(session?.user ?? null);
            } catch (error) {
                console.error("Error getting initial session:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getInitialSession();

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signIn = async (email: string, password: string, redirectTo: string = "/dashboard") => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return { error: error.message };
            }

            // Add a small delay before redirect to ensure toast messages are visible
            setTimeout(() => {
                // Redirect to specified path or dashboard after successful login
                router.push(redirectTo);
                router.refresh();
            }, 1500); // 1.5 second delay

            return { error: null };
        } catch (error: any) {
            return {
                error: error.message || "An error occurred during sign in",
            };
        }
    };

    const signUp = async (
        email: string,
        password: string,
        fullName: string
    ) => {
        try {
            setIsLoading(true);

            const { error, data } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (error) {
                setIsLoading(false);
                return { error: error.message };
            }

            if (data.user) {
                // Hapus kode pembuatan profil pengguna karena sudah ditangani oleh trigger database
                
                // Hanya buat questionnaire_results
                const { data: questionnaireData, error: questionnaireError } = await supabase
                    .from("questionnaire_results")
                    .upsert({
                        user_id: data.user.id,
                        spiritual_gifts: {},
                        heart_desire: {},
                        personality: {},
                        experiences: {},
                        is_completed: false,
                    }, { onConflict: 'user_id' })
                    .select();

                if (questionnaireError) {
                    setIsLoading(false);
                    return { error: questionnaireError.message };
                }
            }

            // Set loading to false BEFORE redirect
            setIsLoading(false);

            // Pastikan redirect berjalan dengan menambahkan kode berikut
            const timestamp = new Date().getTime();
            router.push(`/auth/login?registered=true&t=${timestamp}`);
            router.refresh();

            return { error: null };
        } catch (error: any) {
            setIsLoading(false);
            return {
                error: error.message || "An error occurred during sign up",
            };
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    const value = {
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
