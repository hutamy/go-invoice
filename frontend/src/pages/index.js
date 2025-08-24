import { Header } from "@/components/ui";
import { HomeHero, HomeInvoice } from "@/components/home";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-yellow-50"
        style={{ zIndex: -2 }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10"
        style={{
          zIndex: -1,
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.03) 0%, transparent 50%)`,
        }}
      />
      <Header />
      <main className="relative pt-14">
        <HomeHero />
        <HomeInvoice />
      </main>
    </div>
  );
}
