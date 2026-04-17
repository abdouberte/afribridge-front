import './globals.css'
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap", // fallback immédiat sur Verdana si font pas chargée
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${nunito.className} bg-afri-cream text-afri-text`}>
        {children}
      </body>
    </html>
  );
}
