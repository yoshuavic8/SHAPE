export const dynamic = "force-dynamic"; // 🛡️ Cegah static generation

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/supabase/auth-actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-2xl font-bold">SHAPE-E Questionnaire</h1>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline">Masuk</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Daftar</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Temukan SHAPE-E Anda</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Kenali Spiritual gifts, Heart desire, Abilities, Personality, dan Experiences Anda untuk lebih
                  memahami bagaimana Anda dapat melayani dan berkontribusi.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/auth/register">
                  <Button size="lg">Mulai Sekarang</Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white dark:bg-gray-950">
                <div className="p-2 bg-green-100 rounded-full dark:bg-green-900">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m7 10 3 3 7-7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Spiritual Gifts</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Temukan karunia rohani unik Anda dan bagaimana menggunakannya.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white dark:bg-gray-950">
                <div className="p-2 bg-red-100 rounded-full dark:bg-red-900">
                  <svg
                    className="w-6 h-6 text-red-600 dark:text-red-400"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Heart Desire</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Pahami apa yang memotivasi Anda dan apa yang menjadi passion Anda.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white dark:bg-gray-950">
                <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22v-5" />
                    <path d="M9 8V2" />
                    <path d="M15 8V2" />
                    <path d="M12 8v8" />
                    <path d="M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                    <path d="M9 22h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Abilities</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Kenali talenta alami dan keterampilan yang Anda miliki.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white dark:bg-gray-950">
                <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" x2="9.01" y1="9" y2="9" />
                    <line x1="15" x2="15.01" y1="9" y2="9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Personality</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Pelajari tentang tipe kepribadian Anda dan bagaimana hal itu membentuk interaksi Anda.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white dark:bg-gray-950">
                <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-900">
                  <svg
                    className="w-6 h-6 text-amber-600 dark:text-amber-400"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                    <path d="M10 2c1 .5 2 2 2 5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Experiences</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Refleksikan peristiwa hidup yang membentuk karakter dan tujuan Anda.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 SHAPE-E Questionnaire. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Syarat Layanan
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
