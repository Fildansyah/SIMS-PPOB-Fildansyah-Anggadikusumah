import "./globals.css";
import { Providers } from "./provider";

export const metadata = {
  title: "SIMS PPOB-Fildansyah Anggadikusumah",
  description: "SIMS PPOB-Fildansyah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`h-screen `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
