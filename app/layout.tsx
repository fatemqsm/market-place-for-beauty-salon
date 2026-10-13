import type { Metadata } from "next";
import { Agbalumo, Vazirmatn } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const agbalumo = Agbalumo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-agbalumo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VeriFAM",
  description: "بهترین سالن‌های زیبایی نزدیک خود را پیدا کنید و آنلاین وقت رزرو کنید.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={cn(vazirmatn.variable, agbalumo.variable, "h-full antialiased")}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-ink">{children}</body>
    </html>
  );
}
