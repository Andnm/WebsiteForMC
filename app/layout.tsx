import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { StoreProvider } from "@/src/redux/StoreProvider";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "@/src/utils/socket/socket-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kho dự án",
  description: "Generated by create next app",
  // icons: [
  //   {
  //     url: "./logo.svg",
  //     href: "./logo.svg"
  //   }
  // ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="vi">
        <body suppressHydrationWarning={true} className={inter.className}>
          <SocketProvider>
            {children}
            <Toaster position="top-right" />
          </SocketProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
