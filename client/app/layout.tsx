import Nav from "@/components/Nav";
import ThemeProvider from "@/context/theme";
import "./globals.css";


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
        <ThemeProvider>
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
