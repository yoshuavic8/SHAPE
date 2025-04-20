import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    // Create a Supabase client configured to use cookies
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name) {
                    return req.cookies.get(name)?.value;
                },
                set(name, value, options) {
                    res.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name, options) {
                    res.cookies.delete({
                        name,
                        ...options,
                    });
                },
            },
        }
    );

    // Refresh session if expired
    await supabase.auth.getSession();

    // Protected routes
    const protectedPaths = ["/dashboard", "/questionnaire", "/results"];

    // Check if the path is protected
    const isProtectedPath = protectedPaths.some((path) =>
        req.nextUrl.pathname.startsWith(path)
    );

    if (isProtectedPath) {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        // If no session and on a protected path, redirect to login
        if (!session) {
            const redirectUrl = new URL("/auth/login", req.url);
            redirectUrl.searchParams.set(
                "redirectedFrom",
                req.nextUrl.pathname
            );
            return NextResponse.redirect(redirectUrl);
        }
    }

    return res;
}

// Specify which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         * - public files
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
