import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between py-4">
          <h1 className="text-2xl font-bold">SHAPE-E Questionnaire</h1>
          <Link href="/">
            <Button variant="outline">Kembali ke Beranda</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Kebijakan Privasi</h2>
              <p className="text-muted-foreground">Terakhir diperbarui: 1 Juni 2024</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Pendahuluan</h3>
              <p>
                SHAPE-E Questionnaire ("kami", "kita", atau "aplikasi kami") berkomitmen untuk melindungi privasi Anda. 
                Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi 
                Anda saat Anda menggunakan aplikasi SHAPE-E Questionnaire.
              </p>
              <p>
                Dengan menggunakan aplikasi kami, Anda menyetujui praktik yang dijelaskan dalam Kebijakan Privasi ini.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Informasi yang Kami Kumpulkan</h3>
              <p>Kami mengumpulkan beberapa jenis informasi dari pengguna kami:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Informasi Akun:</span> Saat Anda mendaftar, kami mengumpulkan nama, alamat email, 
                  dan kata sandi terenkripsi Anda.
                </li>
                <li>
                  <span className="font-medium">Data Kuesioner:</span> Jawaban Anda atas pertanyaan dalam kuesioner SHAPE-E, 
                  termasuk informasi tentang karunia spiritual, hasrat hati, kemampuan, kepribadian, dan pengalaman Anda.
                </li>
                <li>
                  <span className="font-medium">Data Penggunaan:</span> Informasi tentang bagaimana Anda berinteraksi dengan 
                  aplikasi kami, seperti halaman yang Anda kunjungi dan fitur yang Anda gunakan.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Bagaimana Kami Menggunakan Informasi Anda</h3>
              <p>Kami menggunakan informasi yang kami kumpulkan untuk:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Menyediakan, memelihara, dan meningkatkan aplikasi SHAPE-E Questionnaire.</li>
                <li>Menganalisis jawaban kuesioner Anda untuk memberikan hasil dan rekomendasi yang relevan.</li>
                <li>Mengirimkan informasi penting tentang akun Anda atau perubahan pada aplikasi kami.</li>
                <li>Meningkatkan pengalaman pengguna dan mengembangkan fitur baru.</li>
                <li>Melindungi keamanan dan integritas aplikasi kami.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Penyimpanan dan Keamanan Data</h3>
              <p>
                Kami menggunakan Supabase, platform database yang aman, untuk menyimpan data Anda. Kami menerapkan 
                langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses yang tidak sah, 
                pengubahan, pengungkapan, atau penghancuran.
              </p>
              <p>
                Meskipun kami berusaha untuk melindungi informasi pribadi Anda, tidak ada metode transmisi melalui internet 
                atau metode penyimpanan elektronik yang 100% aman. Oleh karena itu, kami tidak dapat menjamin keamanan 
                mutlak.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Berbagi Informasi</h3>
              <p>
                Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi pengguna kepada pihak ketiga. 
                Kami dapat membagikan informasi dalam keadaan berikut:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dengan persetujuan Anda, seperti saat Anda memilih untuk membagikan hasil SHAPE-E Anda.</li>
                <li>Dengan penyedia layanan yang membantu kami mengoperasikan aplikasi (seperti Supabase untuk penyimpanan data).</li>
                <li>Jika diwajibkan oleh hukum atau dalam menanggapi permintaan yang sah dari otoritas publik.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Hak Anda</h3>
              <p>Anda memiliki hak-hak berikut terkait data pribadi Anda:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hak untuk mengakses dan melihat data pribadi Anda.</li>
                <li>Hak untuk memperbarui atau memperbaiki data pribadi Anda.</li>
                <li>Hak untuk menghapus data pribadi Anda (dengan menghapus akun Anda).</li>
                <li>Hak untuk mengekspor data Anda dalam format yang dapat dibaca mesin.</li>
              </ul>
              <p>
                Untuk menggunakan hak-hak ini, silakan hubungi kami melalui informasi kontak yang disediakan di bawah.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Cookie dan Teknologi Pelacakan</h3>
              <p>
                Kami menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman Anda dengan aplikasi kami. 
                Cookie adalah file kecil yang ditempatkan di perangkat Anda yang memungkinkan kami mengenali perangkat Anda 
                saat Anda kembali ke aplikasi kami.
              </p>
              <p>
                Kami menggunakan cookie untuk menjaga sesi login Anda dan mengingat preferensi Anda. Anda dapat mengatur 
                browser Anda untuk menolak semua atau beberapa cookie, atau untuk memberi tahu Anda saat cookie dikirim.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Perubahan pada Kebijakan Privasi Ini</h3>
              <p>
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang 
                perubahan apa pun dengan memposting Kebijakan Privasi baru di halaman ini dan memperbarui tanggal "terakhir 
                diperbarui" di bagian atas.
              </p>
              <p>
                Kami mendorong Anda untuk meninjau Kebijakan Privasi ini secara berkala untuk tetap mendapatkan informasi 
                tentang bagaimana kami melindungi informasi pribadi Anda.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Hubungi Kami</h3>
              <p>
                Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi ini atau praktik data kami, 
                silakan hubungi kami di:
              </p>
              <p className="font-medium">Email: privacy@shape-e-questionnaire.com</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 SHAPE-E Questionnaire. Hak Cipta Dilindungi.
          </p>
          <div>
            <Link href="/" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
