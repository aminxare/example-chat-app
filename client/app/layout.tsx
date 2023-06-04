import Nav from "@/components/Nav";
import './globals.css'

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
        <Nav />
        {children}
      </body>
    </html>
  );
}
