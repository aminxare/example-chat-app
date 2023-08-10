import Nav from "@/components/Nav";
import ThemeProvider from "@/context/Theme";
import "./globals.css";
import AppProvider from "@/context";


export const metadata = {
  title: "Chat",
  description: "Chat application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Nav />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
