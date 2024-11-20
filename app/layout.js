import "./globals.css";

export const metadata = {
  title: "Vismo | High-Quality Video Calling App",
  description: "Vismo offers seamless, high-quality video calls with secure, reliable connections. Stay connected with friends and family across any device.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <body className={` antialiased bg-dark-2 text-white`}>

        <div className="min-h-screen flex flex-col justify-between ">
          <main className="flex-grow overflow-auto">{children}</main>

        </div>
      </body>
    </html>
  );
}
