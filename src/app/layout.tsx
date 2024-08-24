import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import StoreProvider from "./StoreProvider"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Live weather",
  description: "Get real time weather updates",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={inter.className}>{children}</body>
      </StoreProvider>
    </html>
  )
}
