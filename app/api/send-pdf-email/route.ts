import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        // Get request body
        const { email, pdfData, userName } = await request.json();

        // Validate inputs
        if (!email || !pdfData || !userName) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Authenticate user
        const cookieStore = await cookies();

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    async getAll() {
                        const cookieList = cookieStore.getAll();
                        return cookieList.map((cookie) => ({
                            name: cookie.name,
                            value: cookie.value,
                        }));
                    },
                    async setAll(newCookies) {
                        for (const cookie of newCookies) {
                            cookieStore.set(cookie);
                        }
                    },
                },
            }
        );

        const { data } = await supabase.auth.getSession();
        if (!data.session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Configure email transport
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
            secure: process.env.EMAIL_SERVER_SECURE === "true",
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });

        // Extract base64 data from data URI
        const base64Data = pdfData.split(",")[1];

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `SHAPE-E Results for ${userName}`,
            text: `Dear ${userName},\n\nAttached are your SHAPE-E questionnaire results.\n\nThank you for completing the assessment!`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your SHAPE-E Results</h2>
          <p>Dear ${userName},</p>
          <p>Thank you for completing the SHAPE-E questionnaire. Your results are attached to this email as a PDF file.</p>
          <p>This assessment helps you understand your unique design and how you can best serve and contribute.</p>
          <p>If you have any questions about your results, please don't hesitate to reach out.</p>
          <p>Blessings,</p>
          <p>The SHAPE-E Team</p>
        </div>
      `,
            attachments: [
                {
                    filename: `SHAPE_Results_${userName.replace(
                        /\s+/g,
                        "_"
                    )}.pdf`,
                    content: Buffer.from(base64Data, "base64"),
                    contentType: "application/pdf",
                },
            ],
        });

        return NextResponse.json(
            { success: true, message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
