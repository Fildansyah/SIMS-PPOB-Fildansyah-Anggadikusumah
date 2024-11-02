import "./globals.css";

export const metadata = {
  title: "SIMS PPOB-Fildansyah Anggadikusumah",
  description: "SIMS PPOB-Fildansyah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`h-screen overflow-hidden`}>{children}</body>
    </html>
  );
}
