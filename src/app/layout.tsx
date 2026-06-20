import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const title = "Aminudin Teguh Wijayanto — IT Support · SOC · DevOps"
const description =
  "Portfolio profesional Aminudin Teguh Wijayanto (Aw Teguh) — IT Support, SOC Analyst, dan DevOps Engineer."

export const metadata: Metadata = {
  metadataBase: new URL("https://awteguh.vercel.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} ${jetbrainsMono.variable}`}>
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ice focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy"
        >
          Lewati ke konten
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
