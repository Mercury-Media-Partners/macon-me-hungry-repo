import { LangProvider } from "@/hooks/useLang";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { BarFinder } from "@/components/BarFinder";
import { WorldCupSection } from "@/components/WorldCupSection";
import { LeadMagnet } from "@/components/LeadMagnet";
import { AgencySection } from "@/components/AgencySection";

const FooterContent = () => {
  return (
    <footer className="border-t border-border py-10 px-4">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display text-xl text-muted-foreground tracking-widest">
          BARES<span className="text-primary">ATL</span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          © 2026 BaresATL · Guía queer bilingüe de Atlanta · Built for the Beautiful Game & the Beautiful People
        </p>
        <div className="flex gap-1">
          {["#E40303", "#FF8C00", "#FFED00", "#008026", "#004DFF", "#750787"].map((c) => (
            <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </footer>
  );
};

const Index = () => {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />

          {/* Scrolling ticker */}
          <div className="border-y border-primary/20 bg-primary/5 py-3 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap gap-12">
              {Array(4).fill([
                "🏳️‍🌈 Blake's on the Park",
                "⚽ Mundial 2026",
                "🎭 Mary's EAV",
                "🍺 Bulldogs Bar",
                "🔥 The Heretic",
                "💃 Lips Atlanta",
                "🏈 Woofs Atlanta",
                "🌎 Bares Gay en Atlanta",
              ]).flat().map((item, i) => (
                <span key={i} className="text-sm text-muted-foreground font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <BarFinder />

          <div id="worldcup">
            <WorldCupSection />
          </div>

          <div id="lead-magnet">
            <LeadMagnet />
          </div>

          <div id="agencia">
            <AgencySection />
          </div>
        </main>
        <FooterContent />
      </div>
    </LangProvider>
  );
};

export default Index;
