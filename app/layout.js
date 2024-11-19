import "./globals.css";

export const metadata = {
  title: "Vismo | High-Quality Video Calling App",
  description: "Vismo offers seamless, high-quality video calls with secure, reliable connections. Stay connected with friends and family across any device.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className={` antialiased bg-dark-2 text-white`}>

        <div className="min-h-screen flex flex-col justify-between">
          <main className="flex-grow overflow-auto">{children}</main>
          <footer
            className="fixed h-5 w-full bottom-0 flex items-center justify-center text-[10px]"
          >
            powerd by WiTTg3N&apos;s wisdom
          </footer>
        </div>
      </body>
    </html>
  );
}
