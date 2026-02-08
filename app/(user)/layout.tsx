import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/ProgressBar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <Providers>
        <Header />
        {children}
        <Footer />
      </Providers>
    </ClerkProvider>
  );
}
