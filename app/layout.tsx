import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SDGs Certificate System | cert.sdgstelkomuniversity.my.id",
  description: "Certificate printing system for SDGs papers at Telkom University.",
  applicationName: "SDGs Certificate System",
  keywords: ["SDGs Certificate", "Telkom University", "Certificate Printing"],
  authors: [{ name: "Telkom University", url: "https://cert.sdgstelkomuniversity.my.id" }],
  metadataBase: new URL("https://cert.sdgstelkomuniversity.my.id"),
  alternates: {
    canonical: "https://cert.sdgstelkomuniversity.my.id/",
  },
  openGraph: {
    title: "SDGs Certificate System",
    description: "Easily generate and print certificates for SDGs papers.",
    url: "https://cert.sdgstelkomuniversity.my.id/",
    siteName: "SDGs Certificate System",
    images: [
      {
        url: "/images/sdgs.png", // Pastikan gambar ini ada di public/images
        width: 1200,
        height: 630,
        alt: "SDGs Certificate System",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SDGs Certificate System",
    description: "Easily generate and print certificates for SDGs papers.",
    images: ["/images/sdgs.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
