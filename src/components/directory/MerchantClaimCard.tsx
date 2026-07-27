import { useStore } from "@nanostores/react";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export const MerchantClaimCard = () => {
  const lang = "en";
  
  const basePath = "";

  return (
    <div className="p-6 rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 via-card to-muted/40 shadow-lg flex flex-col justify-between relative overflow-hidden group hover:border-primary/70 transition-all duration-300">
      {/* Subtle Background Glow Accent */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary/20 text-primary border border-primary/30 mb-4">
          <ShieldCheck size={12} />
          <span>{"Local Venues"}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl text-foreground uppercase tracking-tight mb-2 leading-tight">
          {"OWN A LOCAL VENUE IN MACON?"}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-body">
          {"Connect with locals and visitors. Claim your venue listing for free in less than 2 minutes."}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2 border-t border-border/40">
        <a
          href={`${basePath}/list-your-business`}
          className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 glow-primary hover:scale-[1.02] transition-all font-label"
        >
          <span>{"Add Your Business"}</span>
          <ArrowRight size={14} />
        </a>

        <a
          href={`${basePath}/businesses/blakes-on-the-park?preview=true`}
          className="block text-center text-[11px] text-muted-foreground hover:text-foreground underline underline-offset-2 pt-1 transition-colors font-label"
        >
          {"⚡ See Owner Preview Demo"}
        </a>
      </div>
    </div>
  );
};
